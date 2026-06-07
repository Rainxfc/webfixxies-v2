import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Live site browser mockup with animated mouse ─────────────────────────────
function WebUpgradeMockup() {
  // Mouse path: starts centre, drifts to upgrade button area, clicks, moves away
  const mousePath = {
    x: ['50%', '72%', '74%', '74%', '40%', '35%'],
    y: ['48%', '82%', '84%', '84%', '60%', '55%'],
  };

  return (
    <div style={{ width: '100%', marginTop: 36, position: 'relative' }}>
      {/* Screen bezel */}
      <div style={{
        borderRadius: 14,
        overflow: 'hidden',
        border: '1.5px solid rgba(139,92,246,0.3)',
        background: 'linear-gradient(180deg, #04000d 0%, #1e0047 50%, #04000d 100%)',
        boxShadow: '0 0 0 1px rgba(192,38,211,0.1), inset 0 0 30px rgba(124,58,237,0.08), 0 24px 60px rgba(0,0,0,0.7)',
        position: 'relative',
      }}>
        {/* Browser chrome */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '9px 14px',
          background: 'rgba(4,0,12,0.95)',
          borderBottom: '1px solid rgba(139,92,246,0.15)',
        }}>
          <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
            {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
              <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.8 }} />
            ))}
          </div>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 7,
            background: 'rgba(8,0,20,0.8)',
            border: '1px solid rgba(139,92,246,0.2)',
            borderRadius: 6, padding: '3px 10px', overflow: 'hidden',
          }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
            <span className="font-mono" style={{ fontSize: 8, color: 'rgba(139,92,246,0.7)', letterSpacing: '0.1em' }}>
              mcethereal.github.io/webfixxies
            </span>
          </div>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,0.4)" strokeWidth="2" style={{ flexShrink: 0 }}>
            <path d="M1 4v6h6M23 20v-6h-6" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
        </div>

        {/* Iframe viewport */}
        <div style={{ position: 'relative', paddingBottom: '62%', overflow: 'hidden' }}>
          <iframe
            src="https://mcethereal.github.io/webfixxies/"
            title="Webfixxies V1 Live Preview"
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: '100%',
              border: 'none', pointerEvents: 'none',
            }}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
          {/* gradient fade */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 55%, rgba(4,0,13,0.85) 100%)',
            pointerEvents: 'none',
          }} />
          {/* scan line */}
          <motion.div
            animate={{ y: ['-5%', '110%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
            style={{
              position: 'absolute', left: 0, right: 0, height: 1.5,
              background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(192,38,211,0.4), transparent)',
              pointerEvents: 'none',
            }}
          />

          {/* ── Animated mouse cursor ── */}
          <motion.div
            animate={mousePath}
            transition={{
              duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1,
              times: [0, 0.3, 0.45, 0.55, 0.8, 1],
            }}
            style={{
              position: 'absolute', pointerEvents: 'none', zIndex: 10,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Cursor shape */}
            <motion.div
              animate={{ scale: [1, 1, 0.85, 0.85, 1, 1] }}
              transition={{ duration: 6, repeat: Infinity, times: [0, 0.3, 0.45, 0.55, 0.8, 1], repeatDelay: 1 }}
            >
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                <path d="M1 1L1 17L5.5 13L8.5 20L11 19L8 12L14 12L1 1Z" fill="white" stroke="rgba(124,58,237,0.8)" strokeWidth="1.2"/>
              </svg>
            </motion.div>
            {/* Click ripple */}
            <motion.div
              animate={{ scale: [0, 0, 1.8, 0, 0], opacity: [0, 0, 0.6, 0, 0] }}
              transition={{ duration: 6, repeat: Infinity, times: [0, 0.43, 0.5, 0.57, 1], repeatDelay: 1 }}
              style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 28, height: 28, borderRadius: '50%',
                border: '2px solid rgba(167,139,250,0.7)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        </div>

        {/* Status bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '5px 14px',
          background: 'rgba(4,0,12,0.95)',
          borderTop: '1px solid rgba(139,92,246,0.1)',
        }}>
          <span className="font-mono" style={{ fontSize: 7.5, color: 'rgba(124,58,237,0.5)', letterSpacing: '0.18em' }}>LIVE PREVIEW</span>
          <div style={{ height: 1.5, flex: 1, margin: '0 10px', background: 'rgba(139,92,246,0.08)', borderRadius: 1, overflow: 'hidden' }}>
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ height: '100%', width: '35%', background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.5), transparent)' }}
            />
          </div>
          <span className="font-mono" style={{ fontSize: 7.5, color: 'rgba(192,38,211,0.4)', letterSpacing: '0.18em' }}>WF.V1</span>
        </div>
      </div>

      {/* Monitor neck */}
      <div style={{ width: 2, height: 18, background: 'linear-gradient(to bottom, rgba(139,92,246,0.4), rgba(80,50,160,0.2))', margin: '0 auto' }} />
      {/* Monitor base */}
      <div style={{
        width: '40%', height: 8, margin: '0 auto',
        background: 'linear-gradient(to bottom, #150825, #0a0214)',
        borderRadius: '0 0 10px 10px',
        border: '1px solid rgba(139,92,246,0.18)',
        borderTop: '1.5px solid rgba(139,92,246,0.35)',
        boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
      }} />

      {/* Caption */}
      <div style={{ textAlign: 'center', marginTop: 14 }}>
        <a
          href="https://mcethereal.github.io/webfixxies/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono"
          style={{
            fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(139,92,246,0.55)', textDecoration: 'none',
            transition: 'color 0.3s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#a78bfa')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(139,92,246,0.55)')}
        >
          ↗ View Live Site
        </a>
      </div>
    </div>
  );
}

const problems = [
  { tag: 'Broken Navigation', title: 'Broken navigation is the baseline problem.', body: 'We are generationally native digital builders who understand that modern web journeys are failing. In an era shaped by LLMs and instant answers, legacy websites act like data graveyards: stale, buried, and frustratingly hard to traverse.', icon: '⬡', color: '#7c3aed', glow: 'rgba(124,58,237,0.15)' },
  { tag: 'Template Fatigue', title: 'Generic templates are killing distinction.', body: 'Most websites still look interchangeable, leaning on safe layouts that say nothing memorable about the brand behind them. We build spatial, high-end interfaces that feel intentional, premium, and unmistakably custom.', icon: '◈', color: '#c026d3', glow: 'rgba(192,38,211,0.15)' },
  { tag: 'Access Gap', title: 'Design quality should not be gatekept.', body: 'Coming from a region where advanced graphic design is often trapped behind massive agency premiums, we see too many local businesses neglect their digital storefronts entirely. That gap should not exist.', icon: '◆', color: '#4f46e5', glow: 'rgba(79,70,229,0.15)' },
];

export default function MissionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="mission" ref={ref} style={{ position: 'relative', width: '100%', padding: '120px 24px', overflow: 'hidden', background: 'linear-gradient(180deg, #04000d 0%, #080016 50%, #04000d 100%)' }}>
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,38,211,0.07) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px 48px', alignItems: 'start' }}>
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <div className="section-tag" style={{ marginBottom: 24 }}>
              <span className="dot" />Mission
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24, color: '#f5f0ff' }}>
              We build the web so it feels{' '}
              <span style={{ background: 'linear-gradient(135deg, #a78bfa, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                immediate, premium &amp; effortless.
              </span>
            </h2>
            <p style={{ color: '#9d8fb5', fontSize: 15, lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>
              Web Fixxies exists to correct the experience layer of modern browsing. We engineer visually stunning, fluid spatial architectures for brands that need more than a template.
            </p>
            <p style={{ color: '#6b5d80', fontSize: 14, lineHeight: 1.8, fontWeight: 300 }}>
              Our mission is to make advanced digital presence accessible at a fraction of enterprise cost, giving local businesses and ambitious teams the level of polish that used to be locked behind agency premiums.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32 }}>
              {['Performance First', 'Spatial Storytelling', 'Accessible Premium'].map(tag => (
                <span key={tag} className="font-mono" style={{ padding: '6px 14px', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 100, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7c6a99', background: 'rgba(124,58,237,0.05)' }}>
                  {tag}
                </span>
              ))}
            </div>
            <WebUpgradeMockup />
          </motion.div>

          {/* Right */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {problems.map((p, i) => (
              <motion.div key={p.tag}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.01 }}
                style={{ padding: '28px', borderRadius: 16, border: '1px solid rgba(139,92,246,0.12)', background: 'rgba(13,0,31,0.8)', backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden', cursor: 'default' }}
              >
                <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${p.glow} 0%, transparent 70%)`, filter: 'blur(20px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`, opacity: 0.5 }} />
                <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: p.color, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{p.icon}</span>{p.tag}
                </div>
                <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#f5f0ff', marginBottom: 12, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: '#7c6a99', lineHeight: 1.75, fontWeight: 300 }}>{p.body}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="glow-border"
              style={{ padding: '32px 28px', borderRadius: 16, position: 'relative', overflow: 'hidden', background: 'rgba(13,0,31,0.9)' }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top left, rgba(124,58,237,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
              <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7c3aed', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'inline-block', width: 24, height: 1, background: 'linear-gradient(90deg, #7c3aed, #c026d3)' }} />
                Our Mission
              </div>
              <p className="font-display" style={{ fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 600, lineHeight: 1.5, color: '#f5f0ff', position: 'relative' }}>
                We disrupt that cycle by delivering high-performance, visually stunning, fluid spatial web architectures at a fraction of enterprise cost, making advanced digital presence accessible to the businesses that need it most.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
