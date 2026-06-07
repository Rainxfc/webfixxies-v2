import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  alphaDir: number;
  color: string;
}

const COLORS = [
  'rgba(139, 92, 246,',
  'rgba(167, 139, 250,',
  'rgba(192, 38, 211,',
  'rgba(79, 70, 229,',
  'rgba(232, 121, 249,',
];

// Pre-built fillStyle strings to avoid string concat every frame
function getColorStr(color: string, alpha: number) {
  return `${color}${alpha.toFixed(2)})`;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  // throttle mouse updates — no need for every pixel
  const mouseThrottle = useRef(0);

  const createParticle = useCallback((w: number, h: number): Particle => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    radius: Math.random() * 1.4 + 0.4,
    alpha: Math.random() * 0.45 + 0.08,
    alphaDir: Math.random() > 0.5 ? 1 : -1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Use willReadFrequently: false — we only write, never read back pixels
    const ctx = canvas.getContext('2d', { willReadFrequently: false })!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reduced cap: 80 max (was 180). Connection lines are O(n²) — halving n
      // cuts connection checks by ~75%
      const count = Math.floor((window.innerWidth * window.innerHeight) / 14000);
      particles.current = Array.from({ length: Math.min(count, 80) }, () =>
        createParticle(canvas.width, canvas.height)
      );
    };

    resize();

    // Debounce resize — don't regenerate particles on every pixel
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 200); };
    window.addEventListener('resize', onResize, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      // Throttle to once every 32ms (~30fps for mouse tracking is plenty)
      const now = Date.now();
      if (now - mouseThrottle.current < 32) return;
      mouseThrottle.current = now;
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Connection distance reduced: 70px (was 90). At 80 particles max,
    // this cuts both the check count and the draw count significantly.
    const CONNECT_DIST = 70;
    const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
    const MOUSE_DIST = 100; // was 120

    let frameCount = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width, h = canvas.height;
      const pts = particles.current;
      const len = pts.length;

      for (let i = 0; i < len; i++) {
        const p = pts[i];
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        // Use squared distance — avoids sqrt for mouse repulsion check
        const distSq = dx * dx + dy * dy;
        if (distSq < MOUSE_DIST * MOUSE_DIST && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (MOUSE_DIST - dist) / MOUSE_DIST;
          p.vx += (dx / dist) * force * 0.12;
          p.vy += (dy / dist) * force * 0.12;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;
        // Speed cap with squared check first
        const speedSq = p.vx * p.vx + p.vy * p.vy;
        if (speedSq > 1.44) { // 1.2²
          const inv = 1.2 / Math.sqrt(speedSq);
          p.vx *= inv;
          p.vy *= inv;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaDir * 0.003;
        if (p.alpha > 0.55 || p.alpha < 0.05) p.alphaDir *= -1;

        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = getColorStr(p.color, p.alpha);
        ctx.fill();
      }

      // Draw connection lines only every other frame — halves line draw cost
      // which is the most expensive part (O(n²) beginPath/stroke calls)
      frameCount++;
      if (frameCount % 2 === 0) {
        for (let i = 0; i < len; i++) {
          for (let j = i + 1; j < len; j++) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const dSq = dx * dx + dy * dy;
            if (dSq < CONNECT_DIST_SQ) {
              const alpha = 0.055 * (1 - Math.sqrt(dSq) / CONNECT_DIST);
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.strokeStyle = `rgba(124, 58, 237, ${alpha.toFixed(3)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
