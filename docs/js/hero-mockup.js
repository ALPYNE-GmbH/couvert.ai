/* Block 4 — Hero cockpit autoplay-fake-interaction
   Signals "this is alive + interactive" without heavy animation.
   - Pause on hover, resume 2s after mouseleave
   - Click anywhere on mockup → /cockpit/
   - Respects prefers-reduced-motion
   - Mobile: reduced animation (pill cycle only)
*/
(function(){
  var dash = document.getElementById('hero-dashboard');
  if(!dash) return;

  // Wrap dashboard as interactive card
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.matchMedia('(max-width:1023px)').matches;

  // Make whole mockup clickable → cockpit
  dash.style.cursor = 'pointer';
  dash.setAttribute('role','link');
  dash.setAttribute('tabindex','0');
  dash.setAttribute('aria-label','Cockpit live erkunden');
  function goCockpit(){ window.location.href='/cockpit/'; }
  dash.addEventListener('click', function(e){
    // allow iframe interactions to take precedence if user really clicks inside
    if(e.target && e.target.closest && e.target.closest('iframe')) return;
    goCockpit();
  });
  dash.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); goCockpit(); }});

  // Inject "→ Live erkunden" badge
  var badge = document.createElement('div');
  badge.className = 'hero-live-badge';
  badge.textContent = '→ Live erkunden';
  // DE/EN detection
  if(document.documentElement.lang && document.documentElement.lang.toLowerCase().indexOf('en')===0){
    badge.textContent = '→ Explore live';
  }
  dash.appendChild(badge);

  // Inject overlay pills strip (visual Zeitbereich-cycle)
  var pillStrip = document.createElement('div');
  pillStrip.className = 'hero-pills-overlay';
  var pillLabels = (document.documentElement.lang||'').toLowerCase().indexOf('en')===0
    ? ['7 days','30 days','April 2026','YTD','12 months']
    : ['7 Tage','30 Tage','April 2026','YTD','12 Monate'];
  pillLabels.forEach(function(l,i){
    var p = document.createElement('span');
    p.className = 'hero-pill' + (i===0 ? ' is-active' : '');
    p.textContent = l;
    pillStrip.appendChild(p);
  });
  dash.appendChild(pillStrip);

  // Inject ticker (small number-counter that wiggles)
  var ticker = document.createElement('div');
  ticker.className = 'hero-ticker';
  ticker.innerHTML = '<span class="ht-dot"></span><span class="ht-num" id="heroTickerNum">CHF 392K</span>';
  dash.appendChild(ticker);

  // Respect reduced motion: static display only
  if(reduce){
    badge.classList.add('is-static');
    return;
  }

  // Autoplay loop
  var pills = pillStrip.querySelectorAll('.hero-pill');
  var idx = 0;
  var tickerEl = document.getElementById('heroTickerNum');
  var tickerVals = ['CHF 392K','CHF 398K','CHF 405K','CHF 401K','CHF 412K'];

  var timerId = null;
  function tick(){
    idx = (idx+1) % pills.length;
    pills.forEach(function(p,i){ p.classList.toggle('is-active', i===idx); });
    if(tickerEl) tickerEl.textContent = tickerVals[idx % tickerVals.length];
  }
  function start(){
    if(timerId) return;
    timerId = setInterval(tick, 3000);
  }
  function stop(){
    if(timerId){ clearInterval(timerId); timerId = null; }
  }

  // Pause on hover (desktop)
  if(!isMobile){
    var resumeT = null;
    dash.addEventListener('mouseenter', function(){
      stop();
      if(resumeT){ clearTimeout(resumeT); resumeT = null; }
    });
    dash.addEventListener('mouseleave', function(){
      if(resumeT) clearTimeout(resumeT);
      resumeT = setTimeout(start, 2000);
    });
  }

  // Kick off after hero-reveal
  setTimeout(start, 1200);
})();
