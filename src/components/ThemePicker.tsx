import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onChoose: (dark: boolean) => void;
}

function DarkPreview() {
  return (
    <div style={{
      width: '100%', height: 100, borderRadius: 10, overflow: 'hidden',
      background: '#08080c', border: '1px solid rgba(255,255,255,0.07)',
      position: 'relative',
    }}>
      {/* Subtle radial glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 120, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)', filter: 'blur(18px)' }} />
      {/* Mock nav */}
      <div style={{ position: 'absolute', top: 10, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: 24, height: 6, borderRadius: 3, background: 'rgba(167,139,250,0.7)' }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {[28, 22, 18].map((w, i) => <div key={i} style={{ width: w, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.12)' }} />)}
        </div>
      </div>
      {/* Mock heading */}
      <div style={{ position: 'absolute', top: 34, left: 14, right: 14 }}>
        <div style={{ width: '70%', height: 10, borderRadius: 4, background: 'linear-gradient(90deg, #c4b5fd, #a78bfa)', marginBottom: 6 }} />
        <div style={{ width: '50%', height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)' }} />
      </div>
      {/* Mock button */}
      <div style={{ position: 'absolute', bottom: 12, left: 14, width: 56, height: 16, borderRadius: 8, background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)' }} />
    </div>
  );
}

function LightPreview() {
  return (
    <div style={{
      width: '100%', height: 100, borderRadius: 10, overflow: 'hidden',
      background: '#fafafa', border: '1px solid rgba(0,0,0,0.08)',
      position: 'relative',
    }}>
      {/* Subtle violet bloom */}
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: 100, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(147,51,234,0.1) 0%, transparent 70%)', filter: 'blur(16px)' }} />
      {/* Mock nav */}
      <div style={{ position: 'absolute', top: 10, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: 24, height: 6, borderRadius: 3, background: '#7c3aed' }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {[28, 22, 18].map((w, i) => <div key={i} style={{ width: w, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.1)' }} />)}
        </div>
      </div>
      {/* Mock heading */}
      <div style={{ position: 'absolute', top: 34, left: 14, right: 14 }}>
        <div style={{ width: '70%', height: 10, borderRadius: 4, background: 'linear-gradient(90deg, #1e1b4b, #7c3aed)', marginBottom: 6 }} />
        <div style={{ width: '50%', height: 6, borderRadius: 3, background: 'rgba(0,0,0,0.08)' }} />
      </div>
      {/* Mock button */}
      <div style={{ position: 'absolute', bottom: 12, left: 14, width: 56, height: 16, borderRadius: 8, background: 'linear-gradient(135deg, #6d28d9, #9333ea)' }} />
    </div>
  );
}

export default function ThemePicker({ onChoose }: Props) {
  const [leaving, setLeaving] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<'dark' | 'light' | null>(null);

  const choose = (dark: boolean) => {
    if (leaving) return;
    setLeaving(true);
    localStorage.setItem('wf-theme-v2', dark ? 'dark' : 'light');
    // Small delay so exit animation runs before unmount
    setTimeout(() => onChoose(dark), 320);
  };

  const cards = [
    {
      id: 'dark' as const,
      label: 'Dark',
      sub: 'Obsidian & Violet',
      preview: <DarkPreview />,
      bg: 'rgba(255,255,255,0.04)',
      bgHover: 'rgba(255,255,255,0.08)',
      border: 'rgba(255,255,255,0.08)',
      borderHover: 'rgba(167,139,250,0.5)',
      textColor: '#f0eeff',
      subColor: '#8b8aab',
      accent: '#a78bfa',
    },
    {
      id: 'light' as const,
      label: 'Light',
      sub: 'White & Violet',
      preview: <LightPreview />,
      bg: 'rgba(255,255,255,0.06)',
      bgHover: 'rgba(255,255,255,0.1)',
      border: 'rgba(255,255,255,0.1)',
      borderHover: 'rgba(167,139,250,0.6)',
      textColor: '#f0eeff',
      subColor: '#8b8aab',
      accent: '#c4b5fd',
    },
  ] as const;

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          key="theme-picker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#06060e',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'flex-start',
            padding: '24px 16px',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {/* Background radial glow */}
          <div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600, height: 400, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.14) 0%, transparent 70%)',
            filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
          }} />

          {/* Vertical spacer so content centres on tall screens */}
          <div style={{ flex: '1 1 0', minHeight: 16 }} />

          {/* Logo + headline */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(16px, 3vw, 36px)', position: 'relative', zIndex: 1 }}
          >
            <motion.img
              src="logo.png"
              alt="Web Fixxies"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 'clamp(40px, 8vw, 52px)',
                height: 'clamp(40px, 8vw, 52px)',
                objectFit: 'contain',
                margin: '0 auto 16px',
                filter: 'drop-shadow(0 0 16px rgba(167,139,250,0.5))',
              }}
            />
            <h1 style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 800,
              fontSize: 'clamp(20px, 5vw, 34px)', letterSpacing: '-0.03em',
              color: '#f0eeff', marginBottom: 8, lineHeight: 1,
            }}>
              Welcome to Web Fixxies
            </h1>
            <p style={{
              fontFamily: 'Inter, Space Grotesk, sans-serif',
              fontSize: 'clamp(13px, 3.5vw, 15px)', color: '#8b8aab', lineHeight: 1.6,
            }}>
              How would you like to experience our site?
            </p>
          </motion.div>

          {/* Cards — stack vertically on mobile, side by side on desktop */}
          <div
            className="theme-picker-cards"
            style={{
              display: 'flex',
              flexDirection: window.innerWidth < 600 ? 'column' : 'row',
              gap: 16,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              width: '100%',
              maxWidth: 640,
            }}
          >
            {cards.map((card, i) => {
              const isHovered = hoveredCard === card.id;
              const isMobileLayout = window.innerWidth < 600;
              return (
                <motion.button
                  key={card.id}
                  className="theme-picker-card"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => choose(card.id === 'dark')}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    width: isMobileLayout ? 'min(90vw, 320px)' : 'clamp(200px, 26vw, 260px)',
                    padding: isMobileLayout ? '16px 18px 20px' : '24px 22px 28px',
                    borderRadius: 20,
                    border: `1px solid ${isHovered ? card.borderHover : card.border}`,
                    background: isHovered ? card.bgHover : card.bg,
                    cursor: 'pointer',
                    textAlign: 'left',
                    outline: 'none',
                    flexShrink: 0,
                    transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                    boxShadow: isHovered
                      ? `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px ${card.borderHover}`
                      : '0 4px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Preview thumbnail — smaller on mobile */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ height: isMobileLayout ? 70 : 100, borderRadius: 10, overflow: 'hidden', position: 'relative' }}>
                      {card.preview}
                    </div>
                  </div>

                  {/* Label */}
                  <div style={{
                    fontFamily: 'Outfit, sans-serif', fontWeight: 800,
                    fontSize: 24, letterSpacing: '-0.02em',
                    color: card.textColor, marginBottom: 4,
                  }}>
                    {card.label}
                  </div>

                  {/* Sub */}
                  <div style={{
                    fontFamily: 'Inter, Space Grotesk, sans-serif',
                    fontSize: 12, color: card.subColor, letterSpacing: '0.02em',
                    marginBottom: 16,
                  }}>
                    {card.sub}
                  </div>

                  {/* CTA pill */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: 100,
                    background: isHovered ? 'rgba(124,58,237,0.25)' : 'rgba(124,58,237,0.12)',
                    border: `1px solid ${isHovered ? 'rgba(167,139,250,0.5)' : 'rgba(167,139,250,0.2)'}`,
                    transition: 'background 0.2s, border-color 0.2s',
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: card.accent }} />
                    <span style={{
                      fontFamily: 'Space Mono, monospace', fontSize: 9,
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: card.accent,
                    }}>
                      Choose {card.label}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Footer hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              marginTop: 24, fontFamily: 'Space Mono, monospace',
              fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#44434e', textAlign: 'center', position: 'relative',
            }}
          >
            You can switch anytime using the toggle in the nav
          </motion.p>

          {/* Bottom spacer */}
          <div style={{ flex: '1 1 0', minHeight: 16 }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
