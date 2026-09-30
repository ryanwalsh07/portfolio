/* TapSOS password gate.
   The case study markup never ships in the page source: it's AES-256-GCM
   encrypted (key derived from the password with PBKDF2-SHA256) and only
   decrypted here, in the visitor's browser, once the right password is
   entered. Wrong guesses fail locally; nothing is sent anywhere to check. */
(function () {
  "use strict";

  var gate = document.getElementById("tapsos-gate");
  var contentEl = document.getElementById("tapsos-content");
  var payloadEl = document.getElementById("tapsos-payload");
  var form = document.getElementById("gate-form");
  var input = document.getElementById("gate-password");
  var errorEl = document.getElementById("gate-error");
  if (!gate || !contentEl || !payloadEl || !form || !input) return;

  var payload;
  try {
    payload = JSON.parse(payloadEl.textContent);
  } catch (e) {
    return;
  }

  var CACHE_KEY = "tapsos-key-v1";

  function showError(message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  function b64ToBytes(b64) {
    var bin = atob(b64);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  function bytesToB64(bytes) {
    var bin = "";
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }

  function reveal(html) {
    contentEl.innerHTML = html;
    gate.hidden = true;
    contentEl.hidden = false;
    if (window.RW_initPage) window.RW_initPage();
    if (location.hash) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView();
    }
  }

  function decryptWithKey(key) {
    return crypto.subtle.decrypt(
      { name: "AES-GCM", iv: b64ToBytes(payload.iv) },
      key,
      b64ToBytes(payload.cipher)
    ).then(function (buf) {
      return new TextDecoder().decode(buf);
    });
  }

  function keyFromPassword(password) {
    return crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    ).then(function (keyMaterial) {
      return crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: b64ToBytes(payload.salt), iterations: payload.iterations, hash: "SHA-256" },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["decrypt"]
      );
    });
  }

  if (!window.crypto || !window.crypto.subtle) {
    showError("Your browser can't open this page. Try a current version of Chrome, Safari, Firefox or Edge.");
    input.disabled = true;
    form.querySelector("button").disabled = true;
    return;
  }

  // Same tab, already unlocked this visit: skip the prompt.
  var cached = null;
  try {
    cached = sessionStorage.getItem(CACHE_KEY);
  } catch (e) {
    /* Private browsing etc. can block storage; the prompt still works. */
  }
  if (cached) {
    crypto.subtle.importKey("raw", b64ToBytes(cached), { name: "AES-GCM" }, false, ["decrypt"])
      .then(decryptWithKey)
      .then(reveal)
      .catch(function () {
        try { sessionStorage.removeItem(CACHE_KEY); } catch (e) {}
      });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    errorEl.hidden = true;
    var password = input.value;
    if (!password) return;
    var submitBtn = form.querySelector("button");
    submitBtn.disabled = true;

    keyFromPassword(password)
      .then(function (key) {
        return decryptWithKey(key).then(function (html) {
          reveal(html);
          return crypto.subtle.exportKey("raw", key);
        });
      })
      .then(function (raw) {
        try { sessionStorage.setItem(CACHE_KEY, bytesToB64(new Uint8Array(raw))); } catch (e) {}
      })
      .catch(function () {
        showError("That password isn’t right. Try again.");
        input.value = "";
        input.focus();
      })
      .then(function () {
        submitBtn.disabled = false;
      });
  });
})();
