/* Ryan Walsh — Portfolio
   Everything here is an enhancement: the site reads and works without it. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Header rule appears once you scroll */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile menu */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var closeNav = function () {
      toggle.setAttribute("aria-expanded", "false");
      root.classList.remove("nav-open");
    };
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      root.classList.toggle("nav-open", !isOpen);
      if (!isOpen) {
        var first = nav.querySelector("a");
        if (first) first.focus();
      }
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && root.classList.contains("nav-open")) {
        closeNav();
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 860px)").addEventListener("change", function (event) {
      if (event.matches) closeNav();
    });
  }

  /* Local time in Belfast */
  var clock = document.querySelector("[data-belfast-time]");
  if (clock) {
    var format = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
    var tick = function () {
      clock.textContent = format.format(new Date()).replace(/\s+/g, "").toLowerCase();
    };
    tick();
    setInterval(tick, 20000);
  }

  /* Keep pen strokes a consistent on-screen thickness at any size */
  function sizePens() {
    document.querySelectorAll(".pen").forEach(function (pen) {
      var box = pen.viewBox && pen.viewBox.baseVal;
      var width = pen.getBoundingClientRect().width;
      if (!box || !box.width || !width) return;
      var target = Math.min(4, Math.max(2.2, width * 0.006)); // px on screen
      pen.style.strokeWidth = (target * box.width / width).toFixed(2);
    });
  }
  sizePens();
  window.addEventListener("resize", sizePens);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizePens);

  /* Pen marks: drawn once, when they come into view */
  var pens = document.querySelectorAll(".pen[data-draw]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    pens.forEach(function (pen) { pen.classList.add("is-drawn"); });
  } else {
    var penObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-drawn");
          penObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.8 });

    pens.forEach(function (pen) {
      if (pen.getAttribute("data-draw") === "load") {
        // Wait for the first paint so the stroke animates rather than appearing drawn.
        setTimeout(function () { pen.classList.add("is-drawn"); }, 120);
      } else {
        penObserver.observe(pen);
      }
    });
  }

  /* Highlight the nav or index link for the section on screen */
  function spy(links) {
    if (!links.length || !("IntersectionObserver" in window)) return;
    var byId = {};
    links.forEach(function (link) {
      var id = link.getAttribute("href").split("#")[1];
      if (id) byId[id] = link;
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) { link.removeAttribute("aria-current"); });
        var match = byId[entry.target.id];
        if (match) match.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
  spy(Array.prototype.slice.call(document.querySelectorAll('.nav__link[href^="#"]:not([href="#top"])')));
  spy(Array.prototype.slice.call(document.querySelectorAll(".cs-index a")));

  /* Case study reading progress */
  var progress = document.querySelector(".reading-progress");
  if (progress) {
    var update = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      progress.style.transform = "scaleX(" + ratio + ")";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }
})();
