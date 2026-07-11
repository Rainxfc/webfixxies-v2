import { useRef } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useTheme } from '../App';

const team = [
  {
    name: 'Ibrahim Harun', realName: 'Bangladesh',
    role: 'Design Lead & UI/UX',
    copy: 'Ibrahim is the visual brains behind every Web Fixxies site. He figures out how things should look, where buttons go, and how to make sure visitors actually enjoy using what we build. If it looks good, it\'s his doing.',
    img: 'ibrahim_vex_new_pfp.png',
    accent: '#a78bfa', accentDark: '#7c3aed',
    glow: 'rgba(124,58,237,0.3)', glowSoft: 'rgba(124,58,237,0.08)',
    tag: 'DESIGN', icon: '◈', index: 0,
  },
  {
    name: 'Mohammed Ibrahim', realName: 'Pakistan',
    role: 'Lead Developer',
    copy: 'Ibrahim turns designs into real, working websites. He writes the code that makes everything move, load fast, and work smoothly on any device — whether it\'s a phone or a big desktop screen.',
    img: 'mdibrahimpfp.png',
    accent: '#6366f1', accentDark: '#4338ca',
    glow: 'rgba(67,56,202,0.3)', glowSoft: 'rgba(67,56,202,0.08)',
    tag: 'DEVELOPMENT', icon: '⬡', index: 1,
  },
  {
    name: 'Ahnaf Tahmid', realName: 'Bangladesh',
    role: 'Client Relations & Growth',
    copy: 'Ahnaf is your main point of contact. He listens to what you need, makes sure the team delivers on time, and keeps everything running smoothly from first message to final launch.',
    img: 'ahnaf_new_pic.jpg',
    accent: '#c4b5fd', accentDark: '#8b5cf6',
    glow: 'rgba(139,92,246,0.3)', glowSoft: 'rgba(139,92,246,0.08)',
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
        <div className="team-card" style={{ padding: '36px', borderRadius: 20, border: '1px solid var(--border-subtle)', background: `linear-gradient(135deg, var(--bg-mid), ${member.glowSoft})`, position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg, transparent, ${member.accent}, transparent)`, opacity: 0.5 }} />
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${member.glow} 0%, transparent 70%)`, filter: 'blur(30px)', pointerEvents: 'none', opacity: 0.5 }} />

          <div className="team-card-inner" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ flexShrink: 0 }}>
              <div style={{ width: 100, height: 100, borderRadius: 16, border: `2px solid ${member.accent}33`, overflow: 'hidden', background: 'var(--bg-mid)', boxShadow: `0 0 30px ${member.glow}`, position: 'relative' }}>
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
                <h3 className="font-display" style={{ fontSize: 'clamp(22px, 5vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>{member.name}</h3>
                <span className="font-mono" style={{ fontSize: 10, color: member.accent, letterSpacing: '0.12em', textTransform: 'uppercase', background: `${member.accentDark}22`, border: `1px solid ${member.accent}33`, padding: '2px 8px', borderRadius: 4 }}>📍 {member.realName}</span>
              </div>
              <div style={{ fontSize: 11, color: member.accent, fontFamily: 'Space Mono, monospace', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>{member.role}</div>
              <div style={{ height: 1, background: `linear-gradient(90deg, ${member.accent}22, transparent)`, marginBottom: 16 }} />
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.9, fontWeight: 400, letterSpacing: '0.01em' }}>{member.copy}</p>
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
  const { dark } = useTheme();

  return (
    <section id="about" ref={ref} className="section-bg" style={{ position: 'relative', width: '100%', padding: '120px 24px', overflow: 'hidden' }}>
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(80px, 18vw, 220px)', letterSpacing: '-0.06em', color: 'rgba(124,58,237,0.03)', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none' }}>
        THE TEAM
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="section-tag" style={{ margin: '0 auto 24px' }}>
            <span className="dot" />Who We Are
          </div>
          <h2 className={`font-display section-heading-grad ${!dark ? 'section-heading-light' : ''}`} style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: 20 }}>
            Meet the Team
          </h2>
          <p style={{ maxWidth: 660, margin: '0 auto', fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 400, letterSpacing: '0.01em' }}>
            We're a small, focused team from Bangladesh and Pakistan. We love building things on the 
            internet and we take every project personally — because your success is our success.
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
