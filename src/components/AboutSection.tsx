import { useRef } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const team = [
  {
    name: 'VEX', realName: 'Ibrahim',
    role: 'Design Principal & UI/UX Architect',
    copy: 'The architectural core of Web Fixxies. Vex drives the macro UI/UX vision, engineering layouts that forcefully capture enterprise retention. Master of structural typography, component scaling, and high-fidelity wireframing.',
    img: 'vexpfp.png',
    accent: '#a78bfa', accentDark: '#7c3aed',
    glow: 'rgba(124,58,237,0.3)', glowSoft: 'rgba(124,58,237,0.08)',
    tag: 'DESIGN', icon: '◈', index: 0,
  },
  {
    name: 'RAIN', realName: 'Ibrahim',
    role: 'Technical Director & Spatial Engineer',
    copy: 'The hardware executor. Rain bridges visionary design with raw browser performance, building out structural React components, framer-motion physics, and three-dimensional spatial environments optimized for high-refresh rates.',
    img: 'rainpfp.jpg',
    accent: '#818cf8', accentDark: '#4f46e5',
    glow: 'rgba(79,70,229,0.3)', glowSoft: 'rgba(79,70,229,0.08)',
    tag: 'ENGINEERING', icon: '⬡', index: 1,
  },
  {
    name: 'ARSENIC', realName: 'Ahnaf',
    role: 'Growth Strategist & Client Relations',
    copy: 'The strategic conduit. Arsenic aligns advanced engineering capabilities with enterprise business growth. Fluent in international project deployment, cross-border client operations, and ensuring strict adherence to compliance standards.',
    img: 'arsenicpfp.png',
    accent: '#e879f9', accentDark: '#c026d3',
    glow: 'rgba(192,38,211,0.3)', glowSoft: 'rgba(192,38,211,0.08)',
    tag: 'STRATEGY', icon: '◆', index: 2,
  },
];

type TeamMember = typeof team[0];

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1200} scale={1.01} transitionSpeed={1500} glareEnable={true} glareMaxOpacity={0.08} glareColor={member.accent} glarePosition="all">
        <div className="team-card" style={{ padding: '36px', borderRadius: 20, border: '1px solid rgba(139,92,246,0.15)', background: `linear-gradient(135deg, rgba(13,0,31,0.95), ${member.glowSoft})`, backdropFilter: 'blur(30px)', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg, transparent, ${member.accent}, transparent)`, opacity: 0.6 }} />
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${member.glow} 0%, transparent 70%)`, filter: 'blur(30px)', pointerEvents: 'none', opacity: 0.6 }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${member.glowSoft} 0%, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />

          <div className="team-card-inner" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ flexShrink: 0 }}>
              <div style={{ width: 100, height: 100, borderRadius: 16, border: `2px solid ${member.accent}33`, overflow: 'hidden', background: '#0d001f', boxShadow: `0 0 30px ${member.glow}`, position: 'relative' }}>
                <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.2) saturate(1.1)' }}
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${member.name}`; }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 60%, ${member.glowSoft} 100%)` }} />
              </div>
              <div className="font-mono" style={{ marginTop: 10, padding: '4px 8px', borderRadius: 6, background: `${member.accentDark}22`, border: `1px solid ${member.accent}33`, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: member.accent, textAlign: 'center' }}>
                {member.tag}
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="team-member-name-row">
                <h3 className="font-display" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', color: '#f5f0ff', lineHeight: 1 }}>{member.name}</h3>
                <span className="font-mono" style={{ fontSize: 11, color: '#4d3a6e', letterSpacing: '0.05em' }}>{member.realName}</span>
              </div>
              <div style={{ fontSize: 11, color: member.accent, fontFamily: 'Space Mono, monospace', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>{member.role}</div>
              <div style={{ height: 1, background: `linear-gradient(90deg, ${member.accent}22, transparent)`, marginBottom: 16 }} />
              <p style={{ fontSize: 13, color: '#7c6a99', lineHeight: 1.75, fontWeight: 300 }}>{member.copy}</p>
              <div style={{ display: 'flex', gap: 6, marginTop: 20, alignItems: 'center' }}>
                {[0.9, 0.75, 0.6, 0.45].map((v, i) => (
                  <div key={i} style={{ height: 3, width: 28 * v, borderRadius: 2, background: `linear-gradient(90deg, ${member.accent}, ${member.accentDark})`, opacity: v }} />
                ))}
                <span className="font-mono" style={{ fontSize: 9, color: '#4d3a6e', letterSpacing: '0.15em', marginLeft: 4 }}>PROFICIENCY</span>
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 20, right: 24, fontFamily: 'Outfit, sans-serif', fontSize: 64, fontWeight: 900, color: `${member.accent}08`, lineHeight: 1, userSelect: 'none', letterSpacing: '-0.05em' }}>
            0{member.index + 1}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="about" ref={ref} style={{ position: 'relative', width: '100%', padding: '120px 24px', overflow: 'hidden', background: 'linear-gradient(180deg, #04000d 0%, #0d001f 50%, #04000d 100%)' }}>
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(80px, 18vw, 220px)', letterSpacing: '-0.06em', color: 'rgba(124,58,237,0.03)', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none' }}>
        THE MATRIX
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="section-tag" style={{ margin: '0 auto 24px' }}>
            <span className="dot" />The Collective
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 20, background: 'linear-gradient(135deg, #f5f0ff 0%, #c4b5fd 50%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            THE MATRIX
          </h2>
          <p style={{ maxWidth: 660, margin: '0 auto', fontSize: 15, color: '#7c6a99', lineHeight: 1.8, fontWeight: 300 }}>
            A generationally native digital collective operating across Bangladesh and Pakistan. We converge advanced artificial intelligence pipelines with fluid spatial web engineering to construct high-retention interactive architectures.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
