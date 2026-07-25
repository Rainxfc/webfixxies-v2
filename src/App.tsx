import { useEffect, useRef, useState, createContext, useContext, lazy, Suspense } from 'react';
import { navTo, consumeScrollTarget } from './utils/navigation';
import Lenis from 'lenis';
import ParticleField from './components/ParticleField';
import Hero3D from './components/Hero3D';
import ThemePicker from './components/ThemePicker';

const ServicesSection = lazy(() => import('./components/ServicesSection'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const MissionSection = lazy(() => import('./components/MissionSection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const FitSection = lazy(() => import('./components/FitSection'));
const PricingSection = lazy(() => import('./components/PricingSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const AllProjectsPage = lazy(() => import('./components/AllProjectsPage'));

// ── Theme context ─────────────────────────────────────────────────────────────
export const ThemeContext = createContext<{ dark: boolean; toggle: () => void }>({ dark: true, toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
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

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setWidth(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div
      className="scroll-progress-bar"
      style={{ width: `${width}%` }}
      aria-hidden="true"
    />
  );
}

function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      {dark ? (
        /* Sun icon */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        /* Moon icon */
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'services', 'about', 'mission', 'projects', 'pricing', 'contact'];

    const setupObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => { entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); },
        { threshold: 0.3 }
      );
      sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
      return observer;
    };

    let observer = setupObserver();

    const onHashChange = () => {
      observer.disconnect();
      setTimeout(() => { observer = setupObserver(); }, 200);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  const scrollTo = (id: string) => {
    if (id === 'home') {
      // If on all-projects page, go home first; otherwise just scroll to top
      if (window.location.hash === '#all-projects') {
        window.location.hash = '';
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setActiveSection('home');
    } else {
      navTo(id);
    }
    setMenuOpen(false);
  };

  // Nav order: Home → Services → About → Mission → Projects → Pricing → Contact
  const navItems = ['home', 'services', 'about', 'mission', 'projects', 'pricing', 'contact'];
  const navLabels: Record<string, string> = {
    home: 'Home',
    services: 'Services',
    about: 'About',
    mission: 'Mission',
    projects: 'Projects',
    pricing: 'Pricing',
    contact: 'Contact',
  };

  const navBg = scrolled
    ? (dark ? 'rgba(7,8,10,0.92)' : 'rgba(246,244,251,0.96)')
    : 'transparent';
  const navBorder = scrolled
    ? (dark ? '1px solid rgba(99,102,241,0.1)' : '1px solid rgba(109,40,217,0.12)')
    : '1px solid transparent';

  return (
    <>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 72, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(16px, 4vw, 32px)', background: navBg, backdropFilter: scrolled ? 'blur(24px)' : 'none', borderBottom: navBorder, transition: 'all 0.4s ease' }}>
        <a href="#" onClick={(e) => { if (window.location.hash === '#all-projects') { window.location.hash = ''; } else { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }} style={{ textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="logo.png" alt="Web Fixxies logo" style={{ width: 32, height: 32, objectFit: 'contain', filter: dark ? 'drop-shadow(0 0 6px rgba(167,139,250,0.5))' : 'drop-shadow(0 0 4px rgba(109,40,217,0.3))' }} />
          <span className={`font-display nav-brand ${dark ? 'nav-brand--dark' : 'nav-brand--light'}`} style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            WEB FIXXIES
          </span>
        </a>

        <nav className="nav-desktop">
          {navItems.map(item => (
            <button key={item} onClick={() => scrollTo(item)} className="font-mono" style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
              fontWeight: 700,
              color: activeSection === item
                ? (dark ? '#e0d4ff' : '#5b21b6')
                : (dark ? 'rgba(200,195,230,0.75)' : 'rgba(60,20,150,0.7)'),
              padding: '6px 0', position: 'relative', transition: 'color 0.2s'
            }}
              onMouseEnter={e => (e.currentTarget.style.color = dark ? '#e0d4ff' : '#5b21b6')}
              onMouseLeave={e => { e.currentTarget.style.color = activeSection === item ? (dark ? '#e0d4ff' : '#5b21b6') : (dark ? 'rgba(200,195,230,0.75)' : 'rgba(60,20,150,0.7)'); }}>
              {navLabels[item]}
              {activeSection === item && <div style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 2, background: dark ? 'linear-gradient(90deg, transparent, #c4b5fd, transparent)' : 'linear-gradient(90deg, transparent, #7c3aed, transparent)', borderRadius: 2 }} />}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ThemeToggle />
          <button onClick={() => scrollTo('contact')} className="btn-primary nav-contact-desktop" style={{ fontSize: 11, padding: '11px 26px', letterSpacing: '0.15em', border: 'none', cursor: 'pointer', fontWeight: 700 }}>
            Contact Us
          </button>
          <button className="nav-toggle-mobile" onClick={() => setMenuOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99, background: dark ? 'rgba(6,6,8,0.97)' : 'rgba(250,250,250,0.97)', backdropFilter: 'blur(30px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
          <img src="logo.png" alt="Web Fixxies" style={{ width: 64, height: 64, objectFit: 'contain', marginBottom: 8, filter: dark ? 'drop-shadow(0 0 12px rgba(167,139,250,0.5))' : 'drop-shadow(0 0 8px rgba(109,40,217,0.3))' }} />
          {navItems.map(item => (
            <button key={item} onClick={() => scrollTo(item)} className="font-display" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 36, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em', color: dark ? '#f8f7ff' : '#0d0a14' }}>
              {navLabels[item]}
            </button>
          ))}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 8 }}>
            <ThemeToggle />
            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: `1px solid ${dark ? 'rgba(139,92,246,0.3)' : 'rgba(109,40,217,0.22)'}`, borderRadius: 100, padding: '10px 28px', cursor: 'pointer', color: dark ? '#6b7280' : '#7a6890', fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '0.2em' }}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function GridBackground() {
  return (
    <div className="grid-overlay" style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      maskImage: 'radial-gradient(circle at center, black 10%, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 80%)',
    }} />
  );
}

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('wf-theme-v2') === 'dark');
  const [showPicker, setShowPicker] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'all-projects'>(() => {
    return window.location.hash === '#all-projects' ? 'all-projects' : 'home';
  });

  // Apply/remove 'light' class on root element
  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark);
  }, [dark]);

  useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash === '#all-projects' ? 'all-projects' : 'home';
      setCurrentPage(page);
      if (page === 'home') {
        setTimeout(consumeScrollTarget, 200);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
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
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => {
      const next = !d;
      localStorage.setItem('wf-theme-v2', next ? 'dark' : 'light');
      return next;
    }) }}>
      <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-deepest)', overflowX: 'hidden', transition: 'background 0.3s ease' }}>
        {showPicker && (
          <ThemePicker onChoose={(isDark) => {
            setDark(isDark);
            setShowPicker(false);
            document.documentElement.classList.toggle('light', !isDark);
          }} />
        )}
        <ParticleField />
        <GridBackground />
        <CursorGlow />
        <ScrollProgress />
        <Navbar />
        <main style={{ position: 'relative', zIndex: 2 }}>
          <Suspense fallback={null}>
            {currentPage === 'all-projects' ? (
              <AllProjectsPage />
            ) : (
              <>
                <Hero3D />
                <ServicesSection />
                <AboutSection />
                <MissionSection />
                <ProjectsSection />
                <FitSection />
                <PricingSection />
                <ContactSection />
              </>
            )}
          </Suspense>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
