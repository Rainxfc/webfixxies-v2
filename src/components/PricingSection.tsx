import { useState, useRef } from 'react';
import { navTo } from '../utils/navigation';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../App';

const tiers = [
  {
    name: 'Starter Website', price: 'Custom Quote',
    desc: 'Perfect if you need a great-looking website that loads fast and works on all devices. Ideal for small businesses, portfolios, or anyone stepping up their online presence.',
    features: [
      'Custom Design — not a template copy',
      'Smooth Animations & Modern Look',
      'Fast Load Times on Any Device',
      'One Page, Built to Convert Visitors',
    ],
    accent: '#7c3aed', accentAlt: '#a78bfa',
    glow: 'rgba(124,58,237,0.2)', glowSoft: 'rgba(124,58,237,0.07)',
    badge: null, icon: '⬡',
  },
  {
    name: 'Full Business Platform', price: 'Enterprise Quote',
    desc: 'For businesses ready to go big. A complete, multi-page website with advanced features, interactive elements, and everything needed to compete globally.',
    features: [
      'Multi-Page Site with Full Navigation',
      'Interactive 3D Elements & Animations',
      'Real-Time User Experience Features',
      'Secure Delivery with Written Agreement',
    ],
    accent: '#8b5cf6', accentAlt: '#c4b5fd',
    glow: 'rgba(139,92,246,0.2)', glowSoft: 'rgba(139,92,246,0.07)',
    badge: 'READY WORLDWIDE', icon: '◆',
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
            What's Included
          </h2>
          <p style={{ maxWidth: 520, margin: '0 auto', fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.85, fontWeight: 400, letterSpacing: '0.01em' }}>
            Every project is custom-quoted based on what you actually need. No surprise fees — just honest, fair pricing.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={inView ? {
                opacity: hovered !== null && hovered !== idx ? 0.55 : 1,
                scale: hovered === idx ? 1.02 : 1,
                y: hovered === idx ? -6 : 0,
              } : { opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              onHoverStart={() => setHovered(idx)}
              onHoverEnd={() => setHovered(null)}
              style={{
                padding: 'clamp(24px, 5vw, 40px) clamp(20px, 4vw, 36px)', borderRadius: 20,
                border: `1px solid ${hovered === idx ? tier.accent + '44' : 'var(--border-subtle)'}`,
                background: `linear-gradient(135deg, var(--bg-mid), ${tier.glowSoft})`,
                position: 'relative', overflow: 'hidden', cursor: 'default',
                boxShadow: hovered === idx ? `0 0 60px ${tier.glow}, 0 20px 60px rgba(0,0,0,0.3)` : 'var(--shadow-card)',
                transition: 'border-color 0.4s, box-shadow 0.4s',
              }}
            >
              <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${tier.glow} 0%, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none', opacity: hovered === idx ? 1 : 0.5, transition: 'opacity 0.4s' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${tier.accent}, ${tier.accentAlt}, transparent)`, opacity: hovered === idx ? 0.9 : 0.35, transition: 'opacity 0.4s' }} />

              {tier.badge && (
                <div className="font-mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 100, border: `1px solid ${tier.accent}44`, background: `${tier.accent}11`, fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: tier.accentAlt, marginBottom: 24 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: tier.accent, boxShadow: `0 0 6px ${tier.accent}` }} />
                  {tier.badge}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0, background: `${tier.accent}15`, border: `1px solid ${tier.accent}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: tier.accent }}>
                  {tier.icon}
                </div>
                <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{tier.name}</h3>
              </div>

              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.85, fontWeight: 400, marginBottom: 28, letterSpacing: '0.01em' }}>{tier.desc}</p>
              <div style={{ height: 1, background: `linear-gradient(90deg, ${tier.accent}22, transparent)`, marginBottom: 28 }} />

              <ul style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
                {tier.features.map((f, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: idx * 0.2 + i * 0.07 + 0.4 }} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ marginTop: 6, flexShrink: 0, width: 6, height: 6, borderRadius: '50%', background: `linear-gradient(135deg, ${tier.accent}, ${tier.accentAlt})`, boxShadow: `0 0 8px ${tier.glow}` }} />
                    <span style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 400 }}>{f}</span>
                  </motion.li>
                ))}
              </ul>

              <div style={{ paddingTop: 28, borderTop: `1px solid ${tier.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                <span className="font-display" style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', background: `linear-gradient(135deg, ${tier.accent}, ${tier.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {tier.price}
                </span>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); navTo('contact'); }}
                  style={{ padding: '10px 22px', borderRadius: 100, background: `linear-gradient(135deg, ${tier.accent}, ${tier.accentAlt === '#a5b4fc' ? '#6366f1' : '#4f46e5'})`, border: 'none', color: '#fff', fontSize: 11, fontFamily: 'Space Mono, monospace', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none', boxShadow: `0 0 20px ${tier.glow}`, transition: 'all 0.3s', display: 'inline-block' }}
                >
                  Get a Quote →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6, duration: 0.6 }} style={{ textAlign: 'center', marginTop: 48, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 400 }}>
          Not sure which option is right for you? Just reach out — we'll figure it out together.
        </motion.p>
      </div>
    </section>
  );
}
