/*
 * Relaxation POTO — 描画スクリプト
 * 内容の編集は js/config.js で行ってください。このファイルは通常、触る必要はありません。
 */
(function () {
  "use strict";

  var C = window.SITE_CONFIG;
  if (!C) return;

  var LANGS = ["ja", "en"];
  var lang = "ja";
  var root = document.documentElement;

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function has(v) {
    return v !== undefined && v !== null && String(v).trim() !== "";
  }
  // { ja, en } から現在の言語の値を取り出す（文字列ならそのまま）
  function t(obj) {
    if (obj == null) return "";
    if (typeof obj === "string" || Array.isArray(obj)) return obj;
    return obj[lang] != null ? obj[lang] : "";
  }
  function br(s) {
    // 英文は改行を消しても単語がつながらないよう、空白を残す
    return esc(s).replace(/\n/g, lang === "en" ? " <br>" : "<br>");
  }
  // 日本語は「、」「。」の位置でだけ折り返す
  function phrase(s) {
    if (lang !== "ja") return br(s);
    return String(s).split("\n").map(function (line) {
      return (line.match(/[^、。]+[、。]*|[、。]+/g) || []).map(function (p) {
        return '<span class="phrase">' + esc(p) + "</span>";
      }).join("");
    }).join("<br>");
  }
  function paras(list, cls, fmt) {
    return (Array.isArray(list) ? list : [list]).filter(has).map(function (p) {
      return '<p class="' + (cls || "") + '">' + (fmt || br)(p) + "</p>";
    }).join("");
  }
  function newTab() {
    return '<span class="visually-hidden">' + esc(t(C.ui.newTab)) + "</span>";
  }
  function placeholder(label, cls) {
    return (
      '<div class="ph ' + (cls || "") + '" aria-hidden="true">' +
      (C.showPlaceholderLabels && has(label) ? '<span class="ph__label">' + esc(label) + "</span>" : "") +
      "</div>"
    );
  }
  // load: "high"（最優先）/ "eager"（すぐ読み込む）/ 省略時は遅延読み込み
  function photo(img, cls, load) {
    if (img && has(img.src)) {
      return '<img class="' + (cls || "") + '" src="' + esc(img.src) + '" alt="' + esc(t(img.alt)) + '"' +
        (has(img.position) ? ' style="object-position:' + esc(img.position) + '"' : "") +
        (load === "high" ? ' fetchpriority="high"' : load === "eager" ? "" : ' loading="lazy"') + ' decoding="async">';
    }
    return placeholder(img && img.placeholder, cls);
  }
  function price(n) {
    if (!has(n)) return "";
    return esc(C.menu.currency || "") + esc(typeof n === "number" ? n.toLocaleString("ja-JP") : n);
  }
  var IG_ICON =
    '<svg class="icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">' +
    '<rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.3"/>' +
    '<circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.3"/>' +
    '<circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>';

  // 予約ボタン（URL未設定のものは出さない）
  function contacts() {
    var B = C.booking;
    var out = "";
    [["instagram", "btn--primary"], ["whatsapp", "btn--line"], ["reserveSite", "btn--line"]].forEach(function (k) {
      if (!has(B[k[0]])) return;
      out +=
        '<a class="btn ' + k[1] + '" href="' + esc(B[k[0]]) + '" target="_blank" rel="noopener">' +
        (k[0] === "instagram" ? IG_ICON : "") + "<span>" + esc(t(B.labels[k[0]])) + "</span>" + newTab() + "</a>";
    });
    return out;
  }

  // ---------- header ----------
  var navList = document.querySelector("[data-nav]");
  var menuBtn = document.querySelector(".menu-btn");

  function renderHeader() {
    navList.innerHTML =
      C.nav.map(function (n) {
        return (
          '<li><button type="button" class="gnav__item" data-open="' + esc(n.modal) + '" aria-haspopup="dialog">' +
          '<span class="gnav__en" lang="en">' + esc(n.label) + "</span>" +
          (lang === "ja" && has(n.sub) ? '<span class="gnav__sub">' + esc(n.sub) + "</span>" : "") +
          "</button></li>"
        );
      }).join("") +
      '<li class="gnav__book"><a class="gnav__item gnav__item--book" href="#booking">' +
      '<span class="gnav__en" lang="en">' + esc(C.bookNow.label) + "</span>" +
      (lang === "ja" && has(C.bookNow.sub) ? '<span class="gnav__sub">' + esc(C.bookNow.sub) + "</span>" : "") +
      "</a></li>";
    document.querySelector("[data-ig]").innerHTML = has(C.booking.instagram)
      ? '<a class="ig-link" href="' + esc(C.booking.instagram) + '" target="_blank" rel="noopener">' +
        IG_ICON + '<span class="visually-hidden">Instagram' + esc(t(C.ui.newTab)) + "</span></a>"
      : "";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(C.ui[el.getAttribute("data-i18n")]);
    });
    document.querySelectorAll(".lang__btn").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    var logo = document.querySelector("[data-logo] img");
    logo.src = C.images.logo.src;
    logo.alt = C.images.logo.alt;
  }

  // ---------- main ----------
  function renderMain() {
    var H = C.hero;
    var lines = t(H.copy) || [];
    var heroImg = C.images.hero;
    var hero =
      '<section class="hero" aria-labelledby="hero-copy">' +
      '<div class="hero__frame">' +
      photo(heroImg, "hero__img", "high") +
      '<div class="hero__veil" style="opacity:' + Number(heroImg.overlay || 0) + '" aria-hidden="true"></div>' +
      '<h1 class="hero__copy hero__copy--' + lang + '" id="hero-copy">' +
      '<span class="visually-hidden">' + esc(C.salonName) + " — </span>" +
      lines.map(function (l) { return '<span class="hero__line">' + esc(l) + "</span>"; }).join("") +
      "</h1>" +
      "</div>" +
      '<p class="hero__tagline">' + esc(t(H.tagline)) + "</p>" +
      "</section>";

    var intro =
      '<section class="intro" aria-labelledby="hero-copy">' +
      '<div class="intro__text">' + paras(t(C.intro), "intro__p", phrase) + "</div>" +
      "</section>";

    // ループ表示のため、写真の並びを3回くり返す（2組目が本体、前後は読み上げ対象外の複製）
    var items = C.images.gallery.map(function (g) { return photo(g, "gallery__img", "eager"); });
    var set = function (clone) {
      return items.map(function (html) {
        return '<li class="gallery__item"' + (clone ? ' aria-hidden="true" inert' : "") + ">" + html + "</li>";
      }).join("");
    };
    var gallery =
      '<section class="gallery" aria-label="' + esc(t(C.ui.gallery)) + '">' +
      '<div class="gallery__viewport" data-gallery tabindex="0" role="region" aria-label="' + esc(t(C.ui.gallery)) + '">' +
      '<ul class="gallery__list">' + set(true) + set(false) + set(true) + "</ul>" +
      "</div>" +
      "</section>";

    var B = C.booking;
    var booking =
      '<section class="booking" id="booking" aria-labelledby="booking-title" tabindex="-1">' +
      '<p class="eyebrow" lang="en">' + esc(C.bookNow.label) + "</p>" +
      '<h2 class="booking__title" id="booking-title">' + esc(t(B.title)) + "</h2>" +
      '<p class="booking__body">' + phrase(t(B.body)) + "</p>" +
      '<div class="booking__actions">' + contacts() + "</div>" +
      "</section>";

    if (carousel) carousel.destroy();
    document.querySelector("[data-main]").innerHTML = hero + intro + gallery + booking;
    carousel = initCarousel(document.querySelector("[data-gallery]"), C.images.gallery.length);
  }

  // ---------- footer ----------
  function renderFooter() {
    document.querySelector("[data-footer]").innerHTML =
      '<div class="footer__inner">' +
      '<p class="footer__name" lang="en">' + esc(C.salonName) + "</p>" +
      '<p class="footer__tag">' + esc(t(C.footer.tagline)) + "</p>" +
      '<p class="footer__copy" lang="en"><small>&copy; ' + new Date().getFullYear() + " " + esc(C.salonName) + "</small></p>" +
      "</div>";
  }

  // ---------- modals ----------
  function modalBody(name) {
    if (name === "about") {
      var A = C.about;
      return '<h3 class="m-lead">' + phrase(t(A.title)) + "</h3>" + paras(t(A.body), "m-p");
    }
    if (name === "therapist") {
      var T = C.therapist;
      var ready = T.name && has(T.name.ja);
      var img = has(T.photo)
        ? '<img class="therapist__photo" src="' + esc(T.photo) + '" alt="' + esc(ready ? t(T.name) : "") + '" loading="lazy">'
        : (C.showPlaceholderLabels ? placeholder("PHOTO｜施術者", "therapist__photo") : "");
      if (!ready) {
        return '<div class="therapist">' + img + '<div class="therapist__body"><p class="m-p">' + br(t(T.comingSoon)) + "</p></div></div>";
      }
      var creds = (T.credentials || []).map(t).filter(has);
      return (
        '<div class="therapist">' + img +
        '<div class="therapist__body">' +
        '<h3 class="therapist__name">' + esc(t(T.name) || T.name.ja) + "</h3>" +
        (has(t(T.profile)) ? '<p class="m-p">' + br(t(T.profile)) + "</p>" : "") +
        (has(t(T.message)) ? '<p class="m-p therapist__msg">' + br(t(T.message)) + "</p>" : "") +
        (creds.length ? '<ul class="therapist__creds">' + creds.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>" : "") +
        "</div></div>"
      );
    }
    if (name === "menu") {
      var M = C.menu;
      var anyPrice = false, anyIslander = false;
      var items = M.items.filter(function (it) { return it && it.name && has(t(it.name)); }).map(function (it) {
        var opts = (it.options || []).filter(function (o) { return o && (has(o.minutes) || has(o.price) || has(o.islanderPrice)); });
        var rows = opts.map(function (o) {
          if (has(o.price) || has(o.islanderPrice)) anyPrice = true;
          if (has(o.islanderPrice)) anyIslander = true;
          return (
            '<li class="menu__opt">' +
            '<span class="menu__min">' + (has(o.minutes) ? esc(o.minutes) + esc(t(C.ui.min)) : "") + "</span>" +
            '<span class="menu__price">' + price(o.price) + "</span>" +
            (has(o.islanderPrice)
              ? '<span class="menu__islander">' + esc(t(C.ui.islander)) + " " + price(o.islanderPrice) + "</span>"
              : "") +
            "</li>"
          );
        }).join("");
        var d = t(it.description);
        return (
          '<li class="menu__item">' +
          '<h3 class="menu__name">' + esc(t(it.name)) + "</h3>" +
          (has(d) ? '<p class="menu__desc">' + br(d) + "</p>" : "") +
          (rows ? '<ul class="menu__opts">' + rows + "</ul>" : "") +
          "</li>"
        );
      }).join("");
      return (
        '<ul class="menu">' + items + "</ul>" +
        (anyIslander ? '<p class="m-note">' + br(t(M.islanderNote)) + "</p>" : "") +
        (!anyPrice ? '<p class="m-note">' + br(t(M.contactNote)) + "</p>" : "") +
        '<div class="m-actions">' + contacts() + "</div>"
      );
    }
    if (name === "access") {
      var AC = C.access;
      var rows = AC.rows.filter(function (r) { return has(t(r.value)); }).map(function (r) {
        return "<div><dt>" + esc(t(r.label)) + "</dt><dd>" + br(t(r.value)) + "</dd></div>";
      }).join("");
      return (
        '<dl class="info">' + rows + "</dl>" +
        (has(AC.mapUrl)
          ? '<p><a class="text-link" href="' + esc(AC.mapUrl) + '" target="_blank" rel="noopener">' + esc(t(AC.mapLabel)) + newTab() + "</a></p>"
          : "")
      );
    }
    return "";
  }

  function renderModals() {
    document.querySelector("[data-modals]").innerHTML = C.nav.map(function (n) {
      var id = "modal-" + n.modal;
      return (
        '<dialog class="modal" id="' + id + '" aria-labelledby="' + id + '-title">' +
        '<div class="modal__bar">' +
        '<button type="button" class="modal__close" data-close>' +
        '<span class="modal__x" aria-hidden="true"></span><span>' + esc(t(C.ui.close)) + "</span></button>" +
        "</div>" +
        '<div class="modal__body">' +
        (lang === "ja" ? '<p class="eyebrow" lang="en">' + esc(n.label) + "</p>" : "") +
        '<h2 class="modal__title" id="' + id + '-title">' + esc(t(n.title)) + "</h2>" +
        modalBody(n.modal) +
        "</div>" +
        "</dialog>"
      );
    }).join("");
  }

  var lastOpener = null;
  function openModal(name, opener) {
    var d = document.getElementById("modal-" + name);
    if (!d) return;
    lastOpener = opener || document.activeElement;
    closeNav(false);
    if (typeof d.showModal === "function") d.showModal();
    else d.setAttribute("open", "");
    root.classList.add("is-modal-open");
    d.scrollTop = 0;
    d.querySelector("[data-close]").focus();
  }
  function closeModal(d) {
    if (d.open && typeof d.close === "function") d.close();
    else { d.removeAttribute("open"); onModalClosed(); }
  }
  function onModalClosed() {
    root.classList.remove("is-modal-open");
    // スマホでメニューから開いた場合は、メニューボタンへフォーカスを戻す
    var target = lastOpener && lastOpener.offsetParent !== null ? lastOpener : menuBtn;
    if (target && target.offsetParent !== null) target.focus();
    lastOpener = null;
  }

  // ---------- mobile nav ----------
  function closeNav(focusBtn) {
    if (!root.classList.contains("is-nav-open")) return;
    root.classList.remove("is-nav-open");
    menuBtn.setAttribute("aria-expanded", "false");
    if (focusBtn) menuBtn.focus();
  }
  menuBtn.addEventListener("click", function () {
    var open = !root.classList.contains("is-nav-open");
    root.classList.toggle("is-nav-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  // ---------- gallery（自動スライド＋手動操作） ----------
  var SECONDS_PER_PHOTO = 5;   // 写真1枚分が移動する秒数
  var RESUME_DELAY = 3000;     // 手動操作が終わってから自動再開までの時間（ミリ秒）
  var carousel = null;

  function initCarousel(el, count) {
    if (!el || !count) return null;
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var items = el.querySelectorAll(".gallery__item");
    var setW = 0, speed = 0, pos = 0, expected = -1;
    var paused = false, holding = false, raf = 0, last = 0, timer = 0, visible = true;
    var drag = null;

    function measure() {
      // 1組分の幅と、1枚分を SECONDS_PER_PHOTO 秒で進む速度
      setW = items[count].offsetLeft - items[0].offsetLeft;
      speed = (items[1].offsetLeft - items[0].offsetLeft) / (SECONDS_PER_PHOTO * 1000);
    }
    // 常に中央の組の範囲に保ち、端に来たら1組分ずらして途切れなく見せる
    function wrap(x) {
      if (x < setW * 0.5) return x + setW;
      if (x >= setW * 1.5) return x - setW;
      return x;
    }
    function setPos(x) {
      pos = x;
      el.scrollLeft = x;
      expected = el.scrollLeft;
    }
    function tick(now) {
      raf = requestAnimationFrame(tick);
      if (!last) { last = now; return; }
      var dt = Math.min(now - last, 64);
      last = now;
      if (paused || holding || !visible || reduceMotion) return;
      setPos(wrap(pos + speed * dt));
    }
    // 手動操作があったら一時停止し、最後の操作から RESUME_DELAY 後に今の位置から再開
    function activity() {
      paused = true;
      clearTimeout(timer);
      if (holding) return;
      timer = setTimeout(function () {
        paused = false;
        pos = el.scrollLeft;
        last = 0;
      }, RESUME_DELAY);
    }
    function hold(on) {
      holding = on;
      activity();
    }

    function onScroll() {
      if (Math.abs(el.scrollLeft - expected) <= 2) return; // 自動スライドによるスクロール
      var w = wrap(el.scrollLeft);
      if (w !== el.scrollLeft) setPos(w); else pos = el.scrollLeft;
      expected = el.scrollLeft;
      activity();
    }
    function onWheel(e) {
      // 横方向のスクロール（トラックパッド・Shift+ホイール）だけを手動操作として扱う
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) activity();
    }
    // PCのマウスドラッグ
    function onPointerDown(e) {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      e.preventDefault();
      drag = { x: e.clientX, start: el.scrollLeft, id: e.pointerId };
      try { el.setPointerCapture(e.pointerId); } catch (err) { /* 取得できなくてもドラッグは続ける */ }
      el.classList.add("is-dragging");
      hold(true);
    }
    function onPointerMove(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var x = drag.start - (e.clientX - drag.x);
      var w = wrap(x);
      drag.start += w - x; // ループの継ぎ目をまたいでもドラッグを途切れさせない
      setPos(w);
    }
    function onPointerUp(e) {
      if (!drag || e.pointerId !== drag.id) return;
      drag = null;
      el.classList.remove("is-dragging");
      hold(false);
    }
    var onTouchStart = function () { hold(true); };
    var onTouchEnd = function () { hold(false); };
    var onFocusIn = function () { hold(true); };
    var onFocusOut = function () { hold(false); };
    function onResize() {
      var ratio = setW ? (el.scrollLeft - setW) / setW : 0;
      measure();
      setPos(setW + ratio * setW);
    }

    var io = "IntersectionObserver" in window
      ? new IntersectionObserver(function (en) { visible = en[en.length - 1].isIntersecting; last = 0; })
      : null;
    if (io) io.observe(el);

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    window.addEventListener("resize", onResize);

    measure();
    setPos(setW);
    raf = requestAnimationFrame(tick);
    // 画像の読み込み後に幅が変わる場合に備えて測り直す
    el.querySelectorAll("img").forEach(function (img) {
      if (!img.complete) img.addEventListener("load", onResize, { once: true });
    });

    return {
      destroy: function () {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
        if (io) io.disconnect();
        window.removeEventListener("resize", onResize);
      },
    };
  }

  // ---------- language ----------
  function setLang(l, save) {
    if (LANGS.indexOf(l) < 0) l = "ja";
    lang = l;
    root.lang = l;
    document.title = t(C.ui.pageTitle);
    renderHeader();
    renderMain();
    renderFooter();
    renderModals();
    // 切り替え後のURLを共有すると同じ言語で開ける（?lang=en）
    if (save && window.history && history.replaceState) {
      var url = location.pathname + (l === "en" ? "?lang=en" : "") + location.hash;
      try { history.replaceState(null, "", url); } catch (e) { /* file:// などで失敗しても表示は続ける */ }
    }
  }

  // ---------- events ----------
  document.addEventListener("click", function (e) {
    var langBtn = e.target.closest(".lang__btn");
    if (langBtn) {
      setLang(langBtn.getAttribute("data-lang"), true);
      return;
    }
    var opener = e.target.closest("[data-open]");
    if (opener) {
      openModal(opener.getAttribute("data-open"), opener);
      return;
    }
    if (e.target.closest("[data-close]")) {
      closeModal(e.target.closest("dialog"));
      return;
    }
    // モーダルの外側（背景）をクリックしたら閉じる
    if (e.target.tagName === "DIALOG") {
      var r = e.target.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeModal(e.target);
      return;
    }
    var a = e.target.closest('a[href^="#"]');
    if (a) {
      closeNav(false);
      var id = a.getAttribute("href").slice(1);
      var target = id && document.getElementById(id);
      if (target) {
        // ページ内リンク先へフォーカスを移す（キーボード・読み上げ利用者向け）
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        setTimeout(function () { target.focus({ preventScroll: true }); }, 0);
      }
      return;
    }
    // スマホメニューの外側をクリックしたら閉じる
    if (root.classList.contains("is-nav-open") && !e.target.closest(".site-header")) closeNav(false);
  });
  // dialog の close（Escキー含む）
  document.addEventListener("close", function (e) {
    if (e.target.tagName === "DIALOG") onModalClosed();
  }, true);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && root.classList.contains("is-nav-open")) closeNav(true);
  });

  // ---------- init ----------
  // 初期表示は日本語。URLに ?lang=en がある場合のみ英語で開く
  var q = (location.search.match(/[?&]lang=(ja|en)\b/) || [])[1];
  setLang(q || "ja", false);
})();
