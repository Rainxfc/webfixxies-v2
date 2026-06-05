import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import ParticleField from './components/ParticleField';
import Hero3D from './components/Hero3D';
import MissionSection from './components/MissionSection';
import AboutSection from './components/AboutSection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + 'px';
        ref.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div ref={ref} style={{ position: 'fixed', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, rgba(192,38,211,0.04) 40%, transparent 70%)', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 1, willChange: 'left, top', transition: 'left 0.12s ease-out, top 0.12s ease-out' }} />
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
    const sections = ['mission', 'about', 'pricing', 'contact'];
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

  const navItems = ['mission', 'about', 'pricing', 'contact'];

  return (
    <>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 72, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(16px, 4vw, 32px)', background: scrolled ? 'rgba(4,0,13,0.85)' : 'transparent', backdropFilter: scrolled ? 'blur(24px)' : 'none', borderBottom: scrolled ? '1px solid rgba(139,92,246,0.12)' : '1px solid transparent', transition: 'all 0.4s ease' }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 18, letterSpacing: '-0.02em', textTransform: 'uppercase', backgroundImage: 'linear-gradient(135deg, #c4b5fd, #a78bfa, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 0 12px rgba(167,139,250,0.4))' }}>
          WEB FIXXIES
        </button>

        <nav className="nav-desktop">
          {navItems.map(item => (
            <button key={item} onClick={() => scrollTo(item)} className="font-mono" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: activeSection === item ? '#a78bfa' : 'rgba(124,92,200,0.55)', padding: '4px 0', position: 'relative', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#a78bfa')}
              onMouseLeave={e => { e.currentTarget.style.color = activeSection === item ? '#a78bfa' : 'rgba(124,92,200,0.55)'; }}>
              {item}
              {activeSection === item && <div style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)' }} />}
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
        <div style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(4,0,13,0.97)', backdropFilter: 'blur(30px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
          {navItems.map(item => (
            <button key={item} onClick={() => scrollTo(item)} className="font-display" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 36, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#f5f0ff' }}>
              {item}
            </button>
          ))}
          <button onClick={() => setMenuOpen(false)} style={{ marginTop: 20, background: 'none', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 100, padding: '10px 28px', cursor: 'pointer', color: '#7c6a99', fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.2em' }}>
            CLOSE
          </button>
        </div>
      )}
    </>
  );
}

function ScanLine() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 1.5, background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(192,38,211,0.4), transparent)', zIndex: 9999, pointerEvents: 'none', animation: 'scan-y 10s linear infinite' }} />
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#04000d', overflowX: 'hidden' }}>
      <ParticleField />
      <CursorGlow />
      <ScanLine />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero3D />
        <MissionSection />
        <AboutSection />
        <PricingSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
