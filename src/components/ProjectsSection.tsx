import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

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

// ─── Full-page interactable preview ──────────────────────────────────────────
// Uses an iframe that fills a tall viewport — user can scroll & interact inside
function SitePreview({
  src,
  title,
  accent,
  height = 600,
}: {
  src: string;
  title: string;
  accent: string;
  height?: number;
}) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'blocked'>('loading');

  return (
    <div style={{ width: '100%', borderRadius: 12, overflow: 'hidden', border: `1px solid ${accent}33`, background: '#06000f', boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px ${accent}15` }}>
      {/* Browser bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: 'rgba(4,0,12,0.95)', borderBottom: `1px solid ${accent}20` }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ef4444','#f59e0b','#10b981'].map((c,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.85 }} />)}
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(8,0,20,0.8)', border: `1px solid ${accent}25`, borderRadius: 7, padding: '4px 12px', overflow: 'hidden' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: status === 'ready' ? '#10b981' : status === 'blocked' ? '#ef4444' : '#f59e0b', flexShrink: 0, transition: 'background 0.3s' }} />
          <span className="font-mono" style={{ fontSize: 9, color: `${accent}aa`, letterSpacing: '0.1em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {src.replace('https://', '')}
          </span>
        </div>
        <a href={src.startsWith('/') ? undefined : src} target="_blank" rel="noopener noreferrer"
          style={{ flexShrink: 0, padding: '3px 10px', borderRadius: 6, border: `1px solid ${accent}33`, background: `${accent}15`, textDecoration: 'none', cursor: 'pointer' }}
          onClick={src.startsWith('/') ? (e) => { e.preventDefault(); window.open(src, '_blank'); } : undefined}
        >
          <span className="font-mono" style={{ fontSize: 8, color: `${accent}cc`, letterSpacing: '0.12em' }}>OPEN ↗</span>
        </a>
      </div>

      {/* Iframe area */}
      <div style={{ position: 'relative', height }}>
        {/* Loading overlay */}
        {status === 'loading' && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, background: '#06000f' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ width: 32, height: 32, borderRadius: '50%', border: `2px solid ${accent}30`, borderTopColor: accent }} />
            <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.2em', color: `${accent}66`, textTransform: 'uppercase' }}>Loading…</span>
          </div>
        )}

        {/* Blocked fallback */}
        {status === 'blocked' && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${accent}12 0%, transparent 70%), #06000f`, padding: 32, textAlign: 'center' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={`${accent}80`} strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <div className="font-display" style={{ fontSize: 18, fontWeight: 800, color: accent }}>Preview Restricted</div>
            <div className="font-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.16em', textTransform: 'uppercase', maxWidth: 220, lineHeight: 1.8 }}>
              Browser security blocks cross-origin embedding
            </div>
            <a href={src} target="_blank" rel="noopener noreferrer"
              style={{ padding: '10px 24px', borderRadius: 100, background: `linear-gradient(135deg, ${accent}, ${accent}bb)`, color: '#fff', fontSize: 10, fontFamily: 'Space Mono, monospace', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: `0 0 24px ${accent}44` }}>
              Open Live Site ↗
            </a>
          </div>
        )}

        {/* The actual iframe — full size, scrollable & interactable */}
        <iframe
          src={src}
          title={title}
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('blocked')}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
          style={{ width: '100%', height: '100%', border: 'none', display: 'block', opacity: status === 'ready' ? 1 : 0, transition: 'opacity 0.4s' }}
        />
      </div>
    </div>
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
    // KFC repo is private — using Vercel URL directly, fallback shows if blocked
    iframeSrc: 'https://kfc-webfixxies-demo.vercel.app/',
    accent: '#dc2626',
    accentAlt: '#f87171',
    glow: 'rgba(220,38,38,0.18)',
    glowSoft: 'rgba(220,38,38,0.05)',
    tags: ['Live Deploy', 'Food Brand', 'Animated UI', 'Responsive'],
    icon: '🍗',
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
    // Served from same origin — fully interactable, no X-Frame-Options
    iframeSrc: '/demos/pizzahut/index.html',
    accent: '#e11d48',
    accentAlt: '#fb7185',
    glow: 'rgba(225,29,72,0.18)',
    glowSoft: 'rgba(225,29,72,0.05)',
    tags: ['Live Deploy', 'Food Brand', '3D Customizer', 'Responsive'],
    icon: '🍕',
  },
  {
    id: 'novabites',
    name: 'NovaBites',
    subtitle: 'Fast Food Brand Experience',
    by: 'RAIN / Ibrahim',
    byDetail: 'Technical Director',
    description: 'A full fast food brand concept engineered from scratch — Three.js hero scene, live cart system, countdown deals, nutrition tabs, and a rewards programme. Pure HTML/CSS/JS.',
    liveUrl: null,
    repoUrl: 'https://github.com/Rainxfc/NovaBites',
    iframeSrc: null,
    accent: '#f97316',
    accentAlt: '#fb923c',
    glow: 'rgba(249,115,22,0.18)',
    glowSoft: 'rgba(249,115,22,0.05)',
    tags: ['Three.js Hero', 'Live Cart', 'Countdown Deals', 'Rewards'],
    icon: '🍔',
  },
];

// ─── Single project card ───────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 24,
        border: `1px solid ${hovered ? project.accent + '40' : 'rgba(139,92,246,0.12)'}`,
        background: `linear-gradient(135deg, rgba(6,0,18,0.98), ${project.glowSoft})`,
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'border-color 0.4s, box-shadow 0.4s',
        boxShadow: hovered
          ? `0 0 60px ${project.glow}, 0 24px 60px rgba(0,0,0,0.5)`
          : '0 8px 40px rgba(0,0,0,0.4)',
      }}
    >
      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg, transparent, ${project.accent}, ${project.accentAlt}, transparent)`, opacity: hovered ? 0.9 : 0.35, transition: 'opacity 0.4s' }} />
      {/* bg glow */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle, ${project.glow} 0%, transparent 70%)`, filter: 'blur(50px)', pointerEvents: 'none', opacity: hovered ? 1 : 0.5, transition: 'opacity 0.4s' }} />

      {/* ── Site name heading ── */}
      <div style={{ padding: '28px 32px 20px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            {/* By line */}
            <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: `${project.accent}99`, marginBottom: 8 }}>
              {project.by} · {project.byDetail}
            </div>
            {/* Main title */}
            <h3 className="font-display" style={{
              fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 900,
              letterSpacing: '-0.02em', lineHeight: 1.05, color: '#f5f0ff',
              marginBottom: 4,
            }}>
              <span style={{ fontSize: 20, marginRight: 10 }}>{project.icon}</span>
              {project.name}
            </h3>
            <div className="font-mono" style={{ fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: project.accent }}>
              {project.subtitle}
            </div>
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 10, flexShrink: 0, flexWrap: 'wrap' }}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 20px', borderRadius: 100, background: `linear-gradient(135deg, ${project.accent}, ${project.accentAlt})`, color: '#fff', fontSize: 9.5, fontFamily: 'Space Mono, monospace', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: `0 0 20px ${project.glow}`, transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 0 36px ${project.glow}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 0 20px ${project.glow}`; }}
              >
                Open Live Site ↗
              </a>
            )}
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 18px', borderRadius: 100, background: 'transparent', border: `1px solid ${project.accent}33`, color: `${project.accentAlt}cc`, fontSize: 9.5, fontFamily: 'Space Mono, monospace', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${project.accent}66`; e.currentTarget.style.color = '#f5f0ff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${project.accent}33`; e.currentTarget.style.color = `${project.accentAlt}cc`; }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>
              Source
            </a>
          </div>
        </div>

        {/* Description + tags row */}
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontSize: 13, color: '#7c6a99', lineHeight: 1.75, fontWeight: 300, maxWidth: 560 }}>
            {project.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.tags.map(t => (
              <span key={t} className="font-mono" style={{ padding: '3px 10px', borderRadius: 100, border: `1px solid ${project.accent}22`, background: `${project.accent}08`, fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: `${project.accentAlt}bb` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Full-page preview iframe ── */}
      <div style={{ padding: '0 32px 32px', position: 'relative', zIndex: 1 }}>
        {project.iframeSrc ? (
          <SitePreview
            src={project.iframeSrc}
            title={project.name}
            accent={project.accent}
            height={620}
          />
        ) : (
          // NovaBites — no live URL, show branded card
          <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${project.accent}25`, background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${project.accent}10 0%, transparent 70%), #06000f`, height: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ fontSize: 72, lineHeight: 1 }}>🍔</div>
            <div className="font-display" style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em', background: `linear-gradient(135deg, ${project.accent}, ${project.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>NOVA · BITES</div>
            <div className="font-mono" style={{ fontSize: 8.5, letterSpacing: '0.25em', textTransform: 'uppercase', color: `${project.accent}55` }}>Demo Project — Source Available</div>
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
              style={{ padding: '9px 22px', borderRadius: 100, background: `linear-gradient(135deg, ${project.accent}, ${project.accentAlt})`, color: '#fff', fontSize: 9, fontFamily: 'Space Mono, monospace', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', marginTop: 4 }}>
              View Source ↗
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" ref={ref} style={{ position: 'relative', width: '100%', padding: '120px 24px', overflow: 'hidden', background: 'linear-gradient(180deg, #04000d 0%, #080016 50%, #04000d 100%)' }}>
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '15%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,38,211,0.07) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div className="section-tag" style={{ margin: '0 auto 24px' }}>
            <span className="dot" />Work
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 20, background: 'linear-gradient(135deg, #f5f0ff 0%, #c4b5fd 50%, #e879f9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            THE WORK
          </h2>
          <p style={{ maxWidth: 560, margin: '0 auto 20px', fontSize: 15, color: '#7c6a99', lineHeight: 1.8, fontWeight: 300 }}>
            Live projects by the Web Fixxies collective — each preview is fully interactive. Scroll, click, and explore the real sites below.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <WFLogo size={18} />
            <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.4)' }}>
              Web Fixxies Collective
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
