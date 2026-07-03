import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FOR_US = [
  {
    icon: '◈',
    title: 'You want a premium product',
    detail: 'Your site should feel as premium as your brand. We build experiences that stop people mid-scroll.',
  },
  {
    icon: '◉',
    title: 'Results matter more than hours',
    detail: 'You care about conversion, retention, and impression — not about how many meetings it takes to get there.',
  },
  {
    icon: '◆',
    title: 'You trust the craft',
    detail: 'You bring the vision. We execute with precision. The partnership works because you let experts be experts.',
  },
  {
    icon: '⬡',
    title: 'You value aesthetic AND function',
    detail: 'Beautiful and broken is worthless. Fast and ugly is forgettable. We refuse to compromise on either.',
  },
];

const NOT_FOR_US = [
  {
    icon: '✕',
    title: 'You want to micromanage every pixel',
    detail: 'We partner, not execute orders. If you need to approve every font tweak, we\'re not the right fit.',
  },
  {
    icon: '✕',
    title: 'You\'re chasing the lowest price',
    detail: 'Premium work costs what it costs. We don\'t race to the bottom — we build things that last.',
  },
  {
    icon: '✕',
    title: 'You need it done overnight',
    detail: 'Great work takes intention. We move fast but we never sacrifice quality for a deadline.',
  },
];

export default function FitSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="fit"
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        padding: '140px 24px 140px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #07080a 0%, #0a0b10 50%, #07080a 100%)',
      }}
    >
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: '20%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 90 }}
        >
          <div className="section-tag" style={{ margin: '0 auto 24px' }}>
            <span className="dot" />Fit
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(38px, 6vw, 72px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              marginBottom: 24,
            }}
          >
            <span style={{ display: 'block', background: 'linear-gradient(135deg, #f8fafc 0%, #c4b5fd 50%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Are We The Right
            </span>
            <span style={{ display: 'block', background: 'linear-gradient(135deg, #818cf8, #a78bfa, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Fit For You?
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ maxWidth: 540, margin: '0 auto', fontSize: 15, color: '#64748b', lineHeight: 1.85, fontWeight: 300 }}
          >
            We work with a select number of clients at any one time. Knowing who we build for — and who we don't — saves everyone time.
          </motion.p>
        </motion.div>

        {/* Two-column split */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {/* FOR column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: 9,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#6366f1',
                marginBottom: 28,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 8px #6366f1' }}
              />
              Web Fixxies is for you if
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {FOR_US.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  whileHover={{ x: 4 }}
                  style={{
                    borderRadius: 16,
                    padding: '22px 24px',
                    border: '1px solid rgba(99,102,241,0.15)',
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(4,0,13,0.9) 100%)',
                    backdropFilter: 'blur(12px)',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(99,102,241,0.4)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 30px rgba(99,102,241,0.12)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(99,102,241,0.15)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <span style={{ fontSize: 18, color: '#6366f1', flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                    <div>
                      <div className="font-display" style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0', marginBottom: 6, letterSpacing: '-0.01em' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, fontWeight: 300 }}>
                        {item.detail}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* NOT FOR column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: 9,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#ef4444',
                marginBottom: 28,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px #ef4444' }}
              />
              Probably not for you if
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {NOT_FOR_US.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  style={{
                    borderRadius: 16,
                    padding: '22px 24px',
                    border: '1px solid rgba(239,68,68,0.1)',
                    background: 'linear-gradient(135deg, rgba(239,68,68,0.04) 0%, rgba(4,0,13,0.9) 100%)',
                    backdropFilter: 'blur(12px)',
                    transition: 'border-color 0.3s',
                    cursor: 'default',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <span style={{ fontSize: 16, color: '#ef4444', flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                    <div>
                      <div className="font-display" style={{ fontSize: 15, fontWeight: 700, color: '#94a3b8', marginBottom: 6, letterSpacing: '-0.01em' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.7, fontWeight: 300 }}>
                        {item.detail}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Still unsure? */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{
                marginTop: 24,
                borderRadius: 16,
                padding: '24px',
                background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(99,102,241,0.06))',
                border: '1px solid rgba(124,58,237,0.2)',
              }}
            >
              <div className="font-display" style={{ fontSize: 15, fontWeight: 700, color: '#c4b5fd', marginBottom: 8 }}>
                Still unsure?
              </div>
              <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, marginBottom: 16 }}>
                Drop us an email. No pitch, no pressure — just an honest conversation about what you actually need.
              </div>
              <a
                href="mailto:webfixxies@gmail.com"
                className="font-mono"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 9,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#818cf8',
                  textDecoration: 'none',
                }}
              >
                Get in touch →
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          style={{ textAlign: 'center', marginTop: 90 }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '32px 48px',
              borderRadius: 20,
              border: '1px solid rgba(124,58,237,0.15)',
              background: 'rgba(99,102,241,0.04)',
              maxWidth: 680,
            }}
          >
            <div style={{ fontSize: 'clamp(16px, 2vw, 21px)', color: '#c4b5fd', fontStyle: 'italic', lineHeight: 1.6, fontWeight: 300, marginBottom: 20 }}>
              "We don't build websites. We build the first impression your brand will never get back."
            </div>
            <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.4)' }}>
              — Web Fixxies
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
