import { useRef } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const team = [
  {
    name: 'Ibrahim Harun', realName: 'Bangladesh',
    role: 'Design Principal & UI/UX Architect',
    copy: 'The creative lead of Web Fixxies. Ibrahim drives the macro UI/UX vision, crafting layouts built to maximise user engagement and enterprise retention. Expert in structural typography, component scaling, and high-fidelity design systems.',
    img: 'ibrahim_vex_new_pfp.png',
    accent: '#818cf8', accentDark: '#4f46e5',
    glow: 'rgba(79,70,229,0.3)', glowSoft: 'rgba(79,70,229,0.08)',
    tag: 'DESIGN', icon: '◈', index: 0,
  },
  {
    name: 'Ibrahim', realName: 'Pakistan',
    role: 'Technical Director & Front-End Engineer',
    copy: 'The technical backbone of the studio. Ibrahim bridges visionary design with browser performance, building robust React architectures, physics-driven animations, and three-dimensional web environments optimised for high frame rates.',
    img: 'rainpfp.jpg',
    accent: '#6366f1', accentDark: '#4338ca',
    glow: 'rgba(67,56,202,0.3)', glowSoft: 'rgba(67,56,202,0.08)',
    tag: 'ENGINEERING', icon: '⬡', index: 1,
  },
  {
    name: 'Ahnaf Tahmid', realName: 'Bangladesh',
    role: 'Growth Strategist & Client Relations',
    copy: 'The strategic partner. Ahnaf aligns our engineering capabilities with measurable business outcomes. Experienced in international project deployment, cross-border client operations, and ensuring every engagement is delivered to the highest professional standard.',
    img: 'ahnaf_new_pic.jpg',
    accent: '#a5b4fc', accentDark: '#6366f1',
    glow: 'rgba(99,102,241,0.3)', glowSoft: 'rgba(99,102,241,0.08)',
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
      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1200} scale={1.01} transitionSpeed={1500} glareEnable={true} glareMaxOpacity={0.06} glareColor={member.accent} glarePosition="all">
        <div className="team-card" style={{ padding: '36px', borderRadius: 20, border: '1px solid rgba(99,102,241,0.14)', background: `linear-gradient(135deg, rgba(18,21,25,0.97), ${member.glowSoft})`, backdropFilter: 'blur(30px)', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg, transparent, ${member.accent}, transparent)`, opacity: 0.5 }} />
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${member.glow} 0%, transparent 70%)`, filter: 'blur(30px)', pointerEvents: 'none', opacity: 0.5 }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${member.glowSoft} 0%, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />

          <div className="team-card-inner" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ flexShrink: 0 }}>
              <div style={{ width: 100, height: 100, borderRadius: 16, border: `2px solid ${member.accent}33`, overflow: 'hidden', background: '#121519', boxShadow: `0 0 30px ${member.glow}`, position: 'relative' }}>
                <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.15) saturate(1.05)' }}
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${member.name}`; }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 60%, ${member.glowSoft} 100%)` }} />
              </div>
              <div className="font-mono" style={{ marginTop: 10, padding: '4px 8px', borderRadius: 6, background: `${member.accentDark}22`, border: `1px solid ${member.accent}33`, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: member.accent, textAlign: 'center' }}>
                {member.tag}
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="team-member-name-row">
                <h3 className="font-display" style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', color: '#f1f5f9', lineHeight: 1 }}>{member.name}</h3>
                <span className="font-mono" style={{ fontSize: 10, color: member.accent, letterSpacing: '0.12em', textTransform: 'uppercase', background: `${member.accentDark}22`, border: `1px solid ${member.accent}33`, padding: '2px 8px', borderRadius: 4 }}>📍 {member.realName}</span>
              </div>
              <div style={{ fontSize: 11, color: member.accent, fontFamily: 'Space Mono, monospace', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>{member.role}</div>
              <div style={{ height: 1, background: `linear-gradient(90deg, ${member.accent}22, transparent)`, marginBottom: 16 }} />
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.75, fontWeight: 300 }}>{member.copy}</p>
              <div style={{ display: 'flex', gap: 6, marginTop: 20, alignItems: 'center' }}>
                {[0.9, 0.75, 0.6, 0.45].map((v, i) => (
                  <div key={i} style={{ height: 3, width: 28 * v, borderRadius: 2, background: `linear-gradient(90deg, ${member.accent}, ${member.accentDark})`, opacity: v }} />
                ))}
                <span className="font-mono" style={{ fontSize: 9, color: '#334155', letterSpacing: '0.15em', marginLeft: 4 }}>EXPERTISE</span>
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 20, right: 24, fontFamily: 'Outfit, sans-serif', fontSize: 64, fontWeight: 900, color: `${member.accent}07`, lineHeight: 1, userSelect: 'none', letterSpacing: '-0.05em' }}>
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
    <section id="about" ref={ref} style={{ position: 'relative', width: '100%', padding: '120px 24px', overflow: 'hidden', background: 'linear-gradient(180deg, #07080a 0%, #0d0f12 50%, #07080a 100%)' }}>
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(80px, 18vw, 220px)', letterSpacing: '-0.06em', color: 'rgba(79,70,229,0.025)', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none' }}>
        THE STUDIO
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="section-tag" style={{ margin: '0 auto 24px' }}>
            <span className="dot" />The Collective
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 20, background: 'linear-gradient(135deg, #f1f5f9 0%, #a5b4fc 50%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            THE STUDIO
          </h2>
          <p style={{ maxWidth: 660, margin: '0 auto', fontSize: 15, color: '#64748b', lineHeight: 1.8, fontWeight: 300 }}>
            A digitally native studio operating across Bangladesh and Pakistan. We integrate advanced technology with precise design craft to deliver high-retention, interactive web architectures for ambitious brands.
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
