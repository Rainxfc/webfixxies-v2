import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../App';

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

const COLORS_DARK = [
  'rgba(79, 70, 229,',
  'rgba(99, 102, 241,',
  'rgba(129, 140, 248,',
  'rgba(67, 56, 202,',
  'rgba(148, 163, 184,',
];

const COLORS_LIGHT = [
  'rgba(91, 33, 182,',
  'rgba(109, 40, 217,',
  'rgba(124, 58, 237,',
  'rgba(139, 92, 246,',
  'rgba(167, 139, 250,',
];

// Pre-built fillStyle strings to avoid string concat every frame
function getColorStr(color: string, alpha: number) {
  return `${color}${alpha.toFixed(2)})`;
}

export default function ParticleField() {
  const { dark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const mouseThrottle = useRef(0);
  const darkRef = useRef(dark);

  // Keep darkRef in sync so canvas loop can read it without re-running the effect
  useEffect(() => {
    darkRef.current = dark;
    // Recolour existing particles when theme changes
    const canvas = canvasRef.current;
    if (!canvas) return;
    const COLORS = dark ? COLORS_DARK : COLORS_LIGHT;
    particles.current.forEach(p => {
      p.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    });
  }, [dark]);

  const createParticle = useCallback((w: number, h: number): Particle => {
    const COLORS = darkRef.current ? COLORS_DARK : COLORS_LIGHT;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.45 + 0.08,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }, []);

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
      const count = Math.floor((window.innerWidth * window.innerHeight) / 16000);
      particles.current = Array.from({ length: Math.min(count, 50) }, () =>
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
    const CONNECT_DIST = 60;
    const CONNECT_DIST_SQ = 3600;
    const MOUSE_DIST = 100; // was 120

    // Cap at 90fps — on 60hz screens every frame fires anyway (no overhead)
    const TARGET_MS = 1000 / 90;
    let lastFrame = 0;

    const draw = (now: number) => {
      animRef.current = requestAnimationFrame(draw);
      if (now - lastFrame < TARGET_MS) return; // skip if too soon
      lastFrame = now;
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
        // In light mode boost alpha so particles are visible on white
        const drawAlpha = darkRef.current ? p.alpha : p.alpha * 1.4;
        ctx.fillStyle = getColorStr(p.color, Math.min(drawAlpha, 0.35));
        ctx.fill();
      }

      // Draw connection lines — with 80 particles max this is ~3k checks
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dSq = dx * dx + dy * dy;
          if (dSq < CONNECT_DIST_SQ) {
            const alpha = (darkRef.current ? 0.045 : 0.09) * (1 - Math.sqrt(dSq) / CONNECT_DIST);
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
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
