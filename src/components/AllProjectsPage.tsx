import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard, projects } from './ProjectsSection';

export default function AllProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: 120,
        paddingBottom: 100,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div className="section-tag" style={{ margin: '0 auto 20px' }}>
            <span className="dot" />Archive
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(40px, 6vw, 64px)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #f8fafc, #a5b4fc, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 16,
            }}
          >
            All Projects
          </h1>
          <p
            style={{
              color: '#64748b',
              fontSize: 15,
              maxWidth: 500,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            A complete log of interactive experiences, 3D sites, and custom brand implementations engineered by the collective.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Back to homepage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: 80 }}
        >
          <a
            href="#"
            className="font-mono"
            style={{
              padding: '12px 30px',
              borderRadius: 100,
              border: '1px solid rgba(99,102,241,0.3)',
              color: '#a5b4fc',
              textDecoration: 'none',
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            ← Return to Home
          </a>
        </motion.div>
      </div>
    </div>
  );
}
