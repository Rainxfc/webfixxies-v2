import { useState, useRef } from 'react';
import { navTo } from '../utils/navigation';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../App';

const tiers = [
  {
    name: 'Starter Site',
    price: 'Let\'s Talk',
    desc: 'You need a site that actually looks the part — something clean, fast, and built around your brand. Not a template someone else is also using.',
    features: [
      'One-page custom design, built from scratch',
      'Smooth animations that feel premium',
      'Works perfectly on phones, tablets & desktops',
      'Fast load times — no bloat, no shortcuts',
      'Extras like booking, galleries & forms on request',
    ],
    note: 'Things like dashboards, live data, or e-commerce? We can discuss — just mention it.',
    accent: '#7c3aed', accentAlt: '#a78bfa',
    glow: 'rgba(124,58,237,0.2)', glowSoft: 'rgba(124,58,237,0.07)',
    badge: null, icon: '⬡',
  },
  {
    name: 'Full Business Platform',
    price: 'Let\'s Talk',
    desc: 'A complete online presence — multiple pages, advanced features, and the kind of 3D interactive experience that makes people screenshot your site and send it to their friends.',
    features: [
      'Multi-page site with full navigation',
      'Interactive 3D elements & immersive animations',
      'Admin panels, dashboards & content editing on request',
      'Secure handover with a written project agreement',
      'Ongoing support available after launch',
    ],
    note: 'Add-ons like a blog, loyalty system, or product catalogue? We scope it with you — no guessing.',
    accent: '#8b5cf6', accentAlt: '#c4b5fd',
    glow: 'rgba(139,92,246,0.2)', glowSoft: 'rgba(139,92,246,0.07)',
    badge: 'MOST POPULAR', icon: '◆',
  },
];

export default function PricingSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { dark } = useTheme();

  return (
    <section id="pricing" ref={ref} className="section-bg" style={{ position: 'relative', width: '100%', padding: '120px 24px', overflow: 'hidden' }}>
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '50%', left: '-10%', width: '120%', height: 200, background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.05), rgba(139,92,246,0.05), transparent)', transform: 'translateY(-50%) rotate(-1deg)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="section-tag" style={{ margin: '0 auto 24px' }}>
            <span className="dot" />Pricing
          </div>
          <h2 className={`font-display section-heading-grad ${!dark ? 'section-heading-light' : ''}`} style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: 20 }}>
            Simple. Honest. Custom.
          </h2>
          <p style={{ maxWidth: 560, margin: '0 auto', fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.85, fontWeight: 400, letterSpacing: '0.01em' }}>
            Every project is priced based on what you actually need — not a package that half-fits. Tell us what you're building and we'll give you a fair number, straight up.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={inView ? {
                opacity: hovered !== null && hovered !== idx ? 0.6 : 1,
                scale: hovered === idx ? 1.02 : 1,
                y: hovered === idx ? -6 : 0,
              } : { opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              onHoverStart={() => setHovered(idx)}
              onHoverEnd={() => setHovered(null)}
              style={{
                padding: 'clamp(28px, 5vw, 44px) clamp(22px, 4vw, 38px)',
                borderRadius: 20,
                border: `1px solid ${hovered === idx ? tier.accent + '55' : 'var(--border-subtle)'}`,
                background: `linear-gradient(135deg, var(--bg-mid), ${tier.glowSoft})`,
                position: 'relative', overflow: 'hidden', cursor: 'default',
                boxShadow: hovered === idx ? `0 0 60px ${tier.glow}, 0 20px 60px rgba(0,0,0,0.3)` : 'var(--shadow-card)',
                transition: 'border-color 0.4s, box-shadow 0.4s',
              }}
            >
              <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${tier.glow} 0%, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none', opacity: hovered === idx ? 1 : 0.5, transition: 'opacity 0.4s' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${tier.accent}, ${tier.accentAlt}, transparent)`, opacity: hovered === idx ? 1 : 0.4, transition: 'opacity 0.4s' }} />

              {tier.badge && (
                <div className="font-mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 100, border: `1px solid ${tier.accent}44`, background: `${tier.accent}15`, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: tier.accentAlt, marginBottom: 24, fontWeight: 700 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: tier.accent, boxShadow: `0 0 6px ${tier.accent}` }} />
                  {tier.badge}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: `${tier.accent}18`, border: `1px solid ${tier.accent}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  {tier.icon}
                </div>
                <div>
                  <h3 className="font-display" style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 4 }}>{tier.name}</h3>
                  <div className="font-mono" style={{ fontSize: 10, letterSpacing: '0.15em', color: tier.accent, fontWeight: 700 }}>CUSTOM PRICING</div>
                </div>
              </div>

              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.85, fontWeight: 400, marginBottom: 24, letterSpacing: '0.01em' }}>{tier.desc}</p>
              <div style={{ height: 1, background: `linear-gradient(90deg, ${tier.accent}30, transparent)`, marginBottom: 24 }} />

              <ul style={{ display: 'flex', flexDirection: 'column', gap: 13, marginBottom: 24 }}>
                {tier.features.map((f, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: idx * 0.2 + i * 0.07 + 0.4 }} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ marginTop: 7, flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: `linear-gradient(135deg, ${tier.accent}, ${tier.accentAlt})`, boxShadow: `0 0 8px ${tier.glow}` }} />
                    <span style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 400 }}>{f}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Note / add-ons hint */}
              <div style={{ padding: '14px 16px', borderRadius: 10, background: `${tier.accent}0d`, border: `1px solid ${tier.accent}22`, marginBottom: 32 }}>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
                  💬 {tier.note}
                </p>
              </div>

              <div style={{ paddingTop: 24, borderTop: `1px solid ${tier.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-faint)', fontFamily: 'Space Mono, monospace', letterSpacing: '0.12em', marginBottom: 2 }}>STARTING FROM</div>
                  <span className="font-display" style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', background: `linear-gradient(135deg, ${tier.accent}, ${tier.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {tier.price}
                  </span>
                </div>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); navTo('contact'); }}
                  style={{ padding: '12px 26px', borderRadius: 100, background: `linear-gradient(135deg, ${tier.accent}, ${tier.accentAlt === '#a78bfa' ? '#6d28d9' : '#7c3aed'})`, border: 'none', color: '#fff', fontSize: 11, fontFamily: 'Space Mono, monospace', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none', boxShadow: `0 0 24px ${tier.glow}`, transition: 'all 0.3s', display: 'inline-block', fontWeight: 700 }}
                >
                  Let's Chat →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7, duration: 0.6 }} style={{ textAlign: 'center', marginTop: 56, padding: '28px 24px', borderRadius: 16, border: '1px solid var(--border-subtle)', background: 'var(--section-gradient-a)', maxWidth: 680, margin: '56px auto 0' }}>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, margin: 0 }}>
            Not sure what you need? That's fine — most of our clients aren't when they first reach out. <span style={{ color: 'var(--violet-glow)', fontWeight: 600 }}>Just drop us a message</span> and we'll figure it out together, no pressure.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
