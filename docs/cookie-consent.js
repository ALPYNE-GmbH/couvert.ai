/* cookie-consent.js — Couvert.ai self-hosted consent banner
   nDSG (CH) + DSGVO (EU) compliant: opt-in, persisted 365 days, blocks non-essential
   cookies until user action. Vanilla JS, no dependencies. ~180 lines.

   Public API:
     window.couvertConsent.hasConsented()          → 'accepted' | 'essential' | null
     window.couvertConsent.reopen()                 → re-shows banner (for "Cookie-Einstellungen" link)
     window.couvertConsent.reset()                  → clears stored choice

   Events (dispatched on window):
     'couvert:consent-given'        detail: { mode: 'accepted' | 'essential' }
     'couvert:consent-withdrawn'    detail: {}

   How to gate future trackers:
     window.addEventListener('couvert:consent-given', (e) => {
       if (e.detail.mode === 'accepted') { /* load analytics *\/ }
     });
*/
(function () {
  'use strict';

  var STORAGE_KEY = 'couvert_consent_v1';
  var TTL_DAYS = 365;

  var lang = (document.documentElement.getAttribute('lang') || 'de').toLowerCase().slice(0, 2);
  if (lang !== 'en') lang = 'de';

  var t = {
    de: {
      title: 'Datenschutz & Cookies',
      body: 'Wir nutzen technisch notwendige Cookies, um die Website zu betreiben. Optionale Cookies (z.B. Reichweitenmessung) setzen wir nur mit Ihrer Einwilligung. Sie können Ihre Wahl jederzeit widerrufen.',
      linkText: 'Datenschutzerklärung',
      linkHref: '/datenschutz.html',
      accept: 'Alle akzeptieren',
      essential: 'Nur notwendige',
      aria: 'Cookie-Einwilligung'
    },
    en: {
      title: 'Privacy & Cookies',
      body: 'We use strictly necessary cookies to operate this site. Optional cookies (e.g. analytics) are only set with your consent. You can withdraw your choice at any time.',
      linkText: 'Privacy policy',
      linkHref: '/datenschutz.html',
      accept: 'Accept all',
      essential: 'Essential only',
      aria: 'Cookie consent'
    }
  }[lang];

  function read() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || !parsed.ts || !parsed.mode) return null;
      var ageMs = Date.now() - parsed.ts;
      if (ageMs > TTL_DAYS * 86400000) return null;
      return parsed.mode;
    } catch (e) { return null; }
  }

  function write(mode) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode: mode, ts: Date.now() }));
    } catch (e) {}
  }

  function injectStyles() {
    if (document.getElementById('couvert-consent-styles')) return;
    var s = document.createElement('style');
    s.id = 'couvert-consent-styles';
    s.textContent = [
      '.couvert-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;',
      'background:#FAF7F2;color:#1A3C34;border:1px solid rgba(26,60,52,0.14);',
      'border-radius:12px;box-shadow:0 8px 32px rgba(26,60,52,0.12),0 2px 8px rgba(26,60,52,0.06);',
      'font-family:"DM Sans",system-ui,sans-serif;font-size:14px;line-height:1.55;',
      'padding:20px 22px;max-width:760px;margin:0 auto;',
      'display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap;',
      'opacity:0;transform:translateY(12px);transition:opacity .3s ease,transform .3s ease}',
      '.couvert-consent.is-visible{opacity:1;transform:translateY(0)}',
      '.couvert-consent-body{flex:1 1 320px;min-width:260px}',
      '.couvert-consent-title{font-weight:600;font-size:15px;margin:0 0 6px;color:#1A3C34;letter-spacing:-0.01em}',
      '.couvert-consent-text{margin:0;color:#3A4F48;font-weight:400}',
      '.couvert-consent-text a{color:#C4673A;text-decoration:underline;text-underline-offset:2px}',
      '.couvert-consent-text a:hover{color:#A8552E}',
      '.couvert-consent-actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center;flex:0 0 auto}',
      '.couvert-consent-btn{font-family:inherit;font-size:13px;font-weight:600;letter-spacing:0;',
      'padding:10px 18px;border-radius:8px;border:1px solid transparent;cursor:pointer;',
      'transition:background .15s ease,border-color .15s ease,transform .1s ease;white-space:nowrap}',
      '.couvert-consent-btn:active{transform:translateY(1px)}',
      '.couvert-consent-btn--primary{background:#C4673A;color:#FAF7F2;border-color:#C4673A}',
      '.couvert-consent-btn--primary:hover{background:#A8552E;border-color:#A8552E}',
      '.couvert-consent-btn--ghost{background:transparent;color:#1A3C34;border-color:rgba(26,60,52,0.2)}',
      '.couvert-consent-btn--ghost:hover{background:rgba(26,60,52,0.05);border-color:rgba(26,60,52,0.35)}',
      '@media(max-width:640px){.couvert-consent{padding:18px;left:12px;right:12px;bottom:12px}',
      '.couvert-consent-actions{width:100%}.couvert-consent-btn{flex:1 1 auto;text-align:center}}',
      '@media(prefers-reduced-motion:reduce){.couvert-consent{transition:none}}'
    ].join('');
    document.head.appendChild(s);
  }

  function removeBanner() {
    var el = document.getElementById('couvert-consent-banner');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function renderBanner() {
    removeBanner();
    injectStyles();

    var wrap = document.createElement('div');
    wrap.id = 'couvert-consent-banner';
    wrap.className = 'couvert-consent';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', t.aria);
    wrap.setAttribute('aria-live', 'polite');

    wrap.innerHTML =
      '<div class="couvert-consent-body">' +
        '<p class="couvert-consent-title">' + t.title + '</p>' +
        '<p class="couvert-consent-text">' + t.body + ' ' +
          '<a href="' + t.linkHref + '">' + t.linkText + '</a>.' +
        '</p>' +
      '</div>' +
      '<div class="couvert-consent-actions">' +
        '<button type="button" class="couvert-consent-btn couvert-consent-btn--ghost" data-consent="essential">' + t.essential + '</button>' +
        '<button type="button" class="couvert-consent-btn couvert-consent-btn--primary" data-consent="accepted">' + t.accept + '</button>' +
      '</div>';

    document.body.appendChild(wrap);
    // Trigger CSS transition on next frame.
    requestAnimationFrame(function () { wrap.classList.add('is-visible'); });

    wrap.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-consent]');
      if (!btn) return;
      var mode = btn.getAttribute('data-consent');
      decide(mode);
    });
  }

  function decide(mode) {
    if (mode !== 'accepted' && mode !== 'essential') return;
    write(mode);
    var el = document.getElementById('couvert-consent-banner');
    if (el) {
      el.classList.remove('is-visible');
      setTimeout(removeBanner, 300);
    }
    try {
      window.dispatchEvent(new CustomEvent('couvert:consent-given', { detail: { mode: mode } }));
    } catch (e) {}
  }

  function init() {
    var existing = read();
    if (existing) return; // already decided; stay silent
    renderBanner();
  }

  window.couvertConsent = {
    hasConsented: read,
    reopen: renderBanner,
    reset: function () {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      try { window.dispatchEvent(new CustomEvent('couvert:consent-withdrawn', { detail: {} })); } catch (e) {}
      renderBanner();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
