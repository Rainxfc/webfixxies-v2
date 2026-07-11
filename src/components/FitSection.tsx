import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../App';

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
  const { dark } = useTheme();

  return (
    <section
      id="fit"
      ref={ref}
      className="section-bg"
      style={{
        position: 'relative',
        width: '100%',
        padding: '140px 24px 140px',
        overflow: 'hidden',
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
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              marginBottom: 24,
            }}
          >
            <span className={`section-heading-grad ${!dark ? 'section-heading-light' : ''}`} style={{ display: 'block' }}>
              Are We The Right
            </span>
            <span className={`section-heading-grad-alt ${!dark ? 'section-heading-alt-light' : ''}`} style={{ display: 'block' }}>
              Fit For You?
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ maxWidth: 540, margin: '0 auto', fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.9, fontWeight: 400 }}
          >
            We work with a select number of clients at any one time. Knowing who we build for — and who we don't — saves everyone time.
          </motion.p>
        </motion.div>

        {/* Two-column split */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {/* FOR column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
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
                    background: 'var(--grad-fit-card)',
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
                      <div className="font-display" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.01em' }}>
                        {item.title}
                      </div>
                      <div className="fit-card-detail" style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 400 }}>
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
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
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
                    background: 'var(--grad-fit-not)',
                    transition: 'border-color 0.3s',
                    cursor: 'default',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <span style={{ fontSize: 16, color: '#ef4444', flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                    <div>
                      <div className="font-display" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '-0.01em' }}>
                        {item.title}
                      </div>
                      <div className="fit-card-detail" style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 400 }}>
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
              <div className="font-display" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10 }}>
                Still unsure?
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 18 }}>
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
            className="fit-pull-quote"
            style={{
              display: 'inline-block',
              padding: 'clamp(20px, 4vw, 32px) clamp(16px, 5vw, 48px)',
              borderRadius: 20,
              border: '1px solid rgba(124,58,237,0.15)',
              background: 'rgba(99,102,241,0.04)',
              maxWidth: 680,
              width: '100%',
            }}
          >
            <div style={{ fontSize: 'clamp(17px, 2.2vw, 22px)', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.65, fontWeight: 400, marginBottom: 20 }}>
              "We don't build websites. We build the first impression your brand will never get back."
            </div>
            <div className="font-mono" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              — Web Fixxies
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
