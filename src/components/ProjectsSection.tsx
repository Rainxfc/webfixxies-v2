import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Project data ────────────────────────────────────────────────────────────
const projects = [
  {
    id: 'novabites',
    title: 'NovaBites',
    subtitle: 'Fast Food Brand Experience',
    description:
      'A full-stack fast food brand concept engineered from scratch — featuring a Three.js hero scene, live cart system, countdown deals, nutrition tabs, and a rewards programme. Pure HTML/CSS/JS, zero frameworks.',
    liveUrl: 'https://rainxfc.github.io/NovaBites/',
    repoUrl: 'https://github.com/Rainxfc/NovaBites',
    by: 'RAIN',
    byLabel: 'Technical Director',
    accent: '#f97316',
    accentAlt: '#fb923c',
    glow: 'rgba(249,115,22,0.2)',
    glowSoft: 'rgba(249,115,22,0.06)',
    tag: 'FOOD & BRAND',
    icon: '🍔',
    features: ['Three.js Hero Canvas', 'Live Cart System', 'Countdown Deals', 'Rewards Programme'],
    screenBg: 'linear-gradient(135deg, #080810 0%, #1a0a00 50%, #0d0500 100%)',
    screenAccent: '#f97316',
  },
  {
    id: 'pizzahut',
    title: 'Pizza Hut Demo',
    subtitle: 'QSR Web Experience',
    description:
      'A premium reimagining of the Pizza Hut digital experience — modern layout, animated sections, and a clean ordering flow that demonstrates how legacy QSR brands can modernize their web presence.',
    liveUrl: 'https://alexwoods6351.github.io/Pizzahut-demo-page/',
    repoUrl: 'https://github.com/AlexWoods6351/Pizzahut-demo-page',
    by: 'VEX',
    byLabel: 'Design Principal',
    accent: '#e11d48',
    accentAlt: '#fb7185',
    glow: 'rgba(225,29,72,0.2)',
    glowSoft: 'rgba(225,29,72,0.06)',
    tag: 'FOOD & BRAND',
    icon: '🍕',
    features: ['Modern Redesign', 'Animated Sections', 'Ordering Flow', 'Responsive Layout'],
    screenBg: 'linear-gradient(135deg, #080005 0%, #200008 50%, #0d0003 100%)',
    screenAccent: '#e11d48',
  },
  {
    id: 'kfc',
    title: 'KFC Demo',
    subtitle: 'Fast Food Digital Overhaul',
    description:
      'A bold redesign concept for KFC — showcasing how iconic food brands can deliver a premium, high-retention digital experience. Clean sections, bold typography, and conversion-focused layout.',
    liveUrl: 'https://mcethereal.github.io/KFC_Webfixxies_Demo/',
    repoUrl: 'https://github.com/Mcethereal/KFC_Webfixxies_Demo',
    by: 'VEX',
    byLabel: 'Design Principal',
    accent: '#dc2626',
    accentAlt: '#f87171',
    glow: 'rgba(220,38,38,0.2)',
    glowSoft: 'rgba(220,38,38,0.06)',
    tag: 'FOOD & BRAND',
    icon: '🍗',
    features: ['Brand Overhaul', 'Bold Typography', 'Conversion Layout', 'Mobile First'],
    screenBg: 'linear-gradient(135deg, #080000 0%, #1c0000 50%, #0a0000 100%)',
    screenAccent: '#dc2626',
  },
  {
    id: 'webfixxies-demo',
    title: 'Webfixxies V1',
    subtitle: 'Agency Portfolio — Original',
    description:
      'The original Webfixxies agency site — our own digital presence, showcasing the mission, team, and capabilities of Web Fixxies. The foundation that v2 evolved from.',
    liveUrl: 'https://mcethereal.github.io/webfixxies/',
    repoUrl: 'https://github.com/Mcethereal/webfixxies',
    by: 'TEAM',
    byLabel: 'Web Fixxies',
    accent: '#7c3aed',
    accentAlt: '#a78bfa',
    glow: 'rgba(124,58,237,0.2)',
    glowSoft: 'rgba(124,58,237,0.06)',
    tag: 'AGENCY',
    icon: '⚡',
    features: ['3D Hero Scene', 'Team Showcase', 'Mission Section', 'Pricing Tiers'],
    screenBg: 'linear-gradient(135deg, #04000d 0%, #1e0047 50%, #0a0018 100%)',
    screenAccent: '#7c3aed',
  },
];

// ─── Animated browser frame preview ──────────────────────────────────────────
function ProjectBrowserFrame({
  project,
  isActive,
}: {
  project: typeof projects[0];
  isActive: boolean;
}) {
  return (
    <div
      style={{
        width: '100%',
        borderRadius: 14,
        overflow: 'hidden',
        border: `1px solid ${isActive ? project.accent + '55' : 'rgba(139,92,246,0.15)'}`,
        background: project.screenBg,
        boxShadow: isActive
          ? `0 0 0 1px ${project.accent}22, 0 20px 60px rgba(0,0,0,0.7), 0 0 40px ${project.glow}`
          : '0 8px 32px rgba(0,0,0,0.5)',
        transition: 'box-shadow 0.4s, border-color 0.4s',
        position: 'relative',
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '9px 14px',
          background: 'rgba(4,0,12,0.9)',
          borderBottom: `1px solid ${project.accent}22`,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
            <div
              key={i}
              style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.8 }}
            />
          ))}
        </div>
        {/* URL bar */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            background: 'rgba(8,0,20,0.8)',
            border: `1px solid ${project.accent}25`,
            borderRadius: 6,
            padding: '3px 10px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#10b981',
              flexShrink: 0,
            }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: 8,
              color: `${project.accent}bb`,
              letterSpacing: '0.1em',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {project.liveUrl.replace('https://', '')}
          </span>
        </div>
        {/* Refresh icon */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke={`${project.accent}66`}
          strokeWidth="2"
          style={{ flexShrink: 0 }}
        >
          <path d="M1 4v6h6M23 20v-6h-6" />
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
        </svg>
      </div>

      {/* Screen content mockup */}
      <div style={{ position: 'relative', paddingBottom: '60%', overflow: 'hidden' }}>
        {/* Actual iframe - loads live site */}
        <iframe
          src={project.liveUrl}
          title={project.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            pointerEvents: 'none',
            transform: 'scale(1)',
            transformOrigin: 'top left',
          }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
        />
        {/* Overlay for click-through & glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, transparent 60%, ${project.screenBg.split(' ')[2]} 100%)`,
            pointerEvents: 'none',
          }}
        />
        {/* Animated scan line */}
        {isActive && (
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${project.accent}60, transparent)`,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      {/* Bottom status bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5px 14px',
          background: 'rgba(4,0,12,0.95)',
          borderTop: `1px solid ${project.accent}18`,
        }}
      >
        <span className="font-mono" style={{ fontSize: 7.5, color: `${project.accent}66`, letterSpacing: '0.18em' }}>
          LIVE PREVIEW
        </span>
        <div
          style={{
            height: 1.5,
            flex: 1,
            margin: '0 10px',
            background: 'rgba(139,92,246,0.08)',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              height: '100%',
              width: '35%',
              background: `linear-gradient(90deg, transparent, ${project.accent}80, transparent)`,
            }}
          />
        </div>
        <span className="font-mono" style={{ fontSize: 7.5, color: 'rgba(139,92,246,0.4)', letterSpacing: '0.18em' }}>
          WF.CLIENT
        </span>
      </div>
    </div>
  );
}

// ─── Individual project card ──────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: typeof projects[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '32px 48px',
        alignItems: 'center',
        padding: '48px',
        borderRadius: 24,
        border: `1px solid ${hovered ? project.accent + '33' : 'rgba(139,92,246,0.1)'}`,
        background: `linear-gradient(135deg, rgba(8,0,22,0.95), ${project.glowSoft})`,
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.4s, box-shadow 0.4s',
        boxShadow: hovered
          ? `0 0 60px ${project.glow}, 0 20px 60px rgba(0,0,0,0.5)`
          : '0 8px 40px rgba(0,0,0,0.4)',
      }}
    >
      {/* bg glow */}
      <div
        style={{
          position: 'absolute',
          top: isEven ? -60 : 'auto',
          bottom: isEven ? 'auto' : -60,
          right: -60,
          width: 240,
          height: 240,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${project.glow} 0%, transparent 70%)`,
          filter: 'blur(50px)',
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0.5,
          transition: 'opacity 0.4s',
        }}
      />
      {/* top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 1.5,
          background: `linear-gradient(90deg, transparent, ${project.accent}, ${project.accentAlt}, transparent)`,
          opacity: hovered ? 0.9 : 0.3,
          transition: 'opacity 0.4s',
        }}
      />

      {/* ── Text side ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Tag row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div
            className="font-mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '4px 12px',
              borderRadius: 100,
              border: `1px solid ${project.accent}44`,
              background: `${project.accent}11`,
              fontSize: 8,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: project.accentAlt,
            }}
          >
            <span style={{ fontSize: 12 }}>{project.icon}</span>
            {project.tag}
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: 8,
              letterSpacing: '0.2em',
              color: `${project.accent}88`,
              textTransform: 'uppercase',
            }}
          >
            by {project.by}
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-display"
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: 8,
            color: '#f5f0ff',
          }}
        >
          {project.title}
        </h3>
        <div
          className="font-mono"
          style={{
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: project.accent,
            marginBottom: 20,
          }}
        >
          {project.subtitle}
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: `linear-gradient(90deg, ${project.accent}33, transparent)`,
            marginBottom: 20,
          }}
        />

        {/* Description */}
        <p
          style={{
            fontSize: 14,
            color: '#7c6a99',
            lineHeight: 1.8,
            fontWeight: 300,
            marginBottom: 24,
          }}
        >
          {project.description}
        </p>

        {/* Features */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {project.features.map((f) => (
            <span
              key={f}
              className="font-mono"
              style={{
                padding: '4px 11px',
                borderRadius: 100,
                border: `1px solid ${project.accent}22`,
                background: `${project.accent}08`,
                fontSize: 8.5,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: `${project.accentAlt}cc`,
              }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '11px 24px',
              borderRadius: 100,
              background: `linear-gradient(135deg, ${project.accent}, ${project.accentAlt === project.accent ? project.accent + 'cc' : project.accentAlt})`,
              border: 'none',
              color: '#fff',
              fontSize: 10,
              fontFamily: 'Space Mono, monospace',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              cursor: 'pointer',
              boxShadow: `0 0 24px ${project.glow}`,
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 0 40px ${project.glow}`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 0 24px ${project.glow}`; }}
          >
            View Live
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 22px',
              borderRadius: 100,
              background: 'transparent',
              border: `1px solid ${project.accent}33`,
              color: `${project.accentAlt}cc`,
              fontSize: 10,
              fontFamily: 'Space Mono, monospace',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${project.accent}66`; e.currentTarget.style.color = '#f5f0ff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${project.accent}33`; e.currentTarget.style.color = `${project.accentAlt}cc`; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Source
          </a>
        </div>
      </div>

      {/* ── Browser preview side ── */}
      <motion.div
        style={{ position: 'relative', zIndex: 1 }}
        animate={hovered ? { y: -6 } : { y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <ProjectBrowserFrame project={project} isActive={hovered} />
      </motion.div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #04000d 0%, #080016 50%, #04000d 100%)',
      }}
    >
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      {/* ambient glows */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,38,211,0.07) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

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
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              marginBottom: 20,
              background: 'linear-gradient(135deg, #f5f0ff 0%, #c4b5fd 50%, #e879f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            THE WORK
          </h2>
          <p
            style={{
              maxWidth: 560,
              margin: '0 auto',
              fontSize: 15,
              color: '#7c6a99',
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            Live projects delivered by the Web Fixxies collective — from fast food brand experiences to agency platforms, each engineered to command attention.
          </p>
        </motion.div>

        {/* Project cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
