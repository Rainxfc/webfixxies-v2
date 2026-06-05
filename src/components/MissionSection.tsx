import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

function InteractiveTerminal() {
  const [view, setView] = useState<'legacy' | 'premium'>('legacy');
  const [animating, setAnimating] = useState(false);
  const [selectedTool, setSelectedTool] = useState('diagnose');
  const [output, setOutput] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState('');

  const handleTransform = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setView(v => v === 'legacy' ? 'premium' : 'legacy');
      setAnimating(false);
    }, 400);
  };

  const handleRun = () => {
    if (!selectedDevice) {
      setOutput('⚠ E_NO_DEVICE: Select a target device first.');
      setTimeout(() => setOutput(null), 3000);
      return;
    }
    setOutput(`↯ Running ${selectedTool} on ${selectedDevice}...`);
    setTimeout(() => {
      setOutput(`✓ ${selectedTool.toUpperCase()} completed on ${selectedDevice}. Status: OPTIMAL`);
      setTimeout(() => setOutput(null), 3000);
    }, 900);
  };

  return (
    <div style={{
      width: '100%', maxWidth: 560, marginTop: 40, borderRadius: 16,
      border: '1px solid rgba(139,92,246,0.2)', overflow: 'hidden',
      background: 'rgba(8, 0, 22, 0.9)', backdropFilter: 'blur(20px)',
      boxShadow: '0 0 60px rgba(124,58,237,0.2), 0 0 0 1px rgba(139,92,246,0.1)',
    }}>
      {/* Terminal bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', borderBottom: '1px solid rgba(139,92,246,0.15)',
        background: 'rgba(20,0,50,0.8)',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ef4444','#f59e0b','#10b981'].map((c,i) => (
            <span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
        </div>
        <div className="font-mono" style={{ fontSize: 9, color: 'rgba(167,139,250,0.6)', letterSpacing: '0.2em' }}>
          webfixxies.dev/optimize/{view}
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={handleTransform} style={{
          padding: '3px 10px', borderRadius: 6, border: '1px solid rgba(124,58,237,0.4)',
          background: 'rgba(124,58,237,0.15)', color: '#a78bfa', fontSize: 9,
          fontFamily: 'Space Mono, monospace', letterSpacing: '0.1em', cursor: 'pointer',
        }}>
          {view === 'legacy' ? '⚡ UPGRADE' : '← REVERT'}
        </motion.button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {view === 'legacy' ? (
          <motion.div key="legacy" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} style={{ padding: 20, fontFamily: 'Space Mono, monospace', fontSize: 11 }}>
            <div style={{ color: '#6b7280', fontSize: 10, marginBottom: 12, letterSpacing: '0.15em' }}>
              // LEGACY SYSTEM — PERFORMANCE DEGRADED
            </div>
            {[
              { k: 'sched_rt_runtime_us', v: '950000', note: '⚠ deprecated' },
              { k: 'vm.swappiness', v: '10', note: '⚠ memory pressure' },
              { k: 'cpu.max', v: 'max 100000', note: '⚠ nested group' },
            ].map((row) => (
              <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', marginBottom: 6, background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 6 }}>
                <span style={{ color: '#9ca3af' }}>{row.k}</span>
                <span style={{ color: '#ef4444', fontSize: 10 }}>{row.v}</span>
                <span style={{ color: '#6b7280', fontSize: 9 }}>{row.note}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, color: '#4b5563', fontSize: 10 }}>→ Manual review required. System unstable.</div>
          </motion.div>
        ) : (
          <motion.div key="premium" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} style={{ padding: 20, fontFamily: 'Space Mono, monospace', fontSize: 11 }}>
            <div style={{ color: '#a78bfa', fontSize: 10, marginBottom: 12, letterSpacing: '0.15em' }}>// PREMIUM INTERFACE — FULLY OPTIMIZED ✓</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              {[{ label: 'RUNTIME', value: '95%', color: '#a78bfa' }, { label: 'MEMORY', value: 'STABLE', color: '#10b981' }].map(s => (
                <div key={s.label} style={{ padding: '10px 12px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 8 }}>
                  <div style={{ color: '#6b7280', fontSize: 9, letterSpacing: '0.2em', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ color: s.color, fontSize: 14, fontWeight: 700 }}>{s.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
              {['diagnose','refactor','deploy'].map(t => (
                <button key={t} onClick={() => setSelectedTool(t)} style={{ flex: 1, padding: '6px 4px', borderRadius: 6, border: selectedTool === t ? '1px solid rgba(167,139,250,0.5)' : '1px solid rgba(139,92,246,0.15)', background: selectedTool === t ? 'rgba(124,58,237,0.2)' : 'transparent', color: selectedTool === t ? '#a78bfa' : '#6b7280', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase' as const, cursor: 'pointer' }}>
                  {t}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <select value={selectedDevice} onChange={e => setSelectedDevice(e.target.value)} style={{ flex: 1, padding: '6px 10px', background: 'rgba(20,0,50,0.8)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 6, color: '#c4b5fd', fontSize: 11, fontFamily: 'Space Mono, monospace' }}>
                <option value="">Select device...</option>
                <option value="edge-01">edge-01</option>
                <option value="node-22">node-22</option>
                <option value="vm-prod-3">vm-prod-3</option>
              </select>
              <button onClick={handleRun} style={{ padding: '6px 14px', background: 'linear-gradient(135deg, #7c3aed, #c026d3)', border: 'none', borderRadius: 6, color: '#fff', fontSize: 10, fontFamily: 'Space Mono, monospace', cursor: 'pointer', letterSpacing: '0.1em' }}>
                RUN
              </button>
            </div>
            <AnimatePresence>
              {output && (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ padding: '8px 12px', borderRadius: 6, fontSize: 10, background: output.startsWith('✓') ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${output.startsWith('✓') ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, color: output.startsWith('✓') ? '#10b981' : '#ef4444' }}>
                  {output}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ height: 2, background: 'rgba(124,58,237,0.1)' }}>
        <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} style={{ height: '100%', width: '40%', background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)' }} />
      </div>
    </div>
  );
}

const problems = [
  { tag: 'Broken Navigation', title: 'Broken navigation is the baseline problem.', body: 'We are generationally native digital builders who understand that modern web journeys are failing. In an era shaped by LLMs and instant answers, legacy websites act like data graveyards: stale, buried, and frustratingly hard to traverse.', icon: '⬡', color: '#7c3aed', glow: 'rgba(124,58,237,0.15)' },
  { tag: 'Template Fatigue', title: 'Generic templates are killing distinction.', body: 'Most websites still look interchangeable, leaning on safe layouts that say nothing memorable about the brand behind them. We build spatial, high-end interfaces that feel intentional, premium, and unmistakably custom.', icon: '◈', color: '#c026d3', glow: 'rgba(192,38,211,0.15)' },
  { tag: 'Access Gap', title: 'Design quality should not be gatekept.', body: 'Coming from a region where advanced graphic design is often trapped behind massive agency premiums, we see too many local businesses neglect their digital storefronts entirely. That gap should not exist.', icon: '◆', color: '#4f46e5', glow: 'rgba(79,70,229,0.15)' },
];

export default function MissionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="mission" ref={ref} style={{ position: 'relative', width: '100%', padding: '120px 24px', overflow: 'hidden', background: 'linear-gradient(180deg, #04000d 0%, #080016 50%, #04000d 100%)' }}>
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,38,211,0.07) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px 48px', alignItems: 'start' }}>
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <div className="section-tag" style={{ marginBottom: 24 }}>
              <span className="dot" />Mission
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24, color: '#f5f0ff' }}>
              We build the web so it feels{' '}
              <span style={{ background: 'linear-gradient(135deg, #a78bfa, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                immediate, premium &amp; effortless.
              </span>
            </h2>
            <p style={{ color: '#9d8fb5', fontSize: 15, lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>
              Web Fixxies exists to correct the experience layer of modern browsing. We engineer visually stunning, fluid spatial architectures for brands that need more than a template.
            </p>
            <p style={{ color: '#6b5d80', fontSize: 14, lineHeight: 1.8, fontWeight: 300 }}>
              Our mission is to make advanced digital presence accessible at a fraction of enterprise cost, giving local businesses and ambitious teams the level of polish that used to be locked behind agency premiums.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32 }}>
              {['Performance First', 'Spatial Storytelling', 'Accessible Premium'].map(tag => (
                <span key={tag} className="font-mono" style={{ padding: '6px 14px', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 100, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7c6a99', background: 'rgba(124,58,237,0.05)' }}>
                  {tag}
                </span>
              ))}
            </div>
            <InteractiveTerminal />
          </motion.div>

          {/* Right */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {problems.map((p, i) => (
              <motion.div key={p.tag}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.01 }}
                style={{ padding: '28px', borderRadius: 16, border: '1px solid rgba(139,92,246,0.12)', background: 'rgba(13,0,31,0.8)', backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden', cursor: 'default' }}
              >
                <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${p.glow} 0%, transparent 70%)`, filter: 'blur(20px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`, opacity: 0.5 }} />
                <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: p.color, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{p.icon}</span>{p.tag}
                </div>
                <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#f5f0ff', marginBottom: 12, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: '#7c6a99', lineHeight: 1.75, fontWeight: 300 }}>{p.body}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="glow-border"
              style={{ padding: '32px 28px', borderRadius: 16, position: 'relative', overflow: 'hidden', background: 'rgba(13,0,31,0.9)' }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top left, rgba(124,58,237,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
              <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7c3aed', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'inline-block', width: 24, height: 1, background: 'linear-gradient(90deg, #7c3aed, #c026d3)' }} />
                Our Mission
              </div>
              <p className="font-display" style={{ fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 600, lineHeight: 1.5, color: '#f5f0ff', position: 'relative' }}>
                We disrupt that cycle by delivering high-performance, visually stunning, fluid spatial web architectures at a fraction of enterprise cost, making advanced digital presence accessible to the businesses that need it most.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
