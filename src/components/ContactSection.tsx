import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref} style={{ position: 'relative', width: '100%', padding: '120px 24px 80px', overflow: 'hidden', background: 'linear-gradient(180deg, #04000d 0%, #0d001f 40%, #04000d 100%)' }}>
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, rgba(192,38,211,0.05) 40%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-tag" style={{ margin: '0 auto 24px' }}>
            <span className="dot" />Contact
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 20, background: 'linear-gradient(135deg, #f5f0ff 0%, #c4b5fd 40%, #e879f9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Strategic Investment &amp;<br />Project Consultation
          </h2>
          <p style={{ maxWidth: 560, margin: '0 auto', fontSize: 15, color: '#7c6a99', lineHeight: 1.8, fontWeight: 300 }}>
            Every engagement is custom-priced based on the technical scope and creative complexity of your project. Let's discuss your project goals.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="glow-border" style={{ borderRadius: 24, padding: '3px', marginBottom: 32 }}>
          <div style={{ borderRadius: 22, padding: '64px 48px', background: 'rgba(8,0,22,0.95)', backdropFilter: 'blur(40px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <motion.div animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
            <motion.div animate={{ rotate: [360, 0], scale: [1, 1.15, 1] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', bottom: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,38,211,0.12) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 72, height: 72, borderRadius: '50%', margin: '0 auto 32px', background: 'radial-gradient(circle at 35% 35%, rgba(167,139,250,0.4), rgba(124,58,237,0.1))', border: '1px solid rgba(167,139,250,0.3)', boxShadow: '0 0 40px rgba(124,58,237,0.4), inset 0 0 20px rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>

            <p style={{ fontSize: 13, color: '#5d4f70', fontFamily: 'Space Mono, monospace', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Direct Channel</p>

            <a
              href="mailto:webfixxies@gmail.com"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '18px 40px', borderRadius: 100, border: '1px solid rgba(167,139,250,0.3)', background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(192,38,211,0.08))', color: '#c4b5fd', fontSize: 'clamp(13px, 2vw, 17px)', fontFamily: 'Space Mono, monospace', letterSpacing: '0.08em', textDecoration: 'none', position: 'relative', overflow: 'hidden', boxShadow: '0 0 40px rgba(124,58,237,0.2)', transition: 'all 0.3s ease', cursor: 'pointer', marginBottom: 40 }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = 'rgba(167,139,250,0.6)'; el.style.boxShadow = '0 0 60px rgba(124,58,237,0.4)'; el.style.color = '#f5f0ff'; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = 'rgba(167,139,250,0.3)'; el.style.boxShadow = '0 0 40px rgba(124,58,237,0.2)'; el.style.color = '#c4b5fd'; }}
            >
              <motion.span animate={{ x: ['-150%', '150%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }} style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.15), transparent)', pointerEvents: 'none' }} />
              <span style={{ position: 'relative', zIndex: 1 }}>webfixxies@gmail.com</span>
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'relative', zIndex: 1 }}>→</motion.span>
            </a>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, maxWidth: 560, margin: '0 auto', position: 'relative' }}>
              {[{ label: 'Response Time', value: '< 24h', icon: '⚡' }, { label: 'Project Scope', value: 'Custom', icon: '⬡' }, { label: 'Coverage', value: 'Global', icon: '◈' }].map((item) => (
                <div key={item.label} style={{ padding: '16px', borderRadius: 12, border: '1px solid rgba(139,92,246,0.12)', background: 'rgba(124,58,237,0.05)', textAlign: 'center' }}>
                  <div style={{ fontSize: 18, marginBottom: 6 }}>{item.icon}</div>
                  <div className="font-mono" style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5d4f70', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Outfit, sans-serif', background: 'linear-gradient(135deg, #a78bfa, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6, duration: 0.6 }} className="font-mono" style={{ textAlign: 'center', fontSize: 9, letterSpacing: '0.18em', color: '#2d2040', textTransform: 'uppercase', lineHeight: 2, maxWidth: 700, margin: '0 auto' }}>
          Web Fixxies operates on international good-faith principles. All transactional invoicing, payment transfers, and operational agreements are legally managed, reviewed, and authorized via parent-fiduciary compliance to ensure total platform security and legal adherence.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8, duration: 0.6 }} style={{ marginTop: 60, paddingTop: 40, borderTop: '1px solid rgba(139,92,246,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <span className="font-display" style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #7c3aed, #c026d3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            WEB FIXXIES
          </span>
          <div style={{ display: 'flex', gap: 32 }}>
            {['Mission', 'About', 'Projects', 'Pricing', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="font-mono" style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3d3057', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#7c3aed')}
                onMouseLeave={e => (e.currentTarget.style.color = '#3d3057')}>
                {item}
              </a>
            ))}
          </div>
          <span className="font-mono" style={{ fontSize: 9, color: '#2d2040', letterSpacing: '0.15em' }}>© 2025 WEB FIXXIES</span>
        </motion.div>
      </div>
    </section>
  );
}
