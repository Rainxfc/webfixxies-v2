import { useRef } from 'react';
import { navTo } from '../utils/navigation';
import { motion, useInView } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useTheme } from '../App';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { dark } = useTheme();

  return (
    <section id="contact" ref={ref} className="section-bg" style={{ position: 'relative', width: '100%', padding: '120px 24px 80px', overflow: 'hidden' }}>
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-tag" style={{ margin: '0 auto 24px' }}>
            <span className="dot" />Contact
          </div>
          <h2 className={`font-display section-heading-grad ${!dark ? 'section-heading-light' : ''}`} style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: 20 }}>
            Ready to Get Started?
          </h2>
          <p style={{ maxWidth: 520, margin: '0 auto', fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.85, fontWeight: 400, letterSpacing: '0.01em' }}>
            Tell us about your project and we'll get back to you within 24 hours. No obligation, no pressure — just a friendly chat about what you need.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="glow-border" style={{ borderRadius: 24, padding: '3px', marginBottom: 32 }}>
          <div style={{ borderRadius: 22, padding: 'clamp(34px, 6vw, 64px) clamp(20px, 5vw, 48px)', background: 'var(--bg-contact-inner)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <motion.div animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
            <motion.div animate={{ rotate: [360, 0], scale: [1, 1.15, 1] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', bottom: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 72, height: 72, borderRadius: '50%', margin: '0 auto 32px', background: 'radial-gradient(circle at 35% 35%, rgba(167,139,250,0.35), rgba(124,58,237,0.08))', border: '1px solid rgba(167,139,250,0.25)', boxShadow: '0 0 40px rgba(124,58,237,0.35), inset 0 0 20px rgba(124,58,237,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>

            <p style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Space Mono, monospace', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Direct Line</p>

            <a
              href="mailto:webfixxies@gmail.com"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 'clamp(14px, 3vw, 18px) clamp(16px, 5vw, 40px)', borderRadius: 100, border: '1px solid var(--border-mid)', background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(139,92,246,0.06))', color: 'var(--text-secondary)', fontSize: 'clamp(12px, 3.5vw, 17px)', fontFamily: 'Space Mono, monospace', letterSpacing: '0.05em', textDecoration: 'none', position: 'relative', overflow: 'hidden', boxShadow: '0 0 40px rgba(124,58,237,0.18)', transition: 'all 0.3s ease', cursor: 'pointer', marginBottom: 40, maxWidth: '100%', width: '100%', textAlign: 'center', flexWrap: 'wrap', wordBreak: 'break-all' }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = 'rgba(167,139,250,0.5)'; el.style.boxShadow = '0 0 60px rgba(124,58,237,0.35)'; el.style.color = 'var(--text-primary)'; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = 'var(--border-mid)'; el.style.boxShadow = '0 0 40px rgba(124,58,237,0.18)'; el.style.color = 'var(--text-secondary)'; }}
            >
              <motion.span animate={{ x: ['-150%', '150%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }} style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.12), transparent)', pointerEvents: 'none' }} />
              <span style={{ position: 'relative', zIndex: 1 }}>webfixxies@gmail.com</span>
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'relative', zIndex: 1 }}>→</motion.span>
            </a>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, width: '100%', maxWidth: '100%', margin: '0 auto', position: 'relative' }}>
              {[
                { label: 'We Reply In', value: '< 24 hrs', icon: '⚡' },
                { label: 'Pricing',     value: 'Custom',   icon: '⬡' },
                { label: 'We Work With',value: 'Everyone', icon: '◈' }
              ].map((item) => (
                <div key={item.label} style={{
                  padding: '20px 8px 18px',
                  borderRadius: 12,
                  border: '1px solid var(--border-mid)',
                  background: 'var(--section-gradient-a)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 7,
                  minWidth: 0,
                  overflow: 'hidden',
                }}>
                  <div style={{ fontSize: 22, lineHeight: 1 }}>{item.icon}</div>
                  <div style={{
                    fontSize: 9,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    fontFamily: 'Space Mono, monospace',
                    lineHeight: 1.4,
                    width: '100%',
                    textAlign: 'center',
                  }}>
                    {item.label}
                  </div>
                  <div className={`contact-stat-value ${dark ? '' : 'contact-stat-light'}`} style={{
                    fontSize: 'clamp(15px, 2.5vw, 20px)',
                    fontWeight: 800,
                    fontFamily: 'Outfit, sans-serif',
                    lineHeight: 1,
                  }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6, duration: 0.6 }} style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-muted)', lineHeight: 2, maxWidth: 700, margin: '0 auto' }}>
          We work openly, communicate clearly, and always deliver what we promise.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8, duration: 0.6 }} style={{ marginTop: 60, paddingTop: 40, borderTop: '1px solid var(--border-subtle)' }}>
          {/* Footer top row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="logo.png" alt="Web Fixxies" style={{ width: 30, height: 30, objectFit: 'contain', filter: 'drop-shadow(0 0 4px rgba(124,58,237,0.4))' }} />
              <span className="font-display" style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                WEB FIXXIES
              </span>
            </div>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              {[
                { name: 'Facebook', url: 'https://www.facebook.com/people/Webfixxies/61591612619072/?sk=about', icon: FaFacebook },
                { name: 'Instagram', url: 'https://www.instagram.com/webfixxiesco/', icon: FaInstagram },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/company/webfixxies', icon: FaLinkedin }
              ].map(social => {
                const Icon = social.icon;
                return (
                  <motion.a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.15 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: '50%', border: '1px solid var(--border-mid)', color: 'var(--violet-bright)', textDecoration: 'none', transition: 'all 0.3s', background: 'var(--section-gradient-a)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(139,92,246,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Footer nav links */}
          <div style={{ display: 'flex', gap: 'clamp(16px, 4vw, 36px)', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}>
            {['About', 'Mission', 'Projects', 'Pricing', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={(e) => { e.preventDefault(); navTo(item.toLowerCase()); }} className="font-mono"
                style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s', fontWeight: 600 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#a78bfa')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                {item}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div style={{ textAlign: 'center' }}>
            <span className="font-mono" style={{ fontSize: 10, color: 'var(--text-faint)', letterSpacing: '0.15em' }}>© 2026 WEB FIXXIES — ALL RIGHTS RESERVED</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
