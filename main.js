(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');

  // Theme toggle (dark by default, persisted)
  var themeBtn = document.getElementById('theme-btn');
  function syncThemeLabel() {
    var light = doc.classList.contains('light');
    themeBtn.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', light ? '#ffffff' : '#030712');
  }
  themeBtn.addEventListener('click', function () {
    doc.classList.toggle('light');
    try { localStorage.setItem('rm-theme', doc.classList.contains('light') ? 'light' : 'dark'); } catch (e) {}
    syncThemeLabel();
  });
  syncThemeLabel();

  // Full-screen menu
  var menuBtn = document.getElementById('menu-btn');
  var overlay = document.getElementById('menu-overlay');
  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('lock', open);
    if (open) {
      overlay.hidden = false;
      requestAnimationFrame(function () { overlay.classList.add('open'); });
      var first = overlay.querySelector('a'); if (first) first.focus();
    } else {
      overlay.classList.remove('open');
      setTimeout(function () { overlay.hidden = true; }, 300);
    }
  }
  menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
  overlay.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !overlay.hidden) { setMenu(false); menuBtn.focus(); } });

  // Top bar: frosted after scroll, hides on scroll down, shows on scroll up; back-to-top
  var bar = document.getElementById('topbar');
  var toTop = document.getElementById('back-to-top');
  var lastY = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    bar.classList.toggle('scrolled', y > 20);
    bar.classList.toggle('hide', y > lastY && y > 300 && overlay.hidden);
    toTop.classList.toggle('show', y > window.innerHeight);
    lastY = y;
  }, { passive: true });

  // Active nav link
  var links = document.querySelectorAll('.topnav a');
  var ids = ['start', 'about', 'work', 'experience'];
  if ('IntersectionObserver' in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach(function (id) { var el = document.getElementById(id); if (el) navIO.observe(el); });

    // Reveal on scroll
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // Carousels
  document.querySelectorAll('.carousel-btn').forEach(function (btn) {
    var track = document.getElementById(btn.dataset.target);
    btn.addEventListener('click', function () {
      var card = track.querySelector('li');
      var step = card ? card.getBoundingClientRect().width + 16 : 300;
      track.scrollBy({ left: step * Number(btn.dataset.dir), behavior: 'smooth' });
    });
  });
  function syncCarousel(track) {
    var max = track.scrollWidth - track.clientWidth - 2;
    document.querySelectorAll('.carousel-btn[data-target="' + track.id + '"]').forEach(function (b) {
      b.disabled = Number(b.dataset.dir) < 0 ? track.scrollLeft <= 2 : track.scrollLeft >= max;
    });
  }
  document.querySelectorAll('.carousel').forEach(function (track) {
    track.addEventListener('scroll', function () { syncCarousel(track); }, { passive: true });
    window.addEventListener('resize', function () { syncCarousel(track); });
    syncCarousel(track);
  });

  var yr = document.getElementById('year'); if (yr) yr.textContent = new Date().getFullYear();
})();
