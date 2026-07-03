import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from './ProjectsSection';

type Project = typeof projects[0];

// A minimal aesthetic card for the "See all projects" page
function MinimalProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      whileHover={{ y: -5, boxShadow: `0 15px 40px ${project.glow}` }}
      style={{
        borderRadius: 20,
        background: `linear-gradient(145deg, rgba(10,5,25,0.9), rgba(5,2,15,0.95))`,
        border: `1px solid ${project.accent}30`,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '30px 24px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 32 }}>{project.icon}</div>
          <div
            className="font-mono"
            style={{
              fontSize: 9,
              color: `${project.accent}bb`,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              background: `${project.accent}15`,
              padding: '4px 10px',
              borderRadius: 100,
            }}
          >
            {project.by}
          </div>
        </div>

        <h3
          className="font-display"
          style={{ fontSize: 22, fontWeight: 800, color: '#f8fafc', marginBottom: 6 }}
        >
          {project.name}
        </h3>

        <p
          className="font-mono"
          style={{
            fontSize: 10,
            color: project.accent,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 16,
          }}
        >
          {project.subtitle}
        </p>

        <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, marginBottom: 24 }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {project.tags.map(t => (
            <span
              key={t}
              className="font-mono"
              style={{
                fontSize: 8,
                padding: '3px 8px',
                borderRadius: 4,
                background: '#1e293b',
                color: '#cbd5e1',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(0,0,0,0.2)',
          display: 'flex',
          gap: 10,
        }}
      >
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '10px 0',
              borderRadius: 8,
              background: project.accent,
              color: '#fff',
              fontSize: 11,
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}
          >
            Open Live ↗
          </a>
        )}
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '10px 0',
            borderRadius: 8,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            fontSize: 11,
            fontWeight: 600,
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}
        >
          Source
        </a>
      </div>
    </motion.div>
  );
}

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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          {projects.map((project, i) => (
            <MinimalProjectCard key={project.id} project={project} index={i} />
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
