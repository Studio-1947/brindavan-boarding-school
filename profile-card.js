/* ProfileCard interaction engine (reactbits.dev) ported from React to plain JS.
   Upgrades any .profile-card already in the markup - no framework, no build step.
   Per-card options come from data attributes:
     data-tilt="false"      turn the tilt off
     data-tilt-strength="12"  max tilt angle in degrees
     data-parallax="8"        portrait shift in px
     data-intro="true"        catch the light once on load
     data-mobile-tilt="true"  follow phone motion after a tap (needs HTTPS) */
(() => {
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const num = (el, name, fallback) => {
    const v = parseFloat(el.dataset[name]);
    return Number.isFinite(v) ? v : fallback;
  };

  const setup = root => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const opts = {
      tilt: root.dataset.tilt !== 'false',
      strength: num(root, 'tiltStrength', 12),
      parallax: num(root, 'parallax', 8),
      intro: root.dataset.intro === 'true',
      mobileTilt: root.dataset.mobileTilt === 'true',
      sensitivity: num(root, 'mobileTiltSensitivity', 5)
    };
    const size = { w: root.offsetWidth, h: root.offsetHeight };
    const x = { p: 0, v: 0, target: 0 };
    const y = { p: 0, v: 0, target: 0 };
    const light = { p: 0, target: 0 };
    let raf = 0, last = 0, slowUntil = 0, touchId = null;

    const write = () => {
      const angle = opts.tilt && !reduced ? opts.strength : 0;
      const depth = reduced ? 0 : opts.parallax;
      const reach = Math.min(1, Math.hypot(x.p, y.p));
      const s = root.style;
      s.setProperty('--pc-light-x', `${((x.p + 1) * 0.5 * size.w).toFixed(1)}px`);
      s.setProperty('--pc-light-y', `${((y.p + 1) * 0.5 * size.h).toFixed(1)}px`);
      s.setProperty('--pc-pointer-x', `${((x.p + 1) * 50).toFixed(2)}%`);
      s.setProperty('--pc-pointer-y', `${((y.p + 1) * 50).toFixed(2)}%`);
      s.setProperty('--pc-band-x', `${(50 + x.p * 15).toFixed(2)}%`);
      s.setProperty('--pc-band-y', `${(50 + y.p * 15).toFixed(2)}%`);
      s.setProperty('--pc-rotate-x', `${(y.p * angle).toFixed(3)}deg`);
      s.setProperty('--pc-rotate-y', `${(-x.p * angle).toFixed(3)}deg`);
      s.setProperty('--pc-shift-x', `${(x.p * depth).toFixed(2)}px`);
      s.setProperty('--pc-shift-y', `${(y.p * depth).toFixed(2)}px`);
      s.setProperty('--pc-reach', reach.toFixed(4));
      s.setProperty('--pc-tilt', (reach * light.p).toFixed(4));
      s.setProperty('--pc-active', light.p.toFixed(4));
    };

    const frame = now => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const slow = now < slowUntil;
      const stiffness = slow ? 24 : 120;
      const damping = slow ? 9 : 16;
      const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        for (const axis of [x, y]) {
          axis.v += (stiffness * (axis.target - axis.p) - damping * axis.v) * h;
          axis.p += axis.v * h;
        }
      }
      const tau = light.target > light.p ? 0.18 : slow ? 0.9 : 0.45;
      light.p += (light.target - light.p) * (1 - Math.exp(-dt / tau));
      write();
      const moving =
        Math.abs(x.target - x.p) > 0.0005 || Math.abs(y.target - y.p) > 0.0005 ||
        Math.abs(x.v) > 0.0005 || Math.abs(y.v) > 0.0005 ||
        Math.abs(light.target - light.p) > 0.002;
      if (moving) { raf = requestAnimationFrame(frame); return; }
      x.p = x.target; y.p = y.target; light.p = light.target;
      write();
      raf = 0;
    };

    const wake = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };
    const aim = (nx, ny, on = true) => {
      x.target = clamp(nx, -1, 1);
      y.target = clamp(ny, -1, 1);
      light.target = on ? 1 : 0;
      slowUntil = 0;
      wake();
    };
    const aimAt = e => {
      const r = root.getBoundingClientRect();
      if (!r.width || !r.height) return;
      aim(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const release = () => aim(0, 0, false);

    root.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') aimAt(e); });
    root.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || e.pointerId === touchId) aimAt(e); });
    root.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') release(); });
    root.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') { touchId = e.pointerId; aimAt(e); } });
    const up = e => { if (e.pointerId === touchId) { touchId = null; release(); } };
    root.addEventListener('pointerup', up);
    root.addEventListener('pointercancel', up);

    new ResizeObserver(() => { size.w = root.offsetWidth; size.h = root.offsetHeight; write(); }).observe(root);

    if (opts.mobileTilt) {
      let listening = false;
      const onOrientation = e => {
        if (e.beta == null || e.gamma == null) return;
        aim((e.gamma * opts.sensitivity) / 150, ((e.beta - 20) * opts.sensitivity) / 150);
      };
      root.addEventListener('click', () => {
        const Motion = window.DeviceOrientationEvent;
        const listen = () => { if (!listening) { listening = true; window.addEventListener('deviceorientation', onOrientation); } };
        if (Motion && typeof Motion.requestPermission === 'function') {
          Motion.requestPermission().then(s => { if (s === 'granted') listen(); }).catch(() => {});
        } else listen();
      });
    }

    if (opts.intro && !reduced) {
      x.p = 0.62; y.p = -0.55; light.p = 1;
      slowUntil = performance.now() + 1400;
      write(); wake();
    } else {
      write();
    }
  };

  // Only wire up cards once they are near the viewport - the faculty grid has 30 of them.
  const cards = document.querySelectorAll('.profile-card');
  if (!cards.length) return;
  if (!('IntersectionObserver' in window)) { cards.forEach(setup); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      setup(entry.target);
    });
  }, { rootMargin: '200px' });
  cards.forEach(c => io.observe(c));
})();
