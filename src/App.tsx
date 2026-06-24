import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import ParticleField from './components/ParticleField';
import Hero3D from './components/Hero3D';
import MissionSection from './components/MissionSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        // transform instead of left/top — skips layout, goes straight to
        // composite layer. Much cheaper on the main thread.
        ref.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div ref={ref} style={{
      position: 'fixed', top: 0, left: 0,
      width: 400, height: 400, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, rgba(99,102,241,0.025) 40%, transparent 70%)',
      pointerEvents: 'none', zIndex: 1,
      willChange: 'transform',
    }} />
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
  const sections = ['mission', 'about', 'projects', 'pricing', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); },
      { threshold: 0.3 }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navItems = ['mission', 'about', 'projects', 'pricing', 'contact'];

  return (
    <>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 72, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(16px, 4vw, 32px)', background: scrolled ? 'rgba(7,8,10,0.9)' : 'transparent', backdropFilter: scrolled ? 'blur(24px)' : 'none', borderBottom: scrolled ? '1px solid rgba(99,102,241,0.1)' : '1px solid transparent', transition: 'all 0.4s ease' }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="logo.png" alt="Web Fixxies logo" style={{ width: 32, height: 32, objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.45))' }} />
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 18, letterSpacing: '-0.02em', textTransform: 'uppercase', backgroundImage: 'linear-gradient(135deg, #e2e8f0, #a5b4fc, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 0 10px rgba(99,102,241,0.3))' }}>
            WEB FIXXIES
          </span>
        </button>

        <nav className="nav-desktop">
          {navItems.map(item => (
            <button key={item} onClick={() => scrollTo(item)} className="font-mono" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: activeSection === item ? '#818cf8' : 'rgba(100,116,139,0.7)', padding: '4px 0', position: 'relative', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#818cf8')}
              onMouseLeave={e => { e.currentTarget.style.color = activeSection === item ? '#818cf8' : 'rgba(100,116,139,0.7)'; }}>
              {item}
              {activeSection === item && <div style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #6366f1, transparent)' }} />}
            </button>
          ))}
        </nav>

        <a href="mailto:webfixxies@gmail.com" className="btn-primary nav-contact-desktop" style={{ textDecoration: 'none', fontSize: 9, padding: '10px 22px', letterSpacing: '0.18em' }}>
          Contact Us
        </a>

        <button className="nav-toggle-mobile" onClick={() => setMenuOpen(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(7,8,10,0.97)', backdropFilter: 'blur(30px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
          <img src="logo.png" alt="Web Fixxies" style={{ width: 64, height: 64, objectFit: 'contain', marginBottom: 8, filter: 'drop-shadow(0 0 12px rgba(99,102,241,0.5))' }} />
          {navItems.map(item => (
            <button key={item} onClick={() => scrollTo(item)} className="font-display" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 36, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#f1f5f9' }}>
              {item}
            </button>
          ))}
          <button onClick={() => setMenuOpen(false)} style={{ marginTop: 20, background: 'none', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 100, padding: '10px 28px', cursor: 'pointer', color: '#64748b', fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.2em' }}>
            CLOSE
          </button>
        </div>
      )}
    </>
  );
}

function GridBackground() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      backgroundSize: '40px 40px',
      backgroundImage: 'linear-gradient(to right, rgba(79,70,229,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(79,70,229,0.025) 1px, transparent 1px)',
      maskImage: 'radial-gradient(circle at center, black 10%, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 80%)',
    }} />
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => { lenis.destroy(); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#07080a', overflowX: 'hidden' }}>
      <ParticleField />
      <GridBackground />
      <CursorGlow />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero3D />
        <MissionSection />
        <AboutSection />
        <ProjectsSection />
        <PricingSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
