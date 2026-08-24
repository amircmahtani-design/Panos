/* ============================================================
   Οδοντιατρείο Παπαντωνίου — shared behaviour
   Greek is the source language (written directly in the HTML).
   English is applied on top via the dictionary below when ?lang=en
   ============================================================ */

const EN = {
  /* --- navigation / chrome --- */
  "nav.home": "Home",
  "nav.clinic": "The Practice",
  "nav.services": "Services",
  "nav.doctor": "The Dentist",
  "nav.contact": "Contact",
  "cta.book": "Book an appointment",
  "cta.callnow": "Call to book",
  "skip": "Skip to content",
  "lb.of": "of",
  "map.directions": "Get directions",
  "map.aria": "Directions to the clinic, opens in Google Maps",
  "e404.title": "Page not found | Papantoniou Dental Centre",
  "e404.eyebrow": "Error 404",
  "e404.h": "Page not found",
  "e404.p": "The page you asked for does not exist or has moved. Return to the homepage, or give us a call.",
  "e404.btn": "Back to homepage",
  "ty.title": "Thank you | Papantoniou Dental Centre",
  "ty.eyebrow": "Thank you",
  "ty.h": "Your message has been sent",
  "ty.p": "Thank you for getting in touch. We will reply as soon as possible. For anything urgent, please call us on 22910 37444.",
  "ty.btn": "Back to homepage",
  "logo.top": "Dental Centre",
  "logo.name": "Papantoniou",
  "logo.first": "Panagiotis",
  "ft.brand": "Papantoniou Dental Centre",
  "dr.mono": "P.P",
  "rev.2.who": "G. Ps.",
  "cta.call": "Call us",

  /* --- home --- */
  "home.title": "Papantoniou Dental Centre | Anavyssos",
  "home.eyebrow": "Modern dental care",
  "home.h1a": "Your smile,",
  "home.h1b": "in the best hands",
  "home.lede": "We combine experience, technology and a human approach for a healthy, natural result that lasts.",
  "home.discover": "Discover the practice",

  "trust.1.h": "Experience & trust",
  "trust.1.p1": "Over 4.6",
  "trust.1.p2": "across 46 Google reviews",
  "trust.2.h": "Personal care",
  "trust.2.p": "Time for you and your needs",
  "trust.3.h": "Modern technology",
  "trust.3.p": "Latest-generation equipment",
  "trust.4.h": "Anavyssos",
  "trust.4.p": "Perikleous, Anavyssos 190 13",

  "home.services.eyebrow": "Services",
  "home.services.h2a": "Complete solutions",
  "home.services.h2b": "for every smile",
  "home.services.more": "All services",

  "home.about.eyebrow": "The practice",
  "home.about.h2a": "A space built",
  "home.about.h2b": "for you to feel at ease",
  "home.about.p": "Every detail in our practice — from reception to the dental chair — is designed around you. Modern equipment, strict hygiene protocols and a calm atmosphere make for stress-free care, for children and adults alike.",
  "home.about.more": "More about the practice",

  "cta.h2": "Book your appointment today",
  "cta.p": "Call us or send a message — we would be glad to welcome you to our practice in Anavyssos.",
  "cta.contact": "Contact details",

  /* --- services --- */
  "srv.title": "Services | Papantoniou Dental Centre",
  "srv.h1": "Complete solutions for every smile",
  "srv.lede": "From prevention through to the most complex restorations, we cover every dental need under one roof.",
  "tr.sec.e": "Our treatments",
  "tr.sec.h": "What we cover",
  "srv.1.h": "Cosmetic dentistry",
  "srv.1.p": "Whitening, veneers and aesthetic restorations, with a natural result.",
  "srv.2.h": "Implantology",
  "srv.2.p": "Stable replacement of missing teeth, designed to last.",
  "srv.3.h": "Paediatric dentistry",
  "srv.3.p": "Gentle, friendly care so children feel at ease from the first visit.",
  "srv.4.h": "Panoramic radiography",
  "srv.4.p": "Digital panoramic imaging for accurate diagnosis, on site at the clinic.",

  /* --- clinic --- */
  "cl.title": "The Practice | Papantoniou Dental Centre",
  "cl.h1": "A space built for you to feel at ease",
  "cl.lede": "Modern equipment, strict hygiene protocols and a calm atmosphere — in the heart of Anavyssos.",
  "cl.s1.eyebrow": "Our approach",
  "cl.s1.h2a": "Care without",
  "cl.s1.h2b": "the anxiety",
  "cl.s1.p": "Every detail in our practice — from reception to the dental chair — is designed around you. We take the time to explain each step before anything happens, so you always know exactly what to expect.",
  "cl.t1": "Modern diagnostic and treatment equipment",
  "cl.t2": "Strict sterilisation and hygiene protocols",
  "cl.t3": "A friendly, calm atmosphere for the whole family",
  "cl.t4": "Clear explanation and costing before treatment begins",
  "cl.gal.eyebrow": "Our space",
  "cl.gal.h2": "A look inside the practice",
  "cl.gal.p": "Photographs from our practice on Perikleous street in Anavyssos.",

  /* --- doctor --- */
  "dr.title": "The Dentist | Papantoniou Dental Centre",
  "dr.h1": "Meet Dr. Papantoniou",
  "dr.lede": "Experience, precision and a genuine interest in the person in the chair.",
  "dr.eyebrow": "The dentist",
  "dr.h2": "Experience and attention to detail",
  "dr.name": "Dr. Panagiotis Papantoniou",
  "dr.role": "Dental surgeon",
  "dr.bio1": "A long-standing presence in Anavyssos, Dr. Papantoniou has built his reputation on trust and attention to detail. He believes good dental care starts with honest communication with the patient.",
  "dr.bio2": "Every treatment is tailored to the person in front of him, using modern, evidence-based methods and without rushing — because a smile deserves the time it takes.",
  "dr.chip1": "4.6 ★ across 46 reviews",
  "dr.chip2": "Anavyssos, Attica",
  "dr.photo": "Photograph of the dentist — to be added",
  "rev.eyebrow": "What our patients say",
  "rev.h2a": "Your trust is our",
  "rev.h2b": "greatest reward",
  "rev.1": "He is the best dentist and the best person I have met.",
  "rev.2": "Excellent at diagnosis, and there for the patient after the procedure.",
  "rev.3": "An excellent dentist, and an even more excellent human being.",
  "rev.src": "Google Reviews",

  /* --- contact --- */
  "ct.title": "Contact | Papantoniou Dental Centre",
  "ct.h1": "Book your appointment",
  "ct.lede": "Call us or send a message — we would be glad to welcome you to our practice in Anavyssos.",
  "ct.sec.e": "Details",
  "ct.sec.h": "Where to find us",
  "ct.address": "Address",
  "ct.phone": "Phone",
  "ct.hours": "Opening hours",
  "ct.hours.mon": "Monday",
  "ct.hours.tue": "Tuesday",
  "ct.hours.wed": "Wednesday",
  "ct.hours.thu": "Thursday",
  "ct.hours.fri": "Friday",
  "ct.hours.sat": "Saturday",
  "ct.hours.sun": "Sunday",
  "ct.closed": "Closed",
  "ct.form.h": "Send us a message",
  "ct.form.name": "Full name",
  "ct.form.phone": "Phone",
  "ct.form.msg": "Your message...",
  "ct.form.send": "Send message",
  "ct.map": "Map",

  /* --- footer --- */
  "ft.tag": "A dental practice in Anavyssos, dedicated to personal care and modern dentistry.",
  "ft.nav": "Navigation",
  "ft.services": "Services",
  "ft.contact": "Contact",
  "ft.rights": "© 2026 Papantoniou Dental Centre",
  "ft.place": "Anavyssos, Attica"
};

(function () {
  "use strict";

  /* ---------- language ---------- */
  var params = new URLSearchParams(window.location.search);
  var lang = params.get("lang") === "en" ? "en" : "el";

  function applyEnglish() {
    document.documentElement.lang = "en";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = EN[el.getAttribute("data-i18n")];
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var v = EN[el.getAttribute("data-i18n-placeholder")];
      if (v != null) el.setAttribute("placeholder", v);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var v = EN[el.getAttribute("data-i18n-aria")];
      if (v != null) el.setAttribute("aria-label", v);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var v = EN[el.getAttribute("data-i18n-alt")];
      if (v != null) el.setAttribute("alt", v);
    });
    var t = document.body.getAttribute("data-title-key");
    if (t && EN[t]) document.title = EN[t];
  }

  /* keep ?lang=en across internal navigation */
  function carryLang() {
    if (lang !== "en") return;
    document.querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href) return;
      if (/^(https?:|tel:|mailto:|#)/i.test(href)) return;
      if (a.hasAttribute("data-lang-link")) return;
      a.setAttribute("href", href.indexOf("?") > -1 ? href + "&lang=en" : href + "?lang=en");
    });
  }

  /* language switch links point at the current page */
  function wireLangLinks() {
    var page = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-lang-link]").forEach(function (a) {
      var to = a.getAttribute("data-lang-link");
      a.setAttribute("href", to === "en" ? page + "?lang=en" : page);
      a.classList.toggle("on", to === lang);
    });
  }

  if (lang === "en") applyEnglish();
  carryLang();
  wireLangLinks();

  /* ---------- header shadow ---------- */
  var hdr = document.getElementById("hdr");
  if (hdr) {
    window.addEventListener("scroll", function () {
      hdr.classList.toggle("scrolled", window.scrollY > 8);
    }, { passive: true });
  }

  /* ---------- mobile drawer ---------- */
  var burger = document.getElementById("burger");
  var drawer = document.getElementById("drawer");
  if (burger && drawer) {
    var close = function () {
      burger.classList.remove("open");
      drawer.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    burger.addEventListener("click", function () {
      var open = drawer.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- drop photos that fail to load ---------- */
  document.querySelectorAll("img.ph").forEach(function (img) {
    img.addEventListener("error", function () {
      var cell = img.closest(".gal a");
      if (cell) { cell.remove(); return; }
      img.style.display = "none";
    });
  });

  /* ---------- reveal on scroll ---------- */

  /* ---------- gallery lightbox ---------- */
  var lb = document.getElementById("lb");
  if (lb) {
    var items = [].slice.call(document.querySelectorAll(".gal a"));
    var img = document.getElementById("lbImg"),
        cap = document.getElementById("lbCap"),
        cnt = document.getElementById("lbCount"),
        idx = 0, lastFocus = null;

    function show(i) {
      idx = (i + items.length) % items.length;
      var a = items[idx], thumb = a.querySelector("img");
      img.src = a.getAttribute("href");
      img.alt = thumb ? thumb.alt : "";
      cap.textContent = thumb ? thumb.alt : "";
      cnt.textContent = (idx + 1) + " " + (EN["lb.of"] && document.documentElement.lang === "en" ? "of" : "/") + " " + items.length;
    }
    function open(i, trigger) {
      lastFocus = trigger || null;
      show(i);
      lb.classList.add("open");
      requestAnimationFrame(function () { lb.classList.add("show"); });
      document.body.style.overflow = "hidden";
      document.getElementById("lbX").focus();
    }
    function close() {
      lb.classList.remove("show");
      setTimeout(function () { lb.classList.remove("open"); img.removeAttribute("src"); }, 260);
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }

    items.forEach(function (a, i) {
      a.setAttribute("role", "button");
      a.removeAttribute("target");
      a.addEventListener("click", function (e) { e.preventDefault(); open(i, a); });
    });
    document.getElementById("lbX").addEventListener("click", close);
    document.getElementById("lbP").addEventListener("click", function () { show(idx - 1); });
    document.getElementById("lbN").addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
    /* swipe on touch */
    var x0 = null;
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
  }



  var els = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    els.forEach(function (e) { io.observe(e); });
  } else {
    els.forEach(function (e) { e.classList.add("on"); });
  }
})();
