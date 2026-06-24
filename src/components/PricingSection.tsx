import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const tiers = [
  {
    name: 'Core Web Experience', price: 'Custom Scope',
    desc: 'High-performance, interactive single-page web experiences tailored for businesses looking to establish a distinct digital presence and increase user retention.',
    features: [
      'Custom 3D Art Direction & Scene Configuration',
      'High-Performance Interface Animations (Framer Motion)',
      'Optimised CSS Architecture for Faster Load Times',
      'Single-Page Structure Built for User Conversion',
    ],
    accent: '#4f46e5', accentAlt: '#818cf8',
    glow: 'rgba(79,70,229,0.2)', glowSoft: 'rgba(79,70,229,0.07)',
    badge: null, icon: '⬡',
  },
  {
    name: 'Enterprise Web Platform', price: 'Enterprise Scope',
    desc: 'Full-scale web platforms featuring immersive product simulations, custom interactive environments, and complex UI/UX architectures built for global scalability.',
    features: [
      'Production-Ready 3D Asset Integration (Optimised GLTF / GLB)',
      'Real-Time Interactive Cursor & Pointer Tracking',
      'Multi-Page Architecture with Advanced User-Flow Logic',
      'Fully Secure Delivery with Formal Project Agreements',
    ],
    accent: '#6366f1', accentAlt: '#a5b4fc',
    glow: 'rgba(99,102,241,0.2)', glowSoft: 'rgba(99,102,241,0.07)',
    badge: 'INTERNATIONAL READY', icon: '◆',
  },
];

export default function PricingSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pricing" ref={ref} style={{ position: 'relative', width: '100%', padding: '120px 24px', overflow: 'hidden', background: 'linear-gradient(180deg, #07080a 0%, #0d0f12 60%, #07080a 100%)' }}>
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '50%', left: '-10%', width: '120%', height: 200, background: 'linear-gradient(90deg, transparent, rgba(79,70,229,0.04), rgba(99,102,241,0.04), transparent)', transform: 'translateY(-50%) rotate(-1deg)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="section-tag" style={{ margin: '0 auto 24px' }}>
            <span className="dot" />Investment
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 20, background: 'linear-gradient(135deg, #f1f5f9 0%, #a5b4fc 50%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Service Tiers
          </h2>
          <p style={{ maxWidth: 500, margin: '0 auto', fontSize: 15, color: '#64748b', lineHeight: 1.8, fontWeight: 300 }}>
            Every engagement is scoped to your exact technical requirements. We deliver maximum impact at exceptional value.
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
                padding: '40px 36px', borderRadius: 20,
                border: `1px solid ${hovered === idx ? tier.accent + '44' : 'rgba(99,102,241,0.1)'}`,
                background: `linear-gradient(135deg, rgba(13,15,18,0.97), ${tier.glowSoft})`,
                backdropFilter: 'blur(30px)', position: 'relative', overflow: 'hidden', cursor: 'default',
                boxShadow: hovered === idx ? `0 0 60px ${tier.glow}, 0 20px 60px rgba(0,0,0,0.5)` : '0 8px 40px rgba(0,0,0,0.4)',
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
                <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.3 }}>{tier.name}</h3>
              </div>

              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.75, fontWeight: 300, marginBottom: 28 }}>{tier.desc}</p>
              <div style={{ height: 1, background: `linear-gradient(90deg, ${tier.accent}22, transparent)`, marginBottom: 28 }} />

              <ul style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
                {tier.features.map((f, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: idx * 0.2 + i * 0.07 + 0.4 }} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ marginTop: 5, flexShrink: 0, width: 6, height: 6, borderRadius: '50%', background: `linear-gradient(135deg, ${tier.accent}, ${tier.accentAlt})`, boxShadow: `0 0 8px ${tier.glow}` }} />
                    <span style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, fontWeight: 300 }}>{f}</span>
                  </motion.li>
                ))}
              </ul>

              <div style={{ paddingTop: 28, borderTop: `1px solid ${tier.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="font-display" style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', background: `linear-gradient(135deg, ${tier.accent}, ${tier.accentAlt})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {tier.price}
                </span>
                <a href="#contact" style={{ padding: '10px 22px', borderRadius: 100, background: `linear-gradient(135deg, ${tier.accent}, ${tier.accentAlt === '#a5b4fc' ? '#6366f1' : '#4f46e5'})`, border: 'none', color: '#fff', fontSize: 10, fontFamily: 'Space Mono, monospace', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none', boxShadow: `0 0 20px ${tier.glow}`, transition: 'all 0.3s', display: 'inline-block' }}>
                  Enquire →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6, duration: 0.6 }} className="font-mono" style={{ textAlign: 'center', marginTop: 48, fontSize: 10, letterSpacing: '0.2em', color: '#334155', textTransform: 'uppercase', lineHeight: 1.8 }}>
          All engagements are custom-scoped. Delivered under professionally structured project agreements.
        </motion.p>
      </div>
    </section>
  );
}
