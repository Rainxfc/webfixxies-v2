import { useEffect } from 'react';
import { navTo } from '../utils/navigation';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectsSection';
import { projects } from '../data/projectsData';

export default function AllProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: 100,
        paddingBottom: 120,
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Ambient background glows */}
      <div style={{ position: 'fixed', top: '20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '10%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)', position: 'relative', zIndex: 1 }}>

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          {/* Back link */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              marginBottom: 36,
              color: 'rgba(129,140,248,0.5)',
              textDecoration: 'none',
              fontFamily: 'Space Mono, monospace',
              fontSize: 9,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#818cf8')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(129,140,248,0.5)')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M5 12l7 7M5 12l7-7"/>
            </svg>
            Back to Home
          </motion.a>

          <div className="section-tag" style={{ margin: '0 auto 24px' }}>
            <span className="dot" />All Work
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              background: 'linear-gradient(135deg, #f8fafc 0%, #c4b5fd 45%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 20,
            }}
          >
            All Projects
          </h1>

          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: 'clamp(13px, 1.6vw, 15px)',
              maxWidth: 520,
              maxWidth: 520,
              margin: '0 auto',
              lineHeight: 1.75,
              fontWeight: 300,
            }}
          >
            Every project built by the Web Fixxies collective — each preview is fully interactive. Click inside any frame to explore the live site.
          </p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 36, flexWrap: 'wrap' }}
          >
            {[
              { label: 'Projects', value: projects.length },
              { label: 'Live Deploys', value: projects.filter(p => p.liveUrl).length },
              { label: 'Interactive Previews', value: projects.filter(p => p.iframeSrc).length },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                style={{ textAlign: 'center' }}
              >
                <div className="font-display" style={{ fontSize: 28, fontWeight: 900, background: 'linear-gradient(135deg, #a78bfa, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div className="font-mono" style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 4 }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Project cards (all 4, each with live preview) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} compact />
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: 100, paddingTop: 60, borderTop: '1px solid rgba(99,102,241,0.08)' }}
        >
          <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 24 }}>
            Want a site like these?
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); navTo('contact'); }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(79,70,229,0.35)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '14px 36px', borderRadius: 100,
                background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                color: '#fff', fontSize: 10, fontFamily: 'Space Mono, monospace',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                textDecoration: 'none', boxShadow: '0 0 28px rgba(79,70,229,0.3)',
              }}
            >
              Get In Touch ↗
            </motion.a>
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '13px 36px', borderRadius: 100,
                border: '1px solid rgba(99,102,241,0.3)',
                color: 'var(--text-secondary)', fontSize: 10, fontFamily: 'Space Mono, monospace',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              ← Return to Home
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
