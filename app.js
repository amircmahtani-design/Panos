/* ============================================================
   Οδοντιατρικό Κέντρο Παπαντωνίου — shared behaviour

   Every editable string, the opening hours, the team members and
   the image choices live in content.json.
   Edit them at /studio/ and export a new content.json.

   If content.json is missing or fails to load, the Greek written
   directly into the HTML still shows, so the site never breaks.
   ============================================================ */

window.SITE = { content: null, lang: "el" };

(function () {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  var lang = params.get("lang") === "en" ? "en" : "el";
  window.SITE.lang = lang;
  if (lang === "en") document.documentElement.lang = "en";

  function pick(entry) {
    if (!entry) return null;
    var v = entry[lang];
    if (v === undefined || v === null || v === "") v = entry.el;
    return v;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (m) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m];
    });
  }

  /* ---------------- content ---------------- */

  function applyStrings(c) {
    var S = c.strings || {};
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = pick(S[el.getAttribute("data-i18n")]);
      if (v == null || v === "") return;
      if (v.indexOf("<br>") > -1) el.innerHTML = v; else el.textContent = v;
    });
    [["data-i18n-placeholder", "placeholder"],
     ["data-i18n-aria", "aria-label"],
     ["data-i18n-alt", "alt"]].forEach(function (p) {
      document.querySelectorAll("[" + p[0] + "]").forEach(function (el) {
        var v = pick(S[el.getAttribute(p[0])]);
        if (v != null && v !== "") el.setAttribute(p[1], v);
      });
    });
    var k = document.body.getAttribute("data-title-key");
    if (k && S[k]) { var tv = pick(S[k]); if (tv) document.title = tv; }
  }

  function applyContact(c) {
    var ct = c.contact || {};
    if (ct.phoneTel) {
      document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
        a.setAttribute("href", "tel:" + ct.phoneTel);
      });
    }
    var set = function (sel, fn) { document.querySelectorAll(sel).forEach(fn); };
    set("[data-c=phone]", function (e) { if (ct.phoneDisplay) e.textContent = ct.phoneDisplay; });
    set("[data-c=address]", function (e) {
      var v = lang === "en" ? (ct.addressEn || ct.addressEl) : ct.addressEl;
      if (v) e.textContent = v;
    });
    set("[data-c=instagram]", function (e) { if (ct.instagram) e.href = ct.instagram; });
    set("[data-c=reviews]", function (e) { if (ct.reviewsUrl) e.href = ct.reviewsUrl; });
    set("[data-c=directions]", function (e) { if (ct.mapsDirections) e.href = ct.mapsDirections; });
    set("[data-c=rating]", function (e) { if (ct.rating) e.textContent = ct.rating; });
    set("[data-c=reviewCount]", function (e) { if (ct.reviewCount) e.textContent = ct.reviewCount; });
    var mf = document.querySelector(".map iframe");
    if (mf && ct.mapsEmbed) mf.setAttribute("src", ct.mapsEmbed);
  }

  function applyHours(c) {
    var box = document.querySelector("[data-c=hours]");
    if (!box || !c.hours || !c.hours.length) return;
    var closedLabel = pick((c.strings || {})["d.closed"]) || "Κλειστά";
    box.innerHTML = c.hours.map(function (h) {
      var day = (h.day && (h.day[lang] || h.day.el)) || "";
      var val = h.closed
        ? '<span class="shut">' + esc(closedLabel) + "</span>"
        : "<span>" + esc(h.value || "") + "</span>";
      return '<li><span class="day">' + esc(day) + "</span>" + val + "</li>";
    }).join("");
  }

  function applyImages(c) {
    if (!c.images) return;
    document.querySelectorAll("[data-img]").forEach(function (el) {
      var rec = c.images[el.getAttribute("data-img")];
      if (!rec || !rec.src) return;
      if (el.tagName === "IMG") {
        el.setAttribute("src", rec.src);
        if (rec.src.indexOf("data:") === 0) {
          el.removeAttribute("width"); el.removeAttribute("height");
        }
      } else {
        el.setAttribute("href", rec.src);
      }
    });
  }

  function applyBrand(c) {
    if (!c.brand || !c.brand.useCustomLogo || !c.brand.logo) return;
    document.querySelectorAll(".logo > svg, footer .fbrand > svg").forEach(function (svg) {
      var w = svg.getAttribute("width") || 44;
      var img = document.createElement("img");
      img.src = c.brand.logo;
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      img.style.cssText = "width:" + w + "px;height:auto;flex:none";
      svg.replaceWith(img);
    });
  }

  function applyTeam(c) {
    var grid = document.querySelector("[data-c=team]");
    if (!grid || !c.team || !c.team.length) return;
    grid.innerHTML = c.team.map(function (m) {
      var name = (m.name && (m.name[lang] || m.name.el)) || "";
      var role = (m.role && (m.role[lang] || m.role.el)) || "";
      var bio = (m.bio && (m.bio[lang] || m.bio.el)) || "";
      var photo = m.photo
        ? '<img src="' + m.photo + '" alt="' + esc(name) + '" loading="lazy">'
        : '<span class="member-ph" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" width="36" height="36">' +
          '<circle cx="12" cy="8.4" r="4.2" stroke="currentColor" stroke-width="1.3"/>' +
          '<path d="M4.8 20.4c1.1-4 3.9-6.2 7.2-6.2s6.1 2.2 7.2 6.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></span>';
      return '<article class="member">' +
             '<div class="member-photo">' + photo + "</div>" +
             '<h3 class="member-name">' + esc(name) + "</h3>" +
             '<p class="member-role">' + esc(role) + "</p>" +
             '<p class="member-bio">' + esc(bio) + "</p></article>";
    }).join("");
  }


  var ICONS = {
    aes:'<svg width="34" height="34" viewBox="0 0 40 40" fill="none"><path d="M20 9c-3.2 0-5.2 1.7-7.2 1.7-2.8 0-4.6 2.3-4.6 5.8 0 4.8 1.6 9.8 2.9 13.6.9 2.3 1.6 4.2 3 4.2 1.9 0 2.1-4.7 2.8-8.1.4-1.9 1-3.2 3.1-3.2s2.6 1.3 3 3.2c.7 3.4.9 8.1 2.8 8.1 1.4 0 2.1-1.9 3-4.2 1.3-3.8 2.9-8.8 2.9-13.6 0-3.5-1.8-5.8-4.6-5.8C25.2 10.7 23.2 9 20 9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="m14.6 16.2 1.7 1.7 3.4-3.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    imp:'<svg width="34" height="34" viewBox="0 0 40 40" fill="none"><path d="M13.6 13.2c0-3.7 2.8-6.4 6.4-6.4s6.4 2.7 6.4 6.4c0 2.5-1.2 4.2-2.8 5.1H16.4c-1.6-.9-2.8-2.6-2.8-5.1Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M20 18.3v15.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M16 21.4h8M16.5 25.2h7M17 29h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    kid:'<svg width="34" height="34" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="14.5" r="7.5" stroke="currentColor" stroke-width="1.5"/><path d="M16.6 13h.02M23.4 13h.02" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M16.6 16.8q3.4 3 6.8 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 34c1.7-5.6 6.2-8.6 12-8.6S30.3 28.4 32 34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    xray:'<svg width="34" height="34" viewBox="0 0 40 40" fill="none"><path d="M6 20a14 14 0 0 1 28 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M11 22v5.5a3 3 0 0 0 3 3h2.4a3 3 0 0 0 3-2.7l.6-5.8M29 22v5.5a3 3 0 0 1-3 3h-2.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><rect x="14" y="14" width="12" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>',
    ortho:'<svg width="34" height="34" viewBox="0 0 40 40" fill="none"><path d="M6 15q14 10 28 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6 26q14 8 28 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><rect x="8.4" y="16.4" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="17" y="18.4" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="25.6" y="16.4" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>',
    endo:'<svg width="34" height="34" viewBox="0 0 40 40" fill="none"><path d="M20 12c-3 0-4.9 1.6-6.8 1.6-2.6 0-4.3 2.2-4.3 5.4 0 4.5 1.5 9.2 2.7 12.7.8 2.2 1.5 3.9 2.8 3.9 1.8 0 2-4.4 2.6-7.6.4-1.8.9-3 2.9-3s2.5 1.2 2.9 3c.6 3.2.8 7.6 2.6 7.6 1.3 0 2-1.7 2.8-3.9 1.2-3.5 2.7-8.2 2.7-12.7 0-3.2-1.7-5.4-4.3-5.4-1.9 0-3.8-1.6-6.6-1.6Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M16.6 18.5v10.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2.6 2.6"/><path d="M16.6 4.6v9.2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    perio:'<svg width="34" height="34" viewBox="0 0 40 40" fill="none"><path d="M20 7c-3 0-4.9 1.6-6.8 1.6-2.6 0-4.3 2.2-4.3 5.4 0 4.5 1.5 9.2 2.7 12.7.8 2.2 1.5 3.9 2.8 3.9 1.8 0 2-4.4 2.6-7.6.4-1.8.9-3 2.9-3s2.5 1.2 2.9 3c.6 3.2.8 7.6 2.6 7.6 1.3 0 2-1.7 2.8-3.9 1.2-3.5 2.7-8.2 2.7-12.7 0-3.2-1.7-5.4-4.3-5.4C24.9 8.6 23 7 20 7Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 30.5q6.5 5 13 0t13 0" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  function paras(txt){
    return String(txt||"").split(/\n\s*\n/).map(function(p){
      return "<p>" + esc(p.trim()).replace(/\n/g,"<br>") + "</p>";
    }).join("");
  }

  function applyTreatments(c){
    var box = document.querySelector("[data-c=treatments]");
    if (!box || !c.treatments) return;
    var S = c.strings || {};
    var more = pick(S["tr.detail.open"]) || "Περισσότερα";
    var less = pick(S["tr.detail.close"]) || "Λιγότερα";
    box.innerHTML = c.treatments.map(function (t, i) {
      var title = (t.title && (t.title[lang] || t.title.el)) || "";
      var short = (t.short && (t.short[lang] || t.short.el)) || "";
      var det   = (t.detail && (t.detail[lang] || t.detail.el)) || "";
      return '<div class="tr-item">' +
        '<button class="tr-head" aria-expanded="false" aria-controls="trd' + i + '">' +
          '<span class="tr-ic">' + (ICONS[t.icon] || "") + "</span>" +
          '<span class="tr-txt"><span class="tr-title">' + esc(title) + "</span>" +
          '<span class="tr-short">' + esc(short) + "</span></span>" +
          '<span class="tr-more"><span class="lbl" data-more="' + esc(more) + '" data-less="' + esc(less) + '">' + esc(more) + "</span>" +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
        "</button>" +
        '<div class="tr-detail" id="trd' + i + '" hidden>' + paras(det) + "</div></div>";
    }).join("");
    box.querySelectorAll(".tr-head").forEach(function (b) {
      b.addEventListener("click", function () {
        var open = b.getAttribute("aria-expanded") === "true";
        b.setAttribute("aria-expanded", String(!open));
        b.parentNode.querySelector(".tr-detail").hidden = open;
        var l = b.querySelector(".lbl");
        l.textContent = open ? l.dataset.more : l.dataset.less;
      });
    });
  }

  /* Cards under the homepage hero and the service list in every footer both
     read the same treatments array, so adding a treatment in the Studio adds
     it everywhere without touching the HTML. */
  function applyServiceCards(c) {
    var box = document.querySelector("[data-c=srvcards]");
    if (!box || !c.treatments || !c.treatments.length) return;
    /* carryLang() runs after this and adds ?lang=en where needed. */
    var href = "ypiresies.html";
    box.innerHTML = c.treatments.map(function (t) {
      var title = (t.title && (t.title[lang] || t.title.el)) || "";
      var short = (t.short && (t.short[lang] || t.short.el)) || "";
      return '<a class="card rv on" href="' + href + '">' +
        '<span class="ic">' + (ICONS[t.icon] || ICONS.aes) + "</span>" +
        "<h3>" + esc(title) + "</h3><p>" + esc(short) + "</p></a>";
    }).join("");
  }

  function applyFooterServices(c) {
    if (!c.treatments || !c.treatments.length) return;
    var href = "ypiresies.html";
    document.querySelectorAll("[data-c=ftservices]").forEach(function (ul) {
      ul.innerHTML = c.treatments.map(function (t) {
        var title = (t.title && (t.title[lang] || t.title.el)) || "";
        return '<li><a href="' + href + '">' + esc(title) + "</a></li>";
      }).join("");
    });
  }

  function applyFaq(c){
    var box = document.querySelector("[data-c=faq]");
    if (!box || !c.faq || !c.faq.length) return;

    /* Group by category, in the order the categories first appear.
       Items with no category fall into one unnamed group, so the list
       still renders correctly if the categories are ever removed. */
    var order = [], groups = {};
    c.faq.forEach(function (f) {
      var name = (f.cat && (f.cat[lang] || f.cat.el)) || "";
      if (!groups[name]) { groups[name] = []; order.push(name); }
      groups[name].push(f);
    });

    var n = 0;
    box.innerHTML = order.map(function (name) {
      var head = name ? '<h3 class="faq-cat">' + esc(name) + "</h3>" : "";
      return head + '<div class="faq-group">' + groups[name].map(function (f) {
        var q = (f.q && (f.q[lang] || f.q.el)) || "";
        var an = (f.a && (f.a[lang] || f.a.el)) || "";
        var id = "fa" + (n++);
        return '<div class="faq-item">' +
          '<button class="faq-q" aria-expanded="false" aria-controls="' + id + '">' +
            "<span>" + esc(q) + "</span>" +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
          "</button>" +
          '<div class="faq-a" id="' + id + '" hidden>' + paras(an) + "</div></div>";
      }).join("") + "</div>";
    }).join("");

    box.querySelectorAll(".faq-q").forEach(function (b) {
      b.addEventListener("click", function () {
        var open = b.getAttribute("aria-expanded") === "true";
        b.setAttribute("aria-expanded", String(!open));
        b.parentNode.querySelector(".faq-a").hidden = open;
      });
    });

    /* Structured data for the FAQ page, built from the live content so it
       can never drift out of step with what the page actually says. */
    if (document.body.hasAttribute("data-faq-schema")) {
      try {
        var s = document.createElement("script");
        s.type = "application/ld+json";
        s.textContent = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: c.faq.map(function (f) {
            return {
              "@type": "Question",
              name: (f.q && (f.q[lang] || f.q.el)) || "",
              acceptedAnswer: {
                "@type": "Answer",
                text: ((f.a && (f.a[lang] || f.a.el)) || "").replace(/\n+/g, " ")
              }
            };
          })
        });
        document.head.appendChild(s);
      } catch (e) {}
    }
  }

  function applyContent(c) {
    window.SITE.content = c;
    if (!c) return;
    try { applyStrings(c); } catch (e) {}
    try { applyContact(c); } catch (e) {}
    try { applyHours(c); } catch (e) {}
    try { applyImages(c); } catch (e) {}
    try { applyBrand(c); } catch (e) {}
    try { applyTeam(c); } catch (e) {}
    try { applyTreatments(c); } catch (e) {}
    try { applyServiceCards(c); } catch (e) {}
    try { applyFooterServices(c); } catch (e) {}
    try { applyFaq(c); } catch (e) {}
  }

  /* ---------------- language plumbing ---------------- */

  function carryLang() {
    if (lang !== "en") return;
    document.querySelectorAll("a[href]").forEach(function (a) {
      var h = a.getAttribute("href");
      if (!h || /^(https?:|tel:|mailto:|#|data:)/i.test(h)) return;
      if (a.hasAttribute("data-lang-link")) return;
      if (/\.(jpg|jpeg|png|webp|svg|pdf|json)$/i.test(h)) return;
      a.setAttribute("href", h.indexOf("?") > -1 ? h + "&lang=en" : h + "?lang=en");
    });
  }

  function wireLangLinks() {
    var page = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-lang-link]").forEach(function (a) {
      var to = a.getAttribute("data-lang-link");
      a.setAttribute("href", to === "en" ? page + "?lang=en" : page);
      a.classList.toggle("on", to === lang);
    });
  }

  /* ---------------- interface ---------------- */

  function initChrome() {
    var hdr = document.getElementById("hdr");
    if (hdr) {
      window.addEventListener("scroll", function () {
        hdr.classList.toggle("scrolled", window.scrollY > 8);
      }, { passive: true });
    }

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
      drawer.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    }

    document.querySelectorAll("img.ph").forEach(function (img) {
      img.addEventListener("error", function () {
        var cell = img.closest(".gal a");
        if (cell) cell.remove(); else img.style.display = "none";
      });
    });
  }

  function initLightbox() {
    var lb = document.getElementById("lb");
    if (!lb) return;
    var items = [].slice.call(document.querySelectorAll(".gal a"));
    if (!items.length) return;
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
      cnt.textContent = (idx + 1) + " / " + items.length;
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
    var x0 = null;
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
  }

  function initReveal() {
    var els = document.querySelectorAll(".rv");
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("on"); obs.unobserve(e.target); }
        });
      }, { threshold: 0.08 });
      els.forEach(function (e) { obs.observe(e); });
    } else {
      els.forEach(function (e) { e.classList.add("on"); });
    }
  }

  function boot() {
    carryLang();
    wireLangLinks();
    initChrome();
    initLightbox();
    initReveal();
    document.body.classList.add("content-ready");
  }

  fetch("content.json", { cache: "no-store" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (c) { if (c) applyContent(c); })
    .catch(function () { /* HTML fallback stays in place */ })
    .then(boot, boot);
})();
