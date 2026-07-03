import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref} style={{ position: 'relative', width: '100%', padding: '120px 24px 80px', overflow: 'hidden', background: 'linear-gradient(180deg, #07080a 0%, #0d0f12 40%, #07080a 100%)' }}>
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(79,70,229,0.09) 0%, rgba(99,102,241,0.04) 40%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-tag" style={{ margin: '0 auto 24px' }}>
            <span className="dot" />Contact
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 20, background: 'linear-gradient(135deg, #f1f5f9 0%, #a5b4fc 40%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Let's Build Something Extraordinary
          </h2>
          <p style={{ maxWidth: 560, margin: '0 auto', fontSize: 15, color: '#64748b', lineHeight: 1.8, fontWeight: 300 }}>
            Got a vision? We've got the expertise. Every project is custom-built for impact. Reach out and we'll respond within 24 hours.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="glow-border" style={{ borderRadius: 24, padding: '3px', marginBottom: 32 }}>
          <div style={{ borderRadius: 22, padding: 'clamp(34px, 6vw, 64px) clamp(20px, 5vw, 48px)', background: 'rgba(7,8,10,0.97)', backdropFilter: 'blur(40px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <motion.div animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
            <motion.div animate={{ rotate: [360, 0], scale: [1, 1.15, 1] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', bottom: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 72, height: 72, borderRadius: '50%', margin: '0 auto 32px', background: 'radial-gradient(circle at 35% 35%, rgba(129,140,248,0.35), rgba(79,70,229,0.08))', border: '1px solid rgba(129,140,248,0.25)', boxShadow: '0 0 40px rgba(79,70,229,0.35), inset 0 0 20px rgba(79,70,229,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>

            <p style={{ fontSize: 13, color: '#475569', fontFamily: 'Space Mono, monospace', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Direct Line</p>

            <a
              href="mailto:webfixxies@gmail.com"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '18px 40px', borderRadius: 100, border: '1px solid rgba(129,140,248,0.25)', background: 'linear-gradient(135deg, rgba(79,70,229,0.12), rgba(99,102,241,0.06))', color: '#a5b4fc', fontSize: 'clamp(13px, 2vw, 17px)', fontFamily: 'Space Mono, monospace', letterSpacing: '0.08em', textDecoration: 'none', position: 'relative', overflow: 'hidden', boxShadow: '0 0 40px rgba(79,70,229,0.18)', transition: 'all 0.3s ease', cursor: 'pointer', marginBottom: 40, maxWidth: '100%', textAlign: 'center', flexWrap: 'wrap' }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = 'rgba(129,140,248,0.5)'; el.style.boxShadow = '0 0 60px rgba(79,70,229,0.35)'; el.style.color = '#f1f5f9'; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = 'rgba(129,140,248,0.25)'; el.style.boxShadow = '0 0 40px rgba(79,70,229,0.18)'; el.style.color = '#a5b4fc'; }}
            >
              <motion.span animate={{ x: ['-150%', '150%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }} style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(129,140,248,0.12), transparent)', pointerEvents: 'none' }} />
              <span style={{ position: 'relative', zIndex: 1 }}>webfixxies@gmail.com</span>
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'relative', zIndex: 1 }}>→</motion.span>
            </a>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, maxWidth: 560, margin: '0 auto', position: 'relative' }}>
              {[{ label: 'Response Time', value: '< 24 hrs', icon: '⚡' }, { label: 'Project Scope', value: 'Custom', icon: '⬡' }, { label: 'Coverage', value: 'Global', icon: '◈' }].map((item) => (
                <div key={item.label} style={{ padding: '16px', borderRadius: 12, border: '1px solid rgba(99,102,241,0.1)', background: 'rgba(79,70,229,0.04)', textAlign: 'center' }}>
                  <div style={{ fontSize: 18, marginBottom: 6 }}>{item.icon}</div>
                  <div className="font-mono" style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#475569', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Outfit, sans-serif', background: 'linear-gradient(135deg, #818cf8, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6, duration: 0.6 }} className="font-mono" style={{ textAlign: 'center', fontSize: 9, letterSpacing: '0.18em', color: '#1e293b', textTransform: 'uppercase', lineHeight: 2, maxWidth: 700, margin: '0 auto' }}>
          Professional partnerships with transparent agreements. No surprises—just results.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8, duration: 0.6 }} style={{ marginTop: 60, paddingTop: 40, borderTop: '1px solid rgba(99,102,241,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flex: '1 1 220px' }}>
            <img src="logo.png" alt="Web Fixxies" style={{ width: 28, height: 28, objectFit: 'contain', filter: 'drop-shadow(0 0 4px rgba(99,102,241,0.4))' }} />
            <span className="font-display" style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #4f46e5, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              WEB FIXXIES
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', flex: '2 1 320px' }}>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', rowGap: 10 }}>
              {['Mission', 'About', 'Projects', 'Pricing', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="font-mono" style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#334155', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#6366f1')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#334155')}>
                  {item}
                </a>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { name: 'Facebook', url: 'https://www.facebook.com/people/Webfixxies/61591612619072/?sk=about', icon: FaFacebook },
                { name: 'Instagram', url: 'https://www.instagram.com/webfixxiesco/', icon: FaInstagram },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/company/webfixxies', icon: FaLinkedin }
              ].map(social => {
                const Icon = social.icon;
                return (
                  <motion.a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, color: '#a5b4fc' }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(99,102,241,0.3)', color: '#6366f1', textDecoration: 'none', transition: 'all 0.3s', cursor: 'pointer', background: 'rgba(99,102,241,0.05)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(165,180,252,0.5)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(165,180,252,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>
          <span className="font-mono" style={{ fontSize: 9, color: '#1e293b', letterSpacing: '0.15em', textAlign: 'center', flex: '1 1 220px' }}>© 2026 WEB FIXXIES</span>
        </motion.div>
      </div>
    </section>
  );
}
