import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Webfixxies logo (reused from favicon) ───────────────────────────────────
function WFLogo({ size = 28 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size * 46 / 48} viewBox="0 0 48 46" fill="none">
      <defs>
        <linearGradient id="wf-proj-grad" x1="0" y1="0" x2="48" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
      </defs>
      <path fill="url(#wf-proj-grad)" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" />
    </svg>
  );
}

// ─── NovaBites logo emoji card ────────────────────────────────────────────────
function NovaBitesCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        borderRadius: 14,
        overflow: 'hidden',
        border: `1px solid ${hovered ? 'rgba(249,115,22,0.4)' : 'rgba(249,115,22,0.15)'}`,
        background: 'linear-gradient(135deg, #080810 0%, #1a0a00 60%, #0d0500 100%)',
        boxShadow: hovered
          ? '0 0 40px rgba(249,115,22,0.25), 0 16px 48px rgba(0,0,0,0.6)'
          : '0 8px 32px rgba(0,0,0,0.5)',
        transition: 'all 0.4s',
        cursor: 'default',
        position: 'relative',
      }}
    >
      {/* top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1.5,
        background: 'linear-gradient(90deg, transparent, #f97316, #fb923c, transparent)',
        opacity: hovered ? 0.8 : 0.3, transition: 'opacity 0.4s',
      }} />
      {/* browser chrome */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px',
        background: 'rgba(4,0,6,0.9)', borderBottom: '1px solid rgba(249,115,22,0.12)',
      }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />
          ))}
        </div>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(8,0,10,0.7)', border: '1px solid rgba(249,115,22,0.18)',
          borderRadius: 5, padding: '3px 9px', overflow: 'hidden',
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
          <span className="font-mono" style={{ fontSize: 7.5, color: 'rgba(249,115,22,0.65)', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
            novabites.webfixxies.dev
          </span>
        </div>
      </div>
      {/* hero area */}
      <div style={{
        padding: '32px 28px 28px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        minHeight: 200,
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(249,115,22,0.08) 0%, transparent 70%)',
      }}>
        {/* NovaBites logo */}
        <motion.div
          animate={hovered ? { scale: 1.08, filter: 'drop-shadow(0 0 20px rgba(249,115,22,0.6))' } : { scale: 1, filter: 'drop-shadow(0 0 8px rgba(249,115,22,0.3))' }}
          transition={{ duration: 0.4 }}
          style={{ fontSize: 64, lineHeight: 1, userSelect: 'none' }}
        >
          🍔
        </motion.div>
        <div style={{ textAlign: 'center' }}>
          <div className="font-display" style={{
            fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #f97316, #fb923c)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            NOVA · BITES
          </div>
          <div className="font-mono" style={{ fontSize: 8.5, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(249,115,22,0.5)', marginTop: 6 }}>
            Taste the Future
          </div>
        </div>
        {/* mock nav */}
        <div style={{
          width: '100%', display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap',
          padding: '10px 0', borderTop: '1px solid rgba(249,115,22,0.1)', borderBottom: '1px solid rgba(249,115,22,0.1)',
        }}>
          {['Menu', 'Deals', 'Rewards', 'Community'].map(item => (
            <span key={item} className="font-mono" style={{ fontSize: 7.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(249,115,22,0.5)' }}>
              {item}
            </span>
          ))}
        </div>
        {/* demo badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 12px', borderRadius: 100,
          border: '1px solid rgba(249,115,22,0.25)', background: 'rgba(249,115,22,0.08)',
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#f97316', animation: 'glow-pulse 2s ease-in-out infinite' }} />
          <span className="font-mono" style={{ fontSize: 7.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(249,115,22,0.7)' }}>
            Demo Project
          </span>
        </div>
      </div>
      {/* status bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '5px 14px', background: 'rgba(4,0,6,0.9)',
        borderTop: '1px solid rgba(249,115,22,0.1)',
      }}>
        <span className="font-mono" style={{ fontSize: 7, color: 'rgba(249,115,22,0.4)', letterSpacing: '0.16em' }}>WF.DEMO</span>
        <div style={{ height: 1.5, flex: 1, margin: '0 10px', background: 'rgba(249,115,22,0.06)', borderRadius: 1, overflow: 'hidden' }}>
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: '100%', width: '35%', background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.5), transparent)' }}
          />
        </div>
        <span className="font-mono" style={{ fontSize: 7, color: 'rgba(249,115,22,0.4)', letterSpacing: '0.16em' }}>RAIN</span>
      </div>
    </div>
  );
}

// ─── Live site browser frame (Vercel links, no iframe issues) ─────────────────
function BrowserFrame({ project, isActive }: { project: typeof liveProjects[0]; isActive: boolean }) {
  return (
    <div style={{
      width: '100%', borderRadius: 14, overflow: 'hidden',
      border: `1px solid ${isActive ? project.accent + '55' : 'rgba(139,92,246,0.15)'}`,
      background: project.screenBg,
      boxShadow: isActive
        ? `0 0 0 1px ${project.accent}22, 0 20px 60px rgba(0,0,0,0.7), 0 0 40px ${project.glow}`
        : '0 8px 32px rgba(0,0,0,0.5)',
      transition: 'box-shadow 0.4s, border-color 0.4s', position: 'relative',
    }}>
      {/* chrome */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px',
        background: 'rgba(4,0,12,0.92)', borderBottom: `1px solid ${project.accent}22`,
      }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
        </div>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 7,
          background: 'rgba(8,0,20,0.8)', border: `1px solid ${project.accent}25`,
          borderRadius: 6, padding: '3px 10px', overflow: 'hidden',
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
          <span className="font-mono" style={{ fontSize: 8, color: `${project.accent}99`, letterSpacing: '0.1em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {project.liveUrl.replace('https://', '')}
          </span>
        </div>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
          style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 5, border: `1px solid ${project.accent}33`, background: `${project.accent}11`, textDecoration: 'none' }}>
          <span className="font-mono" style={{ fontSize: 7.5, color: `${project.accent}bb`, letterSpacing: '0.12em' }}>OPEN ↗</span>
        </a>
      </div>

      {/* screen mockup — coded, no iframe */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: 220 }}>
        <project.ScreenContent isActive={isActive} />
        {/* bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
          background: `linear-gradient(to bottom, transparent, ${project.screenBgEnd})`,
          pointerEvents: 'none',
        }} />
        {/* scan line */}
        {isActive && (
          <motion.div
            animate={{ y: ['-5%', '110%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            style={{
              position: 'absolute', left: 0, right: 0, height: 1.5,
              background: `linear-gradient(90deg, transparent, ${project.accent}55, transparent)`,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      {/* status */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '5px 14px', background: 'rgba(4,0,12,0.95)',
        borderTop: `1px solid ${project.accent}15`,
      }}>
        <span className="font-mono" style={{ fontSize: 7.5, color: `${project.accent}55`, letterSpacing: '0.18em' }}>LIVE DEMO</span>
        <div style={{ height: 1.5, flex: 1, margin: '0 10px', background: 'rgba(139,92,246,0.06)', borderRadius: 1, overflow: 'hidden' }}>
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: '100%', width: '35%', background: `linear-gradient(90deg, transparent, ${project.accent}70, transparent)` }}
          />
        </div>
        <span className="font-mono" style={{ fontSize: 7.5, color: 'rgba(139,92,246,0.35)', letterSpacing: '0.18em' }}>WF.CLIENT</span>
      </div>
    </div>
  );
}

// ─── KFC screen mockup ────────────────────────────────────────────────────────
function KFCScreen({ isActive }: { isActive: boolean }) {
  return (
    <div style={{ background: 'linear-gradient(180deg, #0a0000 0%, #1a0002 100%)', padding: '20px 18px', minHeight: 220 }}>
      {/* hero bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 20 }}>🍗</div>
          <span className="font-display" style={{ fontSize: 13, fontWeight: 900, color: '#dc2626', letterSpacing: '-0.01em' }}>KFC</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {['Menu', 'Deals', 'Order'].map(n => (
            <span key={n} className="font-mono" style={{ fontSize: 7.5, color: 'rgba(220,38,38,0.55)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{n}</span>
          ))}
        </div>
      </div>
      {/* hero headline */}
      <div style={{ marginBottom: 14 }}>
        <div className="font-display" style={{ fontSize: 18, fontWeight: 900, color: '#f5f5f5', lineHeight: 1.1, marginBottom: 4 }}>
          Finger Lickin'<br />
          <span style={{ color: '#dc2626' }}>Good.</span>
        </div>
        <div style={{ fontSize: 10, color: 'rgba(245,245,245,0.45)', fontWeight: 300 }}>Original Recipe. Unbeatable taste.</div>
      </div>
      {/* menu cards */}
      <div style={{ display: 'flex', gap: 8 }}>
        {[
          { icon: '🍗', name: 'Original', price: '$12.99', hot: true },
          { icon: '🌶️', name: 'Spicy', price: '$13.49', hot: false },
          { icon: '🍟', name: 'Combo', price: '$15.99', hot: false },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 12 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            style={{
              flex: 1, padding: '10px 8px', borderRadius: 8,
              background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 18, marginBottom: 4 }}>{item.icon}</div>
            <div className="font-mono" style={{ fontSize: 7.5, color: '#f5f5f5', letterSpacing: '0.08em', marginBottom: 2 }}>{item.name}</div>
            <div style={{ fontSize: 9, color: '#dc2626', fontWeight: 700 }}>{item.price}</div>
            {item.hot && <div style={{ fontSize: 6.5, color: 'rgba(220,38,38,0.7)', marginTop: 2, letterSpacing: '0.1em' }}>POPULAR</div>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Pizza Hut screen mockup ──────────────────────────────────────────────────
function PizzaScreen({ isActive }: { isActive: boolean }) {
  return (
    <div style={{ background: 'linear-gradient(180deg, #080005 0%, #150008 100%)', padding: '20px 18px', minHeight: 220 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 18 }}>🍕</div>
          <span className="font-display" style={{ fontSize: 11, fontWeight: 900, color: '#e11d48', letterSpacing: '-0.01em' }}>PIZZA HUT</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Pizzas', 'Deals', 'Track'].map(n => (
            <span key={n} className="font-mono" style={{ fontSize: 7, color: 'rgba(225,29,72,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{n}</span>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div className="font-display" style={{ fontSize: 17, fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 4 }}>
          No One<br />
          <span style={{ color: '#e11d48' }}>OutPizzas</span><br />
          The Hut.
        </div>
        <motion.div
          animate={isActive ? { opacity: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            display: 'inline-block', marginTop: 6, padding: '4px 10px', borderRadius: 100,
            background: '#e11d48', fontSize: 8.5, color: '#fff', fontWeight: 700,
          }}
        >
          Order Now
        </motion.div>
      </div>
      {/* pizza grid */}
      <div style={{ display: 'flex', gap: 8 }}>
        {[
          { icon: '🍕', name: 'Pepperoni', tag: 'Fan Fave' },
          { icon: '🧀', name: 'Cheese', tag: 'Classic' },
          { icon: '🌿', name: 'Veggie', tag: 'New' },
        ].map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 1 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            style={{
              flex: 1, padding: '10px 7px', borderRadius: 8, textAlign: 'center',
              background: 'rgba(225,29,72,0.07)', border: '1px solid rgba(225,29,72,0.18)',
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>{p.icon}</div>
            <div className="font-mono" style={{ fontSize: 7, color: '#fff', letterSpacing: '0.08em', marginBottom: 2 }}>{p.name}</div>
            <div style={{ fontSize: 6.5, color: '#e11d48', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{p.tag}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Live project data ────────────────────────────────────────────────────────
const liveProjects = [
  {
    id: 'kfc',
    title: 'KFC Demo',
    subtitle: 'Fast Food Digital Overhaul',
    description: 'A bold redesign concept for KFC — showcasing how iconic food brands can deliver a premium, high-retention digital experience. Clean sections, bold typography, and conversion-focused layout engineered to command attention.',
    liveUrl: 'https://kfc-webfixxies-demo.vercel.app/',
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
    screenBg: 'linear-gradient(135deg, #080000 0%, #180000 100%)',
    screenBgEnd: '#080000',
    ScreenContent: KFCScreen,
  },
  {
    id: 'pizzahut',
    title: 'Pizza Hut Demo',
    subtitle: 'QSR Web Experience',
    description: 'A premium reimagining of the Pizza Hut digital experience — modern layout, animated sections, and a clean ordering flow that demonstrates how legacy QSR brands can modernize and elevate their web presence.',
    liveUrl: 'https://pizzahut-demo-page.vercel.app/',
    repoUrl: 'https://github.com/AlexWoods6351/Pizzahut-demo-page',
    by: 'ARSENIC',
    byLabel: 'Growth Strategist',
    accent: '#e11d48',
    accentAlt: '#fb7185',
    glow: 'rgba(225,29,72,0.2)',
    glowSoft: 'rgba(225,29,72,0.06)',
    tag: 'FOOD & BRAND',
    icon: '🍕',
    features: ['Modern Redesign', 'Animated Sections', 'Ordering Flow', 'Responsive Layout'],
    screenBg: 'linear-gradient(135deg, #080005 0%, #150008 100%)',
    screenBgEnd: '#080005',
    ScreenContent: PizzaScreen,
  },
];

// ─── Live project card ────────────────────────────────────────────────────────
function LiveProjectCard({ project, index }: { project: typeof liveProjects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '32px 48px',
        alignItems: 'center',
        padding: '44px',
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
      <div style={{
        position: 'absolute', top: -60, right: -60, width: 240, height: 240,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${project.glow} 0%, transparent 70%)`,
        filter: 'blur(50px)', pointerEvents: 'none',
        opacity: hovered ? 1 : 0.5, transition: 'opacity 0.4s',
      }} />
      {/* top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1.5,
        background: `linear-gradient(90deg, transparent, ${project.accent}, ${project.accentAlt}, transparent)`,
        opacity: hovered ? 0.85 : 0.3, transition: 'opacity 0.4s',
      }} />

      {/* Text side */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div className="font-mono" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '4px 12px', borderRadius: 100,
            border: `1px solid ${project.accent}44`, background: `${project.accent}11`,
            fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: project.accentAlt,
          }}>
            <span style={{ fontSize: 12 }}>{project.icon}</span>{project.tag}
          </div>
          <span className="font-mono" style={{ fontSize: 8, letterSpacing: '0.2em', color: `${project.accent}88`, textTransform: 'uppercase' }}>
            by {project.by}
          </span>
        </div>

        <h3 className="font-display" style={{
          fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900,
          letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8, color: '#f5f0ff',
        }}>{project.title}</h3>
        <div className="font-mono" style={{
          fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: project.accent, marginBottom: 20,
        }}>{project.subtitle}</div>

        <div style={{ height: 1, background: `linear-gradient(90deg, ${project.accent}33, transparent)`, marginBottom: 20 }} />

        <p style={{ fontSize: 14, color: '#7c6a99', lineHeight: 1.8, fontWeight: 300, marginBottom: 24 }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {project.features.map(f => (
            <span key={f} className="font-mono" style={{
              padding: '4px 11px', borderRadius: 100,
              border: `1px solid ${project.accent}22`, background: `${project.accent}08`,
              fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: `${project.accentAlt}cc`,
            }}>{f}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 24px', borderRadius: 100,
              background: `linear-gradient(135deg, ${project.accent}, ${project.accentAlt})`,
              border: 'none', color: '#fff', fontSize: 10,
              fontFamily: 'Space Mono, monospace', letterSpacing: '0.15em',
              textTransform: 'uppercase', textDecoration: 'none', cursor: 'pointer',
              boxShadow: `0 0 24px ${project.glow}`, transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 0 40px ${project.glow}`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 0 24px ${project.glow}`; }}
          >
            View Live
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 22px', borderRadius: 100,
              background: 'transparent', border: `1px solid ${project.accent}33`,
              color: `${project.accentAlt}cc`, fontSize: 10,
              fontFamily: 'Space Mono, monospace', letterSpacing: '0.15em',
              textTransform: 'uppercase', textDecoration: 'none', cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${project.accent}66`; e.currentTarget.style.color = '#f5f0ff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${project.accent}33`; e.currentTarget.style.color = `${project.accentAlt}cc`; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Source
          </a>
        </div>
      </div>

      {/* Browser preview */}
      <motion.div
        style={{ position: 'relative', zIndex: 1 }}
        animate={hovered ? { y: -6 } : { y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <BrowserFrame project={project} isActive={hovered} />
      </motion.div>
    </motion.div>
  );
}

// ─── NovaBites card (no live preview, just logo) ──────────────────────────────
function NovaBitesProjectCard({ index }: { index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '32px 48px',
        alignItems: 'center',
        padding: '44px',
        borderRadius: 24,
        border: `1px solid ${hovered ? 'rgba(249,115,22,0.33)' : 'rgba(139,92,246,0.1)'}`,
        background: 'linear-gradient(135deg, rgba(8,0,22,0.95), rgba(249,115,22,0.06))',
        backdropFilter: 'blur(20px)',
        position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.4s, box-shadow 0.4s',
        boxShadow: hovered
          ? '0 0 60px rgba(249,115,22,0.2), 0 20px 60px rgba(0,0,0,0.5)'
          : '0 8px 40px rgba(0,0,0,0.4)',
      }}
    >
      {/* bg glow */}
      <div style={{
        position: 'absolute', bottom: -60, left: -60, width: 240, height: 240,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none',
        opacity: hovered ? 1 : 0.5, transition: 'opacity 0.4s',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1.5,
        background: 'linear-gradient(90deg, transparent, #f97316, #fb923c, transparent)',
        opacity: hovered ? 0.85 : 0.3, transition: 'opacity 0.4s',
      }} />

      {/* Text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div className="font-mono" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '4px 12px', borderRadius: 100,
            border: '1px solid rgba(249,115,22,0.35)', background: 'rgba(249,115,22,0.1)',
            fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#fb923c',
          }}>
            <span style={{ fontSize: 12 }}>🍔</span>FOOD &amp; BRAND
          </div>
          <span className="font-mono" style={{ fontSize: 8, letterSpacing: '0.2em', color: 'rgba(249,115,22,0.55)', textTransform: 'uppercase' }}>
            by RAIN
          </span>
        </div>

        <h3 className="font-display" style={{
          fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900,
          letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8, color: '#f5f0ff',
        }}>NovaBites</h3>
        <div className="font-mono" style={{
          fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#f97316', marginBottom: 20,
        }}>Fast Food Brand Experience</div>

        <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(249,115,22,0.3), transparent)', marginBottom: 20 }} />

        <p style={{ fontSize: 14, color: '#7c6a99', lineHeight: 1.8, fontWeight: 300, marginBottom: 24 }}>
          A full fast food brand concept engineered from scratch — featuring a Three.js hero scene, live cart system with toast notifications, countdown deal timers, nutrition tabs, and a rewards programme. Pure HTML/CSS/JS, zero frameworks.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {['Three.js Hero Canvas', 'Live Cart System', 'Countdown Deals', 'Rewards Programme'].map(f => (
            <span key={f} className="font-mono" style={{
              padding: '4px 11px', borderRadius: 100,
              border: '1px solid rgba(249,115,22,0.18)', background: 'rgba(249,115,22,0.07)',
              fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(251,146,60,0.8)',
            }}>{f}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="https://github.com/Rainxfc/NovaBites" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 22px', borderRadius: 100,
              background: 'transparent', border: '1px solid rgba(249,115,22,0.3)',
              color: 'rgba(251,146,60,0.8)', fontSize: 10,
              fontFamily: 'Space Mono, monospace', letterSpacing: '0.15em',
              textTransform: 'uppercase', textDecoration: 'none',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.6)'; e.currentTarget.style.color = '#f5f0ff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.3)'; e.currentTarget.style.color = 'rgba(251,146,60,0.8)'; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View Source
          </a>
        </div>
      </div>

      {/* NovaBites visual card */}
      <motion.div
        style={{ position: 'relative', zIndex: 1 }}
        animate={hovered ? { y: -6 } : { y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <NovaBitesCard />
      </motion.div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" ref={ref} style={{
      position: 'relative', width: '100%', padding: '120px 24px', overflow: 'hidden',
      background: 'linear-gradient(180deg, #04000d 0%, #080016 50%, #04000d 100%)',
    }}>
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
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
          <h2 className="font-display" style={{
            fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 20,
            background: 'linear-gradient(135deg, #f5f0ff 0%, #c4b5fd 50%, #e879f9 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            THE WORK
          </h2>
          <p style={{ maxWidth: 560, margin: '0 auto', fontSize: 15, color: '#7c6a99', lineHeight: 1.8, fontWeight: 300 }}>
            Live projects delivered by the Web Fixxies collective — fast food brand experiences engineered to command attention and drive retention.
          </p>
          {/* WF logo + credit row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 24 }}>
            <WFLogo size={20} />
            <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.45)' }}>
              Web Fixxies Collective
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {liveProjects.map((project, i) => (
            <LiveProjectCard key={project.id} project={project} index={i} />
          ))}
          <NovaBitesProjectCard index={liveProjects.length} />
        </div>
      </div>
    </section>
  );
}
