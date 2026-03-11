/* ══════════════════════════════════════════
   SAKINA — سكينة · Landing Page Scripts
   ══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Email anti-scrape ── */
  var em = document.getElementById('emailLink');
  if (em) em.href = 'mai' + 'lto:' + 'contact' + '@sakina.app';

  /* ── GSAP ── */
  gsap.registerPlugin(ScrollTrigger);
  var html = document.documentElement;

  /* ────────────────────────────────────
     THEME TOGGLE
  ──────────────────────────────────── */
  document.getElementById('tglBtn').addEventListener('click', function () {
    var dark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', dark ? 'light' : 'dark');
    gsap.to('.orb', { scale: 1.08, duration: .5, yoyo: true, repeat: 1, ease: 'power2.inOut' });
  });

  /* ────────────────────────────────────
     SCROLL PROGRESS BAR
  ──────────────────────────────────── */
  window.addEventListener('scroll', function () {
    var pct = (window.scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100;
    document.getElementById('pb').style.width = pct + '%';
    document.querySelector('nav').style.boxShadow = window.scrollY > 60
      ? '0 4px 40px rgba(0,0,0,.3)'
      : 'none';
  }, { passive: true });

  /* ────────────────────────────────────
     HERO ENTRANCE
     Set hidden first, then animate to visible
  ──────────────────────────────────── */
  ['#hbadge', '#hbism', '#ht1', '#htar', '#htag', '#hctas', '.scroll-h'].forEach(function (sel) {
    var el = document.querySelector(sel);
    if (el) { el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; }
  });
  gsap.timeline({ delay: 0.1 })
    .to('#hbadge',   { opacity: 1,    y: 0, duration: .7,  ease: 'power3.out', clearProps: 'transform' }, 0)
    .to('#hbism',    { opacity: .35,  y: 0, duration: .8,  ease: 'power3.out', clearProps: 'transform' }, .18)
    .to('#ht1',      { opacity: 1,    y: 0, duration: .85, ease: 'power3.out', clearProps: 'transform' }, .32)
    .to('#htar',     { opacity: 1,    y: 0, duration: .85, ease: 'power3.out', clearProps: 'transform' }, .5)
    .to('#htag',     { opacity: 1,    y: 0, duration: .75, ease: 'power3.out', clearProps: 'transform' }, .66)
    .to('#hctas',    { opacity: 1,    y: 0, duration: .65, ease: 'power3.out', clearProps: 'transform' }, .82)
    .to('.scroll-h', { opacity: .6,   y: 0, duration: .5,  ease: 'power2.out', clearProps: 'transform' }, 1.2);

  /* ────────────────────────────────────
     PARALLAX STARS
  ──────────────────────────────────── */
  document.querySelectorAll('.pstar').forEach(function (s, i) {
    gsap.set(s, { opacity: 0 });
    gsap.to(s, { opacity: .4 + Math.random() * .4, duration: 1.1, delay: .4 + i * .18, ease: 'power2.out' });
    gsap.to(s, { y: '+=10', duration: 2.5 + i * .5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * .3 });
  });

  /* ────────────────────────────────────
     MOUSE PARALLAX
  ──────────────────────────────────── */
  document.addEventListener('mousemove', function (e) {
    var mx = (e.clientX / innerWidth - .5) * 2;
    var my = (e.clientY / innerHeight - .5) * 2;
    gsap.to('.o1', { x: mx * 28,  y: my * 18,  duration: 1.5, ease: 'power1.out' });
    gsap.to('.o2', { x: mx * -18, y: my * -13, duration: 1.8, ease: 'power1.out' });
    gsap.to('.o3', { x: mx * 12,  y: my * 22,  duration: 2,   ease: 'power1.out' });
    document.querySelectorAll('.pstar').forEach(function (s, i) {
      var d = .3 + (i % 3) * .4;
      gsap.to(s, { x: mx * 18 * d, y: my * 13 * d, duration: 1.2, ease: 'power1.out' });
    });
    gsap.to('#ht1, #htar', { x: mx * 6, duration: 1.5, ease: 'power1.out' });
  });

  /* ────────────────────────────────────
     SCROLL REVEAL — IntersectionObserver
     Most reliable cross-browser approach
  ──────────────────────────────────── */
  var animEls = document.querySelectorAll('.anim');
  animEls.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(36px)';
  });
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        gsap.to(el, { opacity: 1, y: 0, duration: .85, ease: 'power3.out', clearProps: 'transform' });
        revealObs.unobserve(el);
      }
    });
  }, { threshold: 0.08 });
  animEls.forEach(function (el) { revealObs.observe(el); });

  /* ────────────────────────────────────
     FEATURE CARD HOVER
  ──────────────────────────────────── */
  document.querySelectorAll('.fc').forEach(function (c) {
    c.addEventListener('mouseenter', function () { gsap.to(c, { scale: 1.012, duration: .4, ease: 'power2.out' }); });
    c.addEventListener('mouseleave', function () { gsap.to(c, { scale: 1,     duration: .4, ease: 'power2.out' }); });
  });

  /* ────────────────────────────────────
     CTA HOVER GLOW
  ──────────────────────────────────── */
  document.querySelectorAll('.cta-p').forEach(function (b) {
    b.addEventListener('mouseenter', function () { gsap.to(b, { boxShadow: '0 12px 60px rgba(212,160,64,.44)', duration: .35 }); });
    b.addEventListener('mouseleave', function () { gsap.to(b, { boxShadow: '0 4px 30px rgba(212,160,64,.2)',  duration: .35 }); });
  });

  /* ────────────────────────────────────
     FOOTER SOCIALS ENTRANCE
  ──────────────────────────────────── */
  (function () {
    var done = false;
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !done) {
        done = true;
        var links = document.querySelectorAll('.slink');
        links.forEach(function (l) { l.style.opacity = '0'; l.style.transform = 'scale(.5)'; });
        links.forEach(function (l, i) {
          gsap.to(l, { opacity: 1, scale: 1, duration: .55, delay: i * .12, ease: 'back.out(1.7)', clearProps: 'transform' });
        });
      }
    }, { threshold: 0.3 }).observe(document.querySelector('footer'));
  })();

  /* ────────────────────────────────────
     MOOD CHIPS — CLICK INTERACTION
  ──────────────────────────────────── */
  document.querySelectorAll('.mchip').forEach(function (c) {
    c.addEventListener('click', function () {
      document.querySelectorAll('.mchip').forEach(function (x) { x.classList.remove('active'); });
      c.classList.add('active');
      gsap.to('#mr', {
        opacity: 0, y: -8, duration: .22, onComplete: function () {
          document.getElementById('mrt').textContent = c.dataset.r;
          document.getElementById('mra').textContent = c.dataset.a || 'سُبْحَانَ اللَّهِ';
          gsap.to('#mr', { opacity: 1, y: 0, duration: .45, ease: 'power3.out' });
        }
      });
      gsap.to(c, { scale: 1.1, duration: .16, yoyo: true, repeat: 1, ease: 'power2.out' });
    });
  });

  /* ────────────────────────────────────
     MOOD CHIPS ENTRANCE
  ──────────────────────────────────── */
  (function () {
    var done = false;
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !done) {
        done = true;
        var chips = document.querySelectorAll('.mchip');
        chips.forEach(function (c) { c.style.opacity = '0'; c.style.transform = 'scale(.82)'; });
        chips.forEach(function (c, i) {
          gsap.to(c, { opacity: 1, scale: 1, duration: .4, delay: i * .04, ease: 'back.out(1.4)', clearProps: 'transform' });
        });
      }
    }, { threshold: 0.1 }).observe(document.getElementById('mgrid'));
  })();

  /* ────────────────────────────────────
     WAVEFORM HOVER INTENSIFY
  ──────────────────────────────────── */
  var qpEl = document.querySelector('.qp');
  if (qpEl) {
    qpEl.addEventListener('mouseenter', function () {
      document.querySelectorAll('.wb').forEach(function (b, i) {
        gsap.to(b, { scaleY: 1.8, opacity: 1, duration: .3, delay: i * .04, ease: 'power2.out', yoyo: true, repeat: -1 });
      });
    });
    qpEl.addEventListener('mouseleave', function () {
      document.querySelectorAll('.wb').forEach(function (b) {
        gsap.killTweensOf(b);
        gsap.to(b, { scaleY: 1, opacity: .5, duration: .3 });
      });
    });
  }

  /* ────────────────────────────────────
     SETTINGS ROWS ENTRANCE
  ──────────────────────────────────── */
  (function () {
    var done = false;
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !done) {
        done = true;
        var rows = document.querySelectorAll('.srow');
        rows.forEach(function (r) { r.style.opacity = '0'; r.style.transform = 'translateX(16px)'; });
        rows.forEach(function (r, i) {
          gsap.to(r, { opacity: 1, x: 0, duration: .5, delay: i * .07, ease: 'power2.out', clearProps: 'transform' });
        });
      }
    }, { threshold: 0.1 }).observe(document.querySelector('.sprv'));
  })();

  /* ────────────────────────────────────
     ARABIC GLOW PULSE
  ──────────────────────────────────── */
  gsap.to('#htar', {
    textShadow: '0 0 80px rgba(212,160,64,.55)',
    duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });

  /* ────────────────────────────────────
     VERSE SECTION ENTRANCE
  ──────────────────────────────────── */
  (function () {
    var done = false;
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !done) {
        done = true;
        var varEl = document.querySelector('.var');
        var vdivs = document.querySelectorAll('.vdiv');
        if (varEl) {
          varEl.style.opacity = '0'; varEl.style.transform = 'scale(.93)';
          gsap.to(varEl, { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', clearProps: 'transform' });
        }
        vdivs.forEach(function (d) { d.style.transform = 'scaleX(0)'; });
        vdivs.forEach(function (d, i) {
          gsap.to(d, { scaleX: 1, duration: .9, delay: i * .3, ease: 'power3.out', clearProps: 'transform' });
        });
      }
    }, { threshold: 0.2 }).observe(document.querySelector('.verse-sec'));
  })();

  /* ════════════════════════════════════
     PRAYER TIMES
  ════════════════════════════════════ */
  var ptTarget = null;
  var ptTimer  = null;

  function getPrayerTimes() {
    var btn = document.getElementById('glocBtn');
    var msg = document.getElementById('pstatus');

    btn.innerHTML = '<span style="display:inline-block;animation:spin .7s linear infinite">↻</span>&nbsp; Locating you…';
    btn.disabled = true;
    msg.textContent = 'Requesting location permission…';

    if (!navigator.geolocation) {
      msg.textContent = 'Geolocation not supported by your browser.';
      btn.textContent = 'Retry'; btn.disabled = false; return;
    }

    navigator.geolocation.getCurrentPosition(
      function (pos) {
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;
        msg.textContent = 'Fetching prayer times…';

        /* Reverse geocode city name */
        var cityPromise = fetch(
          'https://nominatim.openstreetmap.org/reverse?lat=' + lat + '&lon=' + lng + '&format=json'
        )
          .then(function (r) { return r.json(); })
          .then(function (d) {
            return d.address.city || d.address.town || d.address.village || d.address.county
              || (lat.toFixed(2) + '°, ' + lng.toFixed(2) + '°');
          })
          .catch(function () { return lat.toFixed(2) + '°, ' + lng.toFixed(2) + '°'; });

        /* Prayer times from Aladhan */
        var now = new Date();
        var dd  = String(now.getDate()).padStart(2, '0');
        var mm  = String(now.getMonth() + 1).padStart(2, '0');
        var yy  = now.getFullYear();
        var prayerPromise = fetch(
          'https://api.aladhan.com/v1/timings/' + dd + '-' + mm + '-' + yy
          + '?latitude=' + lat + '&longitude=' + lng + '&method=2'
        ).then(function (r) { return r.json(); });

        Promise.all([cityPromise, prayerPromise]).then(function (results) {
          var city = results[0];
          var data = results[1];
          if (data.code !== 200) throw new Error('API error');

          var t = data.data.timings;
          var prayers = [
            { ar: 'الفجر',  en: 'Fajr',    time: t.Fajr    },
            { ar: 'الشروق', en: 'Sunrise',  time: t.Sunrise },
            { ar: 'الظهر',  en: 'Dhuhr',   time: t.Dhuhr   },
            { ar: 'العصر',  en: 'Asr',     time: t.Asr     },
            { ar: 'المغرب', en: 'Maghrib',  time: t.Maghrib },
            { ar: 'العشاء', en: 'Isha',    time: t.Isha    }
          ];

          var nextIdx = -1;
          var parsed  = prayers.map(function (p, i) {
            var parts = p.time.split(':');
            var hh = parseInt(parts[0]);
            var mi = parseInt(parts[1]);
            var d  = new Date(now); d.setHours(hh, mi, 0, 0);
            if (d > now && nextIdx === -1) nextIdx = i;
            return { ar: p.ar, en: p.en, time: p.time, d: d };
          });

          /* Render prayer rows */
          var rowsEl = document.getElementById('prows');
          rowsEl.innerHTML = '';
          parsed.forEach(function (p, i) {
            var isCur  = (i === nextIdx);
            var isPast = (p.d <= now && !isCur);
            var hh     = p.d.getHours();
            var mi     = p.d.getMinutes();
            var ampm   = hh >= 12 ? 'PM' : 'AM';
            var fmt    = (hh % 12 || 12) + ':' + String(mi).padStart(2, '0') + ' ' + ampm;

            var div = document.createElement('div');
            div.className = 'prow' + (isCur ? ' cur' : '') + (isPast ? ' past' : '');
            div.innerHTML =
              '<span class="p-ar">' + p.ar + '</span>'
              + '<span class="p-en">' + p.en + '</span>'
              + '<span class="p-t">' + fmt + (isCur ? '<span class="nbadge">Next</span>' : '') + '</span>';
            rowsEl.appendChild(div);

            if (isCur) { ptTarget = p.d; document.getElementById('cdnext').textContent = 'Until ' + p.en; }
          });

          if (nextIdx === -1) {
            var tf = new Date(parsed[0].d); tf.setDate(tf.getDate() + 1);
            ptTarget = tf;
            document.getElementById('cdnext').textContent = 'Until Fajr';
          }

          /* Hijri date */
          var hijri = '—';
          try { hijri = new Intl.DateTimeFormat('en-TN-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(now); } catch (e) {}

          document.getElementById('ptloc').innerHTML =
            '<svg class="svg-i" width="12" height="12" viewBox="0 0 24 24" style="stroke:var(--g);flex-shrink:0">'
            + '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>'
            + '<circle cx="12" cy="10" r="3"/></svg> ' + city;
          document.getElementById('pthijri').textContent = hijri;
          document.getElementById('pstatus').textContent = 'Prayer times loaded for your location.';
          btn.style.display = 'none';

          /* Animate rows in */
          document.querySelectorAll('#prows .prow').forEach(function (row, i) {
            var target = row.classList.contains('past') ? 0.4 : 1;
            gsap.fromTo(row, { opacity: 0, x: -14 }, { opacity: target, x: 0, duration: .45, delay: i * .07, ease: 'power2.out' });
          });

          /* Start countdown */
          if (ptTimer) clearInterval(ptTimer);
          ptTimer = setInterval(tickCD, 1000);
          tickCD();

        }).catch(function (err) {
          console.error(err);
          msg.textContent = 'Could not load prayer times. Please try again.';
          btn.textContent = 'Retry'; btn.disabled = false;
        });
      },
      function () {
        document.getElementById('pstatus').textContent = 'Location denied. Enable location access and retry.';
        document.getElementById('glocBtn').textContent = 'Retry';
        document.getElementById('glocBtn').disabled = false;
      },
      { timeout: 12000 }
    );
  }

  function tickCD() {
    if (!ptTarget) return;
    var diff = Math.max(0, ptTarget - new Date());
    var h  = String(Math.floor(diff / 3600000)).padStart(2, '0');
    var m  = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    var s  = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    document.getElementById('cdh').textContent = h;
    document.getElementById('cdm').textContent = m;
    var sEl = document.getElementById('cds');
    if (sEl.textContent !== s) {
      sEl.textContent = s;
      gsap.fromTo(sEl, { y: -4, opacity: 0 }, { y: 0, opacity: 1, duration: .22, ease: 'power2.out' });
    }
  }

  /* Wire up the prayer times button */
  document.getElementById('glocBtn').addEventListener('click', getPrayerTimes);

})();
