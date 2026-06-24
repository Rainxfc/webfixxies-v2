import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';


// ─── Legacy broken screen content ────────────────────────────────────────────
function LegacyScreen() {
  return (
    <div style={{ padding: '16px 14px', fontFamily: 'Georgia, serif', background: '#f0ede8', minHeight: 240, position: 'relative', overflow: 'hidden' }}>
      {/* fake ugly nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', background: '#cccccc', border: '2px outset #aaaaaa', marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#000080', fontFamily: 'Arial, sans-serif' }}>ACME CORP LLC</span>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Home', 'About', 'Services', 'Contact Us'].map(n => (
            <span key={n} style={{ fontSize: 9, color: '#000080', textDecoration: 'underline', fontFamily: 'Arial, sans-serif', cursor: 'pointer' }}>{n}</span>
          ))}
        </div>
      </div>
      {/* broken hero */}
      <div style={{ border: '2px dashed #cc0000', background: '#fff8f0', padding: '10px', marginBottom: 10, position: 'relative' }}>
        <div style={{ fontSize: 9, color: '#cc0000', fontFamily: 'monospace', marginBottom: 4 }}>⚠ IMAGE MISSING — src="hero.jpg" (404)</div>
        <div style={{ width: '100%', height: 48, background: '#e8e0d0', border: '1px dashed #999', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 8, color: '#999', fontFamily: 'monospace' }}>[broken image]</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#000', marginTop: 6, fontFamily: 'Times New Roman, serif' }}>
          WELCOM TO R WEBSIT
        </div>
        <div style={{ fontSize: 9, color: '#333', marginTop: 2 }}>We offer the best services in the industry since 1998.</div>
      </div>
      {/* misaligned content */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
        <div style={{ flex: 2, border: '1px solid #ccc', padding: 7, background: '#fff', fontSize: 9, color: '#333', fontFamily: 'Arial, sans-serif', lineHeight: 1.4 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#000080', marginBottom: 3 }}>Our Products</div>
          <div style={{ color: '#cc0000', fontSize: 8 }}>• ERROR: Database connection failed</div>
          <div>• Product 1.............$???</div>
          <div>• Product 2.............$???</div>
          <div style={{ color: '#999', fontSize: 8, marginTop: 4 }}>Last updated: 2009</div>
        </div>
        <div style={{ flex: 1, border: '2px inset #aaa', padding: 6, background: '#fffde0', fontSize: 8.5, color: '#333', textAlign: 'center' }}>
          <div style={{ fontSize: 9, fontWeight: 700, marginBottom: 2 }}>SPECIAL OFFER!!!</div>
          <div style={{ fontSize: 20, lineHeight: 1 }}>💸</div>
          <div style={{ fontSize: 8 }}>Click here<br />to WIN</div>
          <div style={{ fontSize: 7, color: '#999', marginTop: 2 }}>* terms apply</div>
        </div>
      </div>
      {/* misaligned footer */}
      <div style={{ borderTop: '2px solid #aaa', paddingTop: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: 7.5, color: '#666', fontFamily: 'Arial, sans-serif' }}>© 1998–2009 ACME Corp. All Rights Reserved. Optimized for Internet Explorer 6.</div>
        <div style={{ fontSize: 7, color: '#00f', textDecoration: 'underline' }}>webmaster@acme.com</div>
      </div>
      {/* scrolling marquee text */}
      <div style={{ overflow: 'hidden', marginTop: 6, height: 14, background: '#000080', padding: '2px 0' }}>
        <motion.div
          animate={{ x: ['100%', '-200%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ whiteSpace: 'nowrap', fontSize: 9, color: '#ffff00', fontFamily: 'Arial, sans-serif', paddingLeft: '100%' }}
        >
          ★ WELCOME TO OUR WEBSITE ★ BEST PRICES GUARANTEED ★ CALL US TODAY ★ IE6 COMPATIBLE ★
        </motion.div>
      </div>
    </div>
  );
}

// ─── Premium modern screen content ───────────────────────────────────────────
function PremiumScreen() {
  return (
    <div style={{ padding: '0', background: '#07080a', minHeight: 240, overflow: 'hidden', position: 'relative' }}>
      {/* animated bg */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(79,70,229,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      {/* grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', padding: '14px 16px' }}>
        {/* nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Gear Icon instead of Webfixxies logo */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 12s linear infinite' }}>
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span style={{ fontSize: 10, fontWeight: 900, fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #e2e8f0, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              ACME
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {['Work', 'About', 'Contact'].map(n => (
              <span key={n} className="font-mono" style={{ fontSize: 7.5, color: 'rgba(129,140,248,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{n}</span>
            ))}
          </div>
          <div style={{ padding: '4px 10px', borderRadius: 100, background: 'linear-gradient(135deg, #4f46e5, #6366f1)', fontSize: 7.5, color: '#fff', fontFamily: 'Space Mono, monospace', letterSpacing: '0.14em' }}>
            Get Started →
          </div>
        </div>

        {/* hero */}
        <div style={{ marginBottom: 14, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{ marginBottom: 6 }}
          >
            <span style={{ fontSize: 10, fontWeight: 900, fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #f1f5f9 0%, #a5b4fc 40%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              We Build the Future.
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            style={{ fontSize: 8.5, color: 'rgba(148,163,184,0.75)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 10 }}
          >
            Immersive digital experiences engineered for impact.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            style={{ display: 'inline-flex', gap: 8 }}
          >
            <div style={{ padding: '5px 14px', borderRadius: 100, background: 'linear-gradient(135deg, #4f46e5, #6366f1)', fontSize: 8, color: '#fff', fontFamily: 'Space Mono, monospace', letterSpacing: '0.12em', boxShadow: '0 0 16px rgba(79,70,229,0.4)' }}>Explore →</div>
            <div style={{ padding: '4px 13px', borderRadius: 100, border: '1px solid rgba(99,102,241,0.3)', fontSize: 8, color: 'rgba(129,140,248,0.8)', fontFamily: 'Space Mono, monospace', letterSpacing: '0.12em' }}>Learn More</div>
          </motion.div>
        </div>

        {/* stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}
        >
          {[
            { val: '3D', label: 'Immersive', color: '#818cf8' },
            { val: '<2ms', label: 'Latency', color: '#10b981' },
            { val: '100%', label: 'Custom', color: '#a5b4fc' },
          ].map(s => (
            <div key={s.label} style={{ padding: '8px', borderRadius: 8, border: '1px solid rgba(99,102,241,0.15)', background: 'rgba(79,70,229,0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: s.color, lineHeight: 1 }}>{s.val}</div>
              <div className="font-mono" style={{ fontSize: 7, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(79,70,229,0.5)', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Laptop + browser mockup with upgrade demo ────────────────────────────────
function WebUpgradeLaptop() {
  const [upgraded, setUpgraded] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleWrench = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setUpgraded(v => !v);
      setAnimating(false);
    }, 380);
  };

  // animated mouse path
  const mousePath = upgraded
    ? { x: ['28%', '30%', '50%'], y: ['75%', '75%', '50%'] }
    : { x: ['50%', '84%', '86%', '86%', '60%'], y: ['40%', '86%', '88%', '88%', '50%'] };

  return (
    <div style={{ width: '100%', marginTop: 36, position: 'relative' }}>
      {/* ── Laptop lid ── */}
      <div style={{
        width: '100%',
        borderRadius: '12px 12px 0 0',
        border: '2px solid rgba(99,102,241,0.25)',
        borderBottom: 'none',
        background: 'linear-gradient(180deg, #121519 0%, #0d0f12 100%)',
        boxShadow: '0 0 0 1px rgba(79,70,229,0.08), inset 0 0 20px rgba(79,70,229,0.05)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* browser chrome */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
          background: 'rgba(7,8,10,0.98)', borderBottom: '1px solid rgba(99,102,241,0.12)',
        }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.8 }} />
            ))}
          </div>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(13,15,18,0.9)', border: '1px solid rgba(99,102,241,0.15)',
            borderRadius: 5, padding: '3px 9px', overflow: 'hidden',
          }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: upgraded ? '#10b981' : '#ef4444', flexShrink: 0, transition: 'background 0.5s' }} />
            <span className="font-mono" style={{ fontSize: 7.5, color: upgraded ? 'rgba(129,140,248,0.7)' : 'rgba(100,100,100,0.7)', letterSpacing: '0.1em', transition: 'color 0.5s' }}>
              {upgraded ? 'acme.webfixxies.dev' : 'acmecorp.com — OUTDATED'}
            </span>
          </div>
          {/* Wrench button */}
          <motion.button
            onClick={handleWrench}
            whileTap={{ scale: 0.88 }}
            animate={!upgraded ? { scale: [1, 1.06, 1] } : { scale: 1 }}
            transition={!upgraded ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
            title={upgraded ? 'Revert to legacy' : 'Upgrade website'}
            style={{
              flexShrink: 0, width: 22, height: 22, borderRadius: 6,
              border: `1px solid ${upgraded ? 'rgba(99,102,241,0.5)' : 'rgba(100,100,100,0.35)'}`,
              background: upgraded ? 'rgba(79,70,229,0.2)' : 'rgba(60,60,60,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.4s',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke={upgraded ? '#818cf8' : '#888'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </motion.button>
        </div>

        {/* Screen area */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            {!upgraded ? (
              <motion.div key="legacy"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
                transition={{ duration: 0.35 }}
              >
                <LegacyScreen />
              </motion.div>
            ) : (
              <motion.div key="premium"
                initial={{ opacity: 0, scale: 1.02, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <PremiumScreen />
              </motion.div>
            )}
          </AnimatePresence>

          {/* progress shimmer */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: upgraded ? 2.5 : 7, repeat: Infinity, ease: 'easeInOut', repeatDelay: upgraded ? 2 : 5 }}
            style={{
              position: 'absolute', left: 0, right: 0, height: 1.5,
              background: upgraded
                ? 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(129,140,248,0.4), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(100,100,100,0.25), transparent)',
              pointerEvents: 'none',
              top: 0,
            }}
          />

          {/* Animated mouse */}
          <motion.div
            key={upgraded ? 'cursor-upgraded' : 'cursor-legacy'}
            animate={mousePath}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1, times: upgraded ? [0, 0.4, 1] : [0, 0.35, 0.5, 0.6, 1] }}
            style={{ position: 'absolute', pointerEvents: 'none', zIndex: 10, transform: 'translate(-4px, -2px)' }}
          >
            <motion.div
              animate={{ scale: upgraded ? [1, 1, 1] : [1, 1, 0.82, 0.82, 1] }}
              transition={{ duration: 5, repeat: Infinity, repeatDelay: 1, times: [0, 0.35, 0.5, 0.6, 1] }}
            >
              <svg width="16" height="20" viewBox="0 0 18 22" fill="none">
                <path d="M1 1L1 17L5.5 13L8.5 20L11 19L8 12L14 12L1 1Z"
                  fill={upgraded ? 'rgba(129,140,248,0.95)' : 'rgba(200,200,200,0.85)'}
                  stroke={upgraded ? 'rgba(79,70,229,0.6)' : 'rgba(100,100,100,0.5)'}
                  strokeWidth="1" />
              </svg>
            </motion.div>
            {/* click ripple — only on legacy */}
            {!upgraded && (
              <motion.div
                animate={{ scale: [0, 0, 2, 0, 0], opacity: [0, 0, 0.7, 0, 0] }}
                transition={{ duration: 5, repeat: Infinity, times: [0, 0.48, 0.54, 0.62, 1], repeatDelay: 1 }}
                style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  width: 22, height: 22, borderRadius: '50%',
                  border: '1.5px solid rgba(129,140,248,0.8)',
                  pointerEvents: 'none',
                }}
              />
            )}
          </motion.div>
        </div>

        {/* status bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '4px 12px', background: 'rgba(7,8,10,0.98)',
          borderTop: '1px solid rgba(99,102,241,0.08)',
        }}>
          <span className="font-mono" style={{ fontSize: 7, color: upgraded ? 'rgba(79,70,229,0.6)' : 'rgba(100,100,100,0.4)', letterSpacing: '0.18em', transition: 'color 0.5s' }}>
            {upgraded ? 'WF.PREMIUM' : 'LEGACY.SITE'}
          </span>
          <div style={{ height: 1, flex: 1, margin: '0 8px', background: 'rgba(99,102,241,0.07)', overflow: 'hidden' }}>
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: upgraded ? 2 : 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ height: '100%', width: '35%', background: upgraded ? 'linear-gradient(90deg, transparent, rgba(129,140,248,0.5), transparent)' : 'linear-gradient(90deg, transparent, rgba(120,120,120,0.3), transparent)' }}
            />
          </div>
          <span className="font-mono" style={{ fontSize: 7, color: upgraded ? 'rgba(99,102,241,0.5)' : 'rgba(100,100,100,0.3)', letterSpacing: '0.18em', transition: 'color 0.5s' }}>
            {upgraded ? 'ACTIVE' : 'ERRORS: 7'}
          </span>
        </div>
      </div>

      {/* ── Keyboard deck ── */}
      <div style={{
        width: '104%', marginLeft: '-2%', height: 12,
        background: 'linear-gradient(to bottom, #181c22, #0d0f12)',
        borderRadius: '0 0 8px 8px',
        border: '1.5px solid rgba(99,102,241,0.18)',
        borderTop: '2px solid rgba(129,140,248,0.35)',
        boxShadow: '0 10px 24px rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        {/* touchpad */}
        <div style={{ width: 52, height: 6, background: 'rgba(7,8,10,0.9)', border: '1px solid rgba(99,102,241,0.1)', borderRadius: '1px 1px 0 0', position: 'absolute', bottom: 1 }} />
      </div>

      {/* keyboard rows */}
      <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
        {[
          { keys: 13, w: '96%' },
          { keys: 12, w: '90%' },
          { keys: 10, w: '84%' },
          { keys: 8, w: '74%' },
        ].map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 3, width: row.w, justifyContent: 'center' }}>
            {Array.from({ length: row.keys }).map((_, ki) => (
              <div key={ki} style={{
                flex: ri === 2 && ki === 4 ? 3.5 : 1, height: 11,
                background: upgraded ? 'linear-gradient(to bottom, #1e2330, #181c22)' : 'linear-gradient(to bottom, #1a1a1a, #0a0a0a)',
                borderRadius: 3,
                border: upgraded ? '1px solid rgba(99,102,241,0.16)' : '1px solid rgba(80,80,80,0.25)',
                boxShadow: 'inset 0 -1.5px 0 rgba(0,0,0,0.5)',
                transition: 'background 0.6s, border-color 0.6s',
              }} />
            ))}
          </div>
        ))}
      </div>

      {/* caption */}
      <div style={{ textAlign: 'center', marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <span className="font-mono" style={{ fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(79,70,229,0.5)' }}>
          {upgraded ? '✓ UPGRADED — Click the wrench to revert' : 'Click the wrench ↑ to see the upgrade'}
        </span>
      </div>
    </div>
  );
}

const problems = [
  { tag: 'Broken Navigation', title: 'Poor navigation is costing you users.', body: 'In an era defined by instant answers and short attention spans, outdated websites act as barriers to entry. Broken flows, buried content, and slow interfaces cause visitors to leave before they even engage.', icon: '⬡', color: '#4f46e5', glow: 'rgba(79,70,229,0.15)' },
  { tag: 'Template Fatigue', title: 'Generic templates are erasing brand distinction.', body: 'Most businesses still rely on off-the-shelf layouts that communicate nothing unique about their brand. We build custom, high-fidelity interfaces that feel intentional, premium, and unmistakably yours.', icon: '◈', color: '#6366f1', glow: 'rgba(99,102,241,0.15)' },
  { tag: 'Access Gap', title: 'Premium design should not be a privilege.', body: 'Advanced web design has historically been locked behind large agency fees, pricing out local businesses that need it most. We exist to close that gap by delivering enterprise-quality results at accessible rates.', icon: '◆', color: '#4338ca', glow: 'rgba(67,56,202,0.15)' },
];

export default function MissionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="mission" ref={ref} style={{ position: 'relative', width: '100%', padding: '120px 24px', overflow: 'hidden', background: 'linear-gradient(180deg, #07080a 0%, #0d0f12 50%, #07080a 100%)' }}>
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px 48px', alignItems: 'start' }}>
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <div className="section-tag" style={{ marginBottom: 24 }}>
              <span className="dot" />Mission
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24, color: '#f1f5f9' }}>
              We build the web so it feels{' '}
              <span style={{ background: 'linear-gradient(135deg, #818cf8, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                immediate, premium & effortless.
              </span>
            </h2>
            <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>
              Web Fixxies exists to raise the standard of the modern web experience. We engineer visually striking, high-performance digital platforms for brands that demand more than a template.
            </p>
            <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.8, fontWeight: 300 }}>
              Our mission is to make advanced digital presence accessible at a fraction of enterprise cost — giving local businesses and ambitious teams the level of polish that was once exclusive to large agency budgets.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32 }}>
              {['Performance First', 'Spatial Storytelling', 'Accessible Premium'].map(tag => (
                <span key={tag} className="font-mono" style={{ padding: '6px 14px', border: '1px solid rgba(99,102,241,0.18)', borderRadius: 100, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#64748b', background: 'rgba(79,70,229,0.05)' }}>
                  {tag}
                </span>
              ))}
            </div>
            <WebUpgradeLaptop />
          </motion.div>

          {/* Right */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {problems.map((p, i) => (
              <motion.div key={p.tag}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.01 }}
                style={{ padding: '28px', borderRadius: 16, border: '1px solid rgba(99,102,241,0.1)', background: 'rgba(13,15,18,0.85)', backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden', cursor: 'default' }}
              >
                <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${p.glow} 0%, transparent 70%)`, filter: 'blur(20px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`, opacity: 0.4 }} />
                <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: p.color, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{p.icon}</span>{p.tag}
                </div>
                <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9', marginBottom: 12, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.75, fontWeight: 300 }}>{p.body}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="glow-border"
              style={{ padding: '32px 28px', borderRadius: 16, position: 'relative', overflow: 'hidden', background: 'rgba(13,15,18,0.95)' }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top left, rgba(79,70,229,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />
              <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#4f46e5', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'inline-block', width: 24, height: 1, background: 'linear-gradient(90deg, #4f46e5, #6366f1)' }} />
                Our Mission
              </div>
              <p className="font-display" style={{ fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 600, lineHeight: 1.5, color: '#f1f5f9', position: 'relative' }}>
                We deliver high-performance, visually compelling web architectures at a fraction of enterprise cost — making advanced digital presence genuinely accessible to the businesses that need it most.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
