/* ProfileCard interaction engine (reactbits.dev): a spring-driven tilt and light
   that follows the pointer. It only writes CSS custom properties on the card;
   src/styles/profile-card.css turns them into the visual effect. */

export type ProfileCardOptions = {
  /** Turn the tilt off with false. */
  tilt: boolean;
  /** Max tilt angle in degrees. */
  tiltStrength: number;
  /** Portrait shift in px. */
  parallax: number;
  /** Catch the light once on load. */
  intro: boolean;
  /** Follow phone motion after a tap (needs HTTPS). */
  mobileTilt: boolean;
  mobileTiltSensitivity: number;
};

export const profileCardDefaults: ProfileCardOptions = {
  tilt: true,
  tiltStrength: 12,
  parallax: 8,
  intro: false,
  mobileTilt: false,
  mobileTiltSensitivity: 5,
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

type OrientationEventStatic = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied'>;
};

/** Wires one card up and returns a function that undoes it. */
export function setupProfileCard(root: HTMLElement, options: Partial<ProfileCardOptions> = {}) {
  const opts = { ...profileCardDefaults, ...options };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const size = { w: root.offsetWidth, h: root.offsetHeight };
  const x = { p: 0, v: 0, target: 0 };
  const y = { p: 0, v: 0, target: 0 };
  const light = { p: 0, target: 0 };
  let raf = 0;
  let last = 0;
  let slowUntil = 0;
  let touchId: number | null = null;

  const write = () => {
    const angle = opts.tilt && !reduced ? opts.tiltStrength : 0;
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

  const frame = (now: number) => {
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
      Math.abs(x.target - x.p) > 0.0005 ||
      Math.abs(y.target - y.p) > 0.0005 ||
      Math.abs(x.v) > 0.0005 ||
      Math.abs(y.v) > 0.0005 ||
      Math.abs(light.target - light.p) > 0.002;
    if (moving) {
      raf = requestAnimationFrame(frame);
      return;
    }
    x.p = x.target;
    y.p = y.target;
    light.p = light.target;
    write();
    raf = 0;
  };

  const wake = () => {
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };
  const aim = (nx: number, ny: number, on = true) => {
    x.target = clamp(nx, -1, 1);
    y.target = clamp(ny, -1, 1);
    light.target = on ? 1 : 0;
    slowUntil = 0;
    wake();
  };
  const aimAt = (e: PointerEvent) => {
    const r = root.getBoundingClientRect();
    if (!r.width || !r.height) return;
    aim(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const release = () => aim(0, 0, false);

  const onEnter = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') aimAt(e);
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' || e.pointerId === touchId) aimAt(e);
  };
  const onLeave = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') release();
  };
  const onDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') {
      touchId = e.pointerId;
      aimAt(e);
    }
  };
  const onUp = (e: PointerEvent) => {
    if (e.pointerId === touchId) {
      touchId = null;
      release();
    }
  };
  root.addEventListener('pointerenter', onEnter);
  root.addEventListener('pointermove', onMove);
  root.addEventListener('pointerleave', onLeave);
  root.addEventListener('pointerdown', onDown);
  root.addEventListener('pointerup', onUp);
  root.addEventListener('pointercancel', onUp);

  const resizeObserver = new ResizeObserver(() => {
    size.w = root.offsetWidth;
    size.h = root.offsetHeight;
    write();
  });
  resizeObserver.observe(root);

  let listening = false;
  const onOrientation = (e: DeviceOrientationEvent) => {
    if (e.beta == null || e.gamma == null) return;
    aim((e.gamma * opts.mobileTiltSensitivity) / 150, ((e.beta - 20) * opts.mobileTiltSensitivity) / 150);
  };
  const onClick = () => {
    const Motion = window.DeviceOrientationEvent as OrientationEventStatic | undefined;
    const listen = () => {
      if (!listening) {
        listening = true;
        window.addEventListener('deviceorientation', onOrientation);
      }
    };
    if (Motion && typeof Motion.requestPermission === 'function') {
      Motion.requestPermission()
        .then((s) => {
          if (s === 'granted') listen();
        })
        .catch(() => {});
    } else listen();
  };
  if (opts.mobileTilt) root.addEventListener('click', onClick);

  if (opts.intro && !reduced) {
    x.p = 0.62;
    y.p = -0.55;
    light.p = 1;
    slowUntil = performance.now() + 1400;
    write();
    wake();
  } else {
    write();
  }

  return () => {
    if (raf) cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    root.removeEventListener('pointerenter', onEnter);
    root.removeEventListener('pointermove', onMove);
    root.removeEventListener('pointerleave', onLeave);
    root.removeEventListener('pointerdown', onDown);
    root.removeEventListener('pointerup', onUp);
    root.removeEventListener('pointercancel', onUp);
    root.removeEventListener('click', onClick);
    window.removeEventListener('deviceorientation', onOrientation);
  };
}
