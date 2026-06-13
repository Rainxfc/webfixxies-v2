import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ─── WF Logo ──────────────────────────────────────────────────────────────────
function WFLogo({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size * 46 / 48} viewBox="0 0 48 46" fill="none">
      <defs>
        <linearGradient id="wf-proj-g" x1="0" y1="0" x2="48" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c4b5fd" /><stop offset="50%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
      </defs>
      <path fill="url(#wf-proj-g)" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" />
    </svg>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ from = 0, to, suffix = '' }: { from?: number; to: number; suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = from;
    const duration = 1200;
    const step = (to - from) / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, from, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Floating particles inside card ──────────────────────────────────────────
function CardParticles({ accent }: { accent: string }) {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 4,
    dur: 4 + Math.random() * 4,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 24 }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: accent,
            opacity: 0.3,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ─── Full-page interactable preview ──────────────────────────────────────────
function SitePreview({
  src,
  title,
  accent,
  height = 620,
}: {
  src: string;
  title: string;
  accent: string;
  height?: number;
}) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'blocked'>('loading');
  const [interacted, setInteracted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // After load, show the "click to interact" hint for 3s
  const handleLoad = useCallback(() => {
    setStatus('ready');
    setShowHint(true);
    const t = setTimeout(() => setShowHint(false), 3500);
    return () => clearTimeout(t);
  }, []);

  // Timeout fallback — if still loading after 8s, mark blocked
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setStatus(s => s === 'loading' ? 'blocked' : s);
    }, 8000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [src]);

  // Dismiss hint on first click
  const handleInteract = () => {
    setInteracted(true);
    setShowHint(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: '100%',
        borderRadius: 14,
        overflow: 'hidden',
        border: `1px solid ${accent}33`,
        background: '#06000f',
        boxShadow: `0 8px 60px rgba(0,0,0,0.7), 0 0 0 1px ${accent}15, inset 0 1px 0 ${accent}20`,
      }}
    >
      {/* ── Browser chrome bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 16px',
        background: `linear-gradient(90deg, rgba(4,0,12,0.98), rgba(10,0,24,0.98))`,
        borderBottom: `1px solid ${accent}20`,
      }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {[
            { color: '#ef4444', title: 'Close' },
            { color: '#f59e0b', title: 'Minimise' },
            { color: '#10b981', title: 'Maximise' },
          ].map((btn, i) => (
            <motion.div
              key={i}
              title={btn.title}
              whileHover={{ scale: 1.25 }}
              style={{ width: 11, height: 11, borderRadius: '50%', background: btn.color, opacity: 0.9, cursor: 'default', boxShadow: `0 0 6px ${btn.color}60` }}
            />
          ))}
        </div>

        {/* URL bar */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(8,0,20,0.8)',
          border: `1px solid ${accent}25`,
          borderRadius: 8, padding: '5px 14px', overflow: 'hidden',
        }}>
          {/* Status dot */}
          <motion.div
            animate={status === 'loading' ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{
              width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
              background: status === 'ready' ? '#10b981' : status === 'blocked' ? '#ef4444' : '#f59e0b',
              transition: 'background 0.4s',
              boxShadow: `0 0 6px ${status === 'ready' ? '#10b98166' : status === 'blocked' ? '#ef444466' : '#f59e0b66'}`,
            }}
          />
          {/* Lock icon */}
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={`${accent}88`} strokeWidth="2.5" style={{ flexShrink: 0 }}>
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span className="font-mono" style={{ fontSize: 11, color: `${accent}cc`, letterSpacing: '0.06em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {src.replace('https://', '')}
          </span>
        </div>

        {/* Open button */}
        <motion.a
          href={src} target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.05, boxShadow: `0 0 16px ${accent}44` }}
          whileTap={{ scale: 0.95 }}
          style={{
            flexShrink: 0, padding: '5px 12px', borderRadius: 7,
            border: `1px solid ${accent}33`, background: `${accent}18`,
            textDecoration: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 5,
          }}
        >
          <span className="font-mono" style={{ fontSize: 9, color: `${accent}dd`, letterSpacing: '0.12em' }}>OPEN</span>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={`${accent}dd`} strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </motion.a>
      </div>

      {/* ── Iframe container ── */}
      <div style={{ position: 'relative', height }} onClick={handleInteract}>

        {/* Loading overlay */}
        <AnimatePresence>
          {status === 'loading' && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute', inset: 0, zIndex: 3,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18,
                background: '#06000f', pointerEvents: 'none',
              }}
            >
              {/* Spinner */}
              <div style={{ position: 'relative', width: 48, height: 48 }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    border: `2px solid ${accent}20`, borderTopColor: accent,
                  }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute', inset: 6, borderRadius: '50%',
                    border: `1px solid ${accent}40`, borderBottomColor: accent,
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span className="font-display" style={{ fontSize: 13, fontWeight: 700, color: accent }}>Loading Preview</span>
                <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: `${accent}55`, textTransform: 'uppercase' }}>
                  {title}
                </span>
              </div>
              {/* Animated dots */}
              <div style={{ display: 'flex', gap: 6 }}>
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                    style={{ width: 5, height: 5, borderRadius: '50%', background: accent }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blocked fallback */}
        <AnimatePresence>
          {status === 'blocked' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute', inset: 0, zIndex: 3,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 18, padding: 40, textAlign: 'center',
                background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${accent}14 0%, transparent 70%), #06000f`,
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: `${accent}15`, border: `1px solid ${accent}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </motion.div>
              <div>
                <div className="font-display" style={{ fontSize: 20, fontWeight: 800, color: accent, marginBottom: 8 }}>
                  Preview Blocked
                </div>
                <div className="font-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', textTransform: 'uppercase', maxWidth: 240, lineHeight: 2 }}>
                  Site prevents cross-origin embedding.<br/>Open directly for full experience.
                </div>
              </div>
              <motion.a
                href={src} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: `0 0 32px ${accent}55` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '12px 28px', borderRadius: 100,
                  background: `linear-gradient(135deg, ${accent}, ${accent}bb)`,
                  color: '#fff', fontSize: 10, fontFamily: 'Space Mono, monospace',
                  letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none',
                  boxShadow: `0 0 24px ${accent}44`,
                }}
              >
                Open Live Site ↗
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* "Click to Interact" hint — fades after first click */}
        <AnimatePresence>
          {status === 'ready' && !interacted && showHint && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
                zIndex: 4, pointerEvents: 'none',
                background: `rgba(4,0,13,0.9)`, backdropFilter: 'blur(12px)',
                border: `1px solid ${accent}40`, borderRadius: 100,
                padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: accent }}
              />
              <span className="font-mono" style={{ fontSize: 9, color: `${accent}ee`, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                Click to interact
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The actual iframe */}
        <iframe
          src={src}
          title={title}
          onLoad={handleLoad}
          onError={() => setStatus('blocked')}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock allow-top-navigation-by-user-activation allow-modals"
          allowFullScreen
          loading="lazy"
          style={{
            width: '100%', height: '100%', border: 'none', display: 'block',
            opacity: status === 'ready' ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Project data ──────────────────────────────────────────────────────────────
const projects = [
  {
    id: 'kfc',
    name: 'KFC Bangladesh Demo',
    subtitle: 'Interactive Brand Site',
    by: 'VEX / Ibrahim',
    byDetail: 'Design Principal',
    description: 'Cinematic landing page, animated menu flow, location browsing, and brand-history storytelling for a Bangladesh-focused KFC concept demo.',
    liveUrl: 'https://kfc-webfixxies-demo.vercel.app/',
    repoUrl: 'https://github.com/Mcethereal/KFC_Webfixxies_Demo',
    iframeSrc: 'https://kfc-webfixxies-demo.vercel.app/',
    accent: '#dc2626',
    accentAlt: '#f87171',
    glow: 'rgba(220,38,38,0.18)',
    glowSoft: 'rgba(220,38,38,0.05)',
    tags: ['Live Deploy', 'Food Brand', 'Animated UI', 'Responsive'],
    icon: '🍗',
    stats: [
      { label: 'Animations', value: 40, suffix: '+' },
      { label: 'Screens', value: 8 },
      { label: 'Score', value: 98, suffix: '' },
    ],
  },
  {
    id: 'pizzahut',
    name: 'Pizza Hut Bangladesh Demo',
    subtitle: '3D Pizza Customizer',
    by: 'ARSENIC / Ahnaf Tahmid',
    byDetail: 'Growth Strategist',
    description: 'Interactive 3D pizza building experience for Pizza Hut Bangladesh, featuring mobile-responsive menus, dynamic sound effects, and real-time topping rendering.',
    liveUrl: 'https://pizzahut-demo-page.vercel.app/',
    repoUrl: 'https://github.com/AlexWoods6351/Pizzahut-demo-page',
    iframeSrc: 'https://pizzahut-demo-page.vercel.app/',
    accent: '#e11d48',
    accentAlt: '#fb7185',
    glow: 'rgba(225,29,72,0.18)',
    glowSoft: 'rgba(225,29,72,0.05)',
    tags: ['Live Deploy', 'Food Brand', '3D Customizer', 'Responsive'],
    icon: '🍕',
    stats: [
      { label: '3D Models', value: 12 },
      { label: 'Toppings', value: 24, suffix: '+' },
      { label: 'Score', value: 96, suffix: '' },
    ],
  },
  {
    id: 'novabites',
    name: 'NovaBites',
    subtitle: 'Fast Food Brand Experience',
    by: 'RAIN / Ibrahim',
    byDetail: 'Technical Director',
    description: 'A full fast food brand concept engineered from scratch — Three.js hero scene, live cart system, countdown deals, nutrition tabs, and a rewards programme. Pure HTML/CSS/JS.',
    liveUrl: 'https://nova-bites.vercel.app/',
    repoUrl: 'https://github.com/Rainxfc/NovaBites',
    iframeSrc: 'https://nova-bites.vercel.app/',
    accent: '#f97316',
    accentAlt: '#fb923c',
    glow: 'rgba(249,115,22,0.18)',
    glowSoft: 'rgba(249,115,22,0.05)',
    tags: ['Three.js Hero', 'Live Cart', 'Countdown Deals', 'Rewards'],
    icon: '🍔',
    stats: [
      { label: 'Sections', value: 10, suffix: '+' },
      { label: 'JS Lines', value: 2400, suffix: '+' },
      { label: 'Score', value: 94, suffix: '' },
    ],
  },
];

// ─── Stats bar ─────────────────────────────────────────────────────────────────
function StatsBar({ stats, accent }: { stats: typeof projects[0]['stats']; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        display: 'flex', gap: 1, borderRadius: 10, overflow: 'hidden',
        border: `1px solid ${accent}20`, margin: '16px 0 0',
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            flex: 1, padding: '10px 16px', textAlign: 'center',
            background: i % 2 === 0 ? `${accent}08` : `${accent}05`,
            borderRight: i < stats.length - 1 ? `1px solid ${accent}15` : 'none',
          }}
        >
          <div className="font-display" style={{ fontSize: 22, fontWeight: 900, color: accent, lineHeight: 1 }}>
            <Counter to={s.value} suffix={s.suffix ?? ''} />
          </div>
          <div className="font-mono" style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: `${accent}66`, marginTop: 4 }}>
            {s.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

// ─── Single project card ───────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Lazy-load iframes: show after card comes into view (500ms delay)
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setShowPreview(true), 600 + index * 200);
    return () => clearTimeout(t);
  }, [inView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 24,
        border: `1px solid ${hovered ? project.accent + '45' : 'rgba(139,92,246,0.12)'}`,
        background: `linear-gradient(145deg, rgba(6,0,18,0.98), ${project.glowSoft}, rgba(4,0,12,0.98))`,
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'border-color 0.4s, box-shadow 0.4s, transform 0.4s',
        boxShadow: hovered
          ? `0 0 80px ${project.glow}, 0 30px 80px rgba(0,0,0,0.6)`
          : '0 8px 40px rgba(0,0,0,0.4)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Floating card particles */}
      {hovered && <CardParticles accent={project.accent} />}

      {/* Top accent bar with shimmer */}
      <motion.div
        animate={hovered ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.3 }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent 0%, ${project.accent} 30%, ${project.accentAlt} 70%, transparent 100%)`,
        }}
      />

      {/* Bg radial glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0.4, scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute', top: -100, right: -100, width: 360, height: 360,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${project.glow} 0%, transparent 70%)`,
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
      />

      {/* Secondary glow bottom-left */}
      <motion.div
        animate={{ opacity: hovered ? 0.6 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute', bottom: -60, left: -60, width: 240, height: 240,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${project.glow} 0%, transparent 70%)`,
          filter: 'blur(50px)', pointerEvents: 'none',
        }}
      />

      {/* ── Header section ── */}
      <div style={{ padding: '32px 36px 20px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            {/* By line */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.12 + 0.2 }}
              className="font-mono"
              style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: `${project.accent}88`, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <span style={{ width: 20, height: 1, background: `${project.accent}60`, display: 'inline-block' }} />
              {project.by} · {project.byDetail}
            </motion.div>

            {/* Main title */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.12 + 0.3, duration: 0.6 }}
              className="font-display"
              style={{
                fontSize: 'clamp(24px, 3.8vw, 38px)', fontWeight: 900,
                letterSpacing: '-0.02em', lineHeight: 1.05, color: '#f5f0ff',
                marginBottom: 6, display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <motion.span
                animate={hovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
                style={{ fontSize: 28, display: 'inline-block' }}
              >
                {project.icon}
              </motion.span>
              {project.name}
            </motion.h3>

            <div className="font-mono" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: project.accent }}>
              {project.subtitle}
            </div>
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 10, flexShrink: 0, flexWrap: 'wrap', alignItems: 'center' }}>
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 22px', borderRadius: 100,
                  background: `linear-gradient(135deg, ${project.accent}, ${project.accentAlt})`,
                  color: '#fff', fontSize: 9.5, fontFamily: 'Space Mono, monospace',
                  letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none',
                  boxShadow: `0 0 24px ${project.glow}`,
                }}
              >
                <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>●</motion.span>
                Live Site ↗
              </motion.a>
            )}
            <motion.a
              href={project.repoUrl} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2, borderColor: `${project.accent}55` }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 18px', borderRadius: 100,
                border: `1px solid ${project.accent}28`, color: `${project.accentAlt}bb`,
                fontSize: 9.5, fontFamily: 'Space Mono, monospace',
                letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none',
                transition: 'border-color 0.3s, color 0.3s',
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Source
            </motion.a>
          </div>
        </div>

        {/* Description + tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.4 }}
          style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}
        >
          <p style={{ fontSize: 13.5, color: '#7c6a99', lineHeight: 1.8, fontWeight: 300, maxWidth: 560 }}>
            {project.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.tags.map((t, ti) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.12 + 0.5 + ti * 0.06 }}
                className="font-mono"
                style={{
                  padding: '4px 12px', borderRadius: 100,
                  border: `1px solid ${project.accent}22`,
                  background: `${project.accent}0a`,
                  fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: `${project.accentAlt}bb`,
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Stats bar */}
        <StatsBar stats={project.stats} accent={project.accent} />
      </div>

      {/* ── Divider ── */}
      <motion.div
        animate={hovered ? { opacity: 0.8 } : { opacity: 0.3 }}
        transition={{ duration: 0.4 }}
        style={{
          height: 1, margin: '0 36px',
          background: `linear-gradient(90deg, transparent, ${project.accent}50, transparent)`,
          position: 'relative', zIndex: 1,
        }}
      />

      {/* ── Preview label ── */}
      <div style={{ padding: '16px 36px 6px', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: project.accent, boxShadow: `0 0 8px ${project.accent}` }}
        />
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: `${project.accent}88` }}>
          Live Interactive Preview
        </span>
      </div>

      {/* ── Iframe preview ── */}
      <div style={{ padding: '6px 36px 36px', position: 'relative', zIndex: 1 }}>
        {showPreview && project.iframeSrc ? (
          <SitePreview
            src={project.iframeSrc}
            title={project.name}
            accent={project.accent}
            height={index === 2 ? 700 : 640}
          />
        ) : !project.iframeSrc ? (
          // Should not happen now that NovaBites has a URL, but keep as fallback
          <div style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${project.accent}25`, background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${project.accent}10 0%, transparent 70%), #06000f`, height: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ fontSize: 72, lineHeight: 1 }}>{project.icon}</div>
            <div className="font-display" style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em', background: `linear-gradient(135deg, ${project.accent}, ${project.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {project.name.toUpperCase()}
            </div>
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
              style={{ padding: '9px 22px', borderRadius: 100, background: `linear-gradient(135deg, ${project.accent}, ${project.accentAlt})`, color: '#fff', fontSize: 9, fontFamily: 'Space Mono, monospace', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>
              View Source ↗
            </a>
          </div>
        ) : (
          // Skeleton while lazy-loading
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ borderRadius: 14, height: 640, background: `linear-gradient(135deg, ${project.accent}08, transparent)`, border: `1px solid ${project.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ display: 'flex', gap: 8 }}>
              {[0,1,2].map(i => (
                <motion.div key={i} animate={{ y: [0, -10, 0] }} transition={{ duration: 0.7, delay: i * 0.15, repeat: Infinity }}
                  style={{ width: 8, height: 8, borderRadius: '50%', background: project.accent, opacity: 0.5 }} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Section header with animated text ────────────────────────────────────────
function SectionHeader({ inView }: { inView: boolean }) {
  const words = ['THE', 'WORK'];
  return (
    <div style={{ textAlign: 'center', marginBottom: 90 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="section-tag"
        style={{ margin: '0 auto 28px' }}
      >
        <span className="dot" />Work
      </motion.div>

      {/* Animated word-by-word title */}
      <h2 className="font-display" style={{ fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 24 }}>
        {words.map((word, wi) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 40, rotateX: 60 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ delay: wi * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'inline-block', marginRight: 18,
              background: 'linear-gradient(135deg, #f5f0ff 0%, #c4b5fd 50%, #e879f9 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.35, duration: 0.6 }}
        style={{ maxWidth: 560, margin: '0 auto 24px', fontSize: 15, color: '#7c6a99', lineHeight: 1.85, fontWeight: 300 }}
      >
        Live projects by the Web Fixxies collective — each preview is{' '}
        <span style={{ color: '#a78bfa', fontWeight: 500 }}>fully interactive</span>.
        Scroll, click, and explore the real sites below.
      </motion.p>

      {/* Collective badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', borderRadius: 100, border: '1px solid rgba(167,139,250,0.2)', background: 'rgba(124,58,237,0.06)' }}
      >
        <WFLogo size={16} />
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.5)' }}>
          Web Fixxies Collective
        </span>
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 5, height: 5, borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 8px #a78bfa' }}
        />
      </motion.div>

      {/* Count bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.65, duration: 0.5 }}
        style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 36 }}
      >
        {[
          { label: 'Projects', value: projects.length },
          { label: 'Live Deploys', value: projects.filter(p => p.liveUrl).length },
          { label: 'Interactive', value: projects.filter(p => p.iframeSrc).length },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 + i * 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <div className="font-display" style={{ fontSize: 32, fontWeight: 900, background: 'linear-gradient(135deg, #a78bfa, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>
              <Counter to={stat.value} />
            </div>
            <div className="font-mono" style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.4)', marginTop: 4 }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Connector line between cards ─────────────────────────────────────────────
function ConnectorLine({ accent }: { accent: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 20, position: 'relative' }}>
      <motion.div
        animate={{ scaleY: [0, 1], opacity: [0, 0.6] }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          width: 1, height: 20,
          background: `linear-gradient(180deg, ${accent}00, ${accent}60, rgba(139,92,246,0.4))`,
        }}
      />
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        position: 'relative', width: '100%',
        padding: '140px 24px 160px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #04000d 0%, #080016 50%, #04000d 100%)',
      }}
    >
      {/* Grid */}
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '10%', left: '2%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '2%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,38,211,0.07) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(124,58,237,0.03) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <SectionHeader inView={inView} />

        {/* Cards with connector lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {projects.map((project, i) => (
            <div key={project.id}>
              <ProjectCard project={project} index={i} />
              {i < projects.length - 1 && <ConnectorLine accent={project.accent} />}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{ textAlign: 'center', marginTop: 80 }}
        >
          <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.3)', marginBottom: 16 }}>
            Want your site rebuilt?
          </div>
          <motion.a
            href="mailto:webfixxies@gmail.com"
            whileHover={{ scale: 1.04, boxShadow: '0 0 60px rgba(124,58,237,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary"
            style={{ textDecoration: 'none', fontSize: 10, padding: '14px 36px', letterSpacing: '0.2em', display: 'inline-flex', alignItems: 'center', gap: 10 }}
          >
            <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>✦</motion.span>
            Start a Project
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
