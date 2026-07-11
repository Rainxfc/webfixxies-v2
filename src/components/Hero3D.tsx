import { useRef, Suspense, useMemo } from 'react';
import { navTo } from '../utils/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Torus, Octahedron } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useTheme } from '../App';

function CrystalCore({ dark }: { dark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const tx = state.pointer.x * 0.5;
      const ty = -state.pointer.y * 0.5;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, tx, 0.05);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, ty, 0.05);
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.3;
      innerRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1.8, 64, 64]}>
        <MeshDistortMaterial
          color={dark ? '#5b4fcf' : '#8b5cf6'}
          distort={0.38} speed={2.2}
          roughness={0.05}
          metalness={0.4}
          transparent
          opacity={dark ? 0.9 : 0.88}
          envMapIntensity={0}
        />
      </Sphere>
      <Octahedron ref={innerRef} args={[0.9, 0]}>
        <meshStandardMaterial
          color={dark ? '#6366f1' : '#a78bfa'}
          emissive={dark ? '#4338ca' : '#8b5cf6'}
          emissiveIntensity={dark ? 1.8 : 1.2}
          metalness={0.9} roughness={0.05} transparent opacity={0.9}
        />
      </Octahedron>
      <pointLight color={dark ? '#4f46e5' : '#8b5cf6'} intensity={dark ? 6 : 5} distance={6} />
      <pointLight color={dark ? '#6366f1' : '#c4b5fd'} intensity={dark ? 3 : 2.5} distance={4} position={[0, 1, 0]} />
    </group>
  );
}

function OrbitRings({ dark }: { dark: boolean }) {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring1.current) { ring1.current.rotation.x += delta * 0.25; ring1.current.rotation.z += delta * 0.1; }
    if (ring2.current) { ring2.current.rotation.y += delta * 0.2; ring2.current.rotation.x -= delta * 0.15; }
    if (ring3.current) { ring3.current.rotation.z -= delta * 0.3; ring3.current.rotation.y += delta * 0.05; }
  });

  return (
    <group>
      <Torus ref={ring1} args={[2.8, 0.025, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color={dark ? '#818cf8' : '#9333ea'} emissive={dark ? '#4f46e5' : '#7c3aed'} emissiveIntensity={dark ? 2.5 : 1.8} metalness={1} roughness={0} transparent opacity={dark ? 0.7 : 0.75} />
      </Torus>
      <Torus ref={ring2} args={[3.5, 0.018, 16, 100]} rotation={[0, Math.PI / 5, Math.PI / 4]}>
        <meshStandardMaterial color={dark ? '#a5b4fc' : '#a78bfa'} emissive={dark ? '#6366f1' : '#8b5cf6'} emissiveIntensity={dark ? 2 : 1.5} metalness={1} roughness={0} transparent opacity={dark ? 0.55 : 0.6} />
      </Torus>
      <Torus ref={ring3} args={[4.2, 0.012, 16, 100]} rotation={[Math.PI / 6, Math.PI / 3, 0]}>
        <meshStandardMaterial color={dark ? '#94a3b8' : '#c4b5fd'} emissive={dark ? '#4338ca' : '#7c3aed'} emissiveIntensity={dark ? 1.5 : 1.2} metalness={1} roughness={0} transparent opacity={dark ? 0.4 : 0.5} />
      </Torus>
    </group>
  );
}

function CrystalShard({ position, scale, speed, rotAxis, dark }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  rotAxis: [number, number, number];
  dark: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed * rotAxis[0];
      ref.current.rotation.y += delta * speed * rotAxis[1];
      ref.current.rotation.z += delta * speed * rotAxis[2];
    }
  });
  return (
    <Octahedron ref={ref} args={[1, 0]} position={position} scale={scale}>
      <meshPhysicalMaterial
        color={dark ? '#818cf8' : '#9333ea'}
        emissive={dark ? '#4f46e5' : '#7c3aed'}
        emissiveIntensity={dark ? 0.8 : 0.5}
        metalness={0.8}
        roughness={0.1}
        transparent
        opacity={0.85}
      />
    </Octahedron>
  );
}

function CrystalShards({ dark }: { dark: boolean }) {
  const shards = useMemo(() => [
    { position: [4.5, 1.5, -1]   as [number,number,number], scale: 0.22, speed: 0.4,  rotAxis: [1,0.5,0.2]   as [number,number,number] },
    { position: [-4, 2, 0.5]     as [number,number,number], scale: 0.16, speed: 0.6,  rotAxis: [0.3,1,0.5]   as [number,number,number] },
    { position: [2, -3.5, -2]    as [number,number,number], scale: 0.28, speed: 0.35, rotAxis: [0.5,0.3,1]   as [number,number,number] },
    { position: [-3.5, -2, 1]    as [number,number,number], scale: 0.12, speed: 0.8,  rotAxis: [1,1,0.2]     as [number,number,number] },
    { position: [0.5, 4, -1.5]   as [number,number,number], scale: 0.18, speed: 0.5,  rotAxis: [0.2,0.5,1]   as [number,number,number] },
    { position: [-1, -4, 0.5]    as [number,number,number], scale: 0.14, speed: 0.7,  rotAxis: [1,0.2,0.5]   as [number,number,number] },
    { position: [5, -1, 0]       as [number,number,number], scale: 0.1,  speed: 0.9,  rotAxis: [0.5,1,0.3]   as [number,number,number] },
    { position: [-5, 0.5, -0.5]  as [number,number,number], scale: 0.2,  speed: 0.45, rotAxis: [0.3,0.7,1]   as [number,number,number] },
  ], []);

  return (
    <>
      {shards.map((s, i) => (
        <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0} floatIntensity={0.8} floatingRange={[-0.3, 0.3]}>
          <CrystalShard {...s} dark={dark} />
        </Float>
      ))}
    </>
  );
}

function Scene({ dark, isMobile }: { dark: boolean; isMobile: boolean }) {
  return (
    <>
      {dark ? (
        <>
          <ambientLight intensity={0.4} color="#1a1040" />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#818cf8" />
          <directionalLight position={[-5, -3, -5]} intensity={0.6} color="#6366f1" />
          <pointLight position={[0, 6, 0]} intensity={3} color="#4f46e5" distance={14} />
          <pointLight position={[3, -3, 3]} intensity={2} color="#7c3aed" distance={10} />
        </>
      ) : (
        <>
          <ambientLight intensity={1.4} color="#f0eaff" />
          <directionalLight position={[6, 8, 5]} intensity={2.0} color="#ffffff" />
          <directionalLight position={[-4, -2, -4]} intensity={0.6} color="#ddd0ff" />
          <pointLight position={[2, 4, 3]} intensity={4} color="#9333ea" distance={14} />
          <pointLight position={[-3, -2, 2]} intensity={2} color="#7c3aed" distance={10} />
        </>
      )}
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.5} floatingRange={[-0.15, 0.15]}>
          <CrystalCore dark={dark} />
        </Float>
        <OrbitRings dark={dark} />
        {!isMobile && <CrystalShards dark={dark} />}
      </Suspense>
      <OrbitControls
        enableZoom={false} enablePan={false} enableRotate={true}
        rotateSpeed={0.4} autoRotate={true} autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI * 0.7} minPolarAngle={Math.PI * 0.3}
      />
    </>
  );
}

const stats = [
  { value: '100%', label: 'Custom Built' },
  { value: '3D',   label: 'Immersive Design' },
  { value: '<48h', label: 'First Draft' },
];

export default function Hero3D() {
  const { dark } = useTheme();
  // Reduce geometry on mobile for performance
  const isMobile = window.innerWidth < 768;

  const scrollDown = () => {
    const next = document.getElementById('about');
    if (next) next.scrollIntoView({ behavior: 'smooth' });
    else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div id="home" style={{
      position: 'relative', width: '100vw', minHeight: '100svh', height: '100svh',
      overflow: 'hidden',
      background: dark
        ? 'radial-gradient(ellipse 130% 90% at 50% -5%, #130d24 0%, #0a0710 45%, #08080c 100%)'
        : 'radial-gradient(ellipse 120% 85% at 62% 25%, rgba(147,51,234,0.12) 0%, rgba(109,40,217,0.04) 45%, #fafafa 70%)',
    }}>

      {/* Light mode violet bloom orbs */}
      {!dark && (
        <>
          <div style={{ position: 'absolute', top: '-10%', right: '5%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(147,51,234,0.12) 0%, transparent 60%)', filter: 'blur(90px)', pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.09) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'absolute', top: '35%', left: '8%', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 60%)', filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0 }} />
        </>
      )}

      {/* 3D Canvas — keyed on dark so WebGL context remounts cleanly on theme switch */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Canvas
          key={dark ? 'dark' : 'light'}
          camera={{ position: [0, -1.2, 9], fov: 42 }}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
          dpr={isMobile ? [1, 1] : [1, 1.5]}
          performance={{ min: 0.5 }}
          style={{ background: 'transparent' }}
        >
          <Scene dark={dark} isMobile={isMobile} />
        </Canvas>
      </div>

      {/* Radial glow */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: dark
          ? 'radial-gradient(circle, rgba(124,58,237,0.28) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)'
          : 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(109,40,217,0.04) 50%, transparent 70%)',
        filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Bottom gradient fade */}
      <div className="hero-bottom-fade" />

      {/* ── Hero Content ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: 'clamp(16px, 5vw, 24px)', pointerEvents: 'none',
      }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginBottom: 'clamp(18px, 4vw, 28px)', pointerEvents: 'auto',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 18px)',
            borderRadius: 100,
            border: dark ? '1px solid rgba(139,92,246,0.25)' : '1px solid rgba(109,40,217,0.2)',
            background: dark ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.9)',
            maxWidth: '90vw',
          }}
        >
          <img src="logo.png" alt="Web Fixxies" style={{ width: 18, height: 18, objectFit: 'contain', flexShrink: 0 }} />
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 'clamp(7px, 2vw, 9px)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: dark ? '#a78bfa' : '#6d28d9',
            whiteSpace: 'nowrap',
          }}>
            Web Design &amp; Development Studio
          </span>
        </motion.div>

        {/* Main heading — plain div wrapper for drop-shadow, motion div above it */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 'clamp(18px, 3vw, 32px)' }}
        >
          <div style={{ filter: dark ? 'drop-shadow(0 0 50px rgba(139,92,246,0.35))' : 'none' }}>
            <h1 className={`font-display no-select hero-title ${dark ? 'hero-title--dark' : 'hero-title--light'}`}>
              WEB FIXXIES
            </h1>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: 580, fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 400,
            lineHeight: 1.8, color: dark ? '#b8b5d4' : '#2a2050',
            marginBottom: 'clamp(28px, 4vw, 48px)',
            letterSpacing: '0.01em', padding: '0 8px',
          }}
        >
          We build beautiful, fast websites that help businesses
          stand out online — without the technical jargon or the big agency prices.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', pointerEvents: 'auto' }}
        >
          <button onClick={() => navTo('about')} className="btn-primary">
            See Our Work
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </button>
          <button onClick={() => navTo('contact')} className="btn-primary" style={{ background: 'transparent', border: '1px solid rgba(167,139,250,0.35)', color: dark ? '#c4b5fd' : '#6d28d9', boxShadow: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.12)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.35)'; }}
          >
            Contact Us
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: 'clamp(40px, 6vw, 72px)',
            display: 'flex', gap: 'clamp(24px, 5vw, 64px)',
            alignItems: 'center', justifyContent: 'center',
            flexWrap: 'wrap', pointerEvents: 'auto',
          }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ lineHeight: 1, fontSize: 'clamp(22px, 3.5vw, 36px)' }}>
                <span
                  className={dark ? 'stat-value-dark' : 'stat-value-light'}
                  style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}
                >
                  {s.value}
                </span>
              </div>
              <div style={{
                fontFamily: 'Space Mono, monospace', fontSize: 9,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: dark ? '#5c5b72' : '#5b4a7a', marginTop: 6,
              }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      }}>
        <div className="scroll-line" style={{
          width: 1.5, height: 52,
          background: dark
            ? 'linear-gradient(to bottom, transparent, rgba(129,140,248,0.6), transparent)'
            : 'linear-gradient(to bottom, transparent, rgba(79,70,229,0.4), transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
        <button
          onClick={scrollDown}
          className="scroll-down-btn"
          aria-label="Scroll down"
          style={{
            display: 'none',
            alignItems: 'center', gap: 6,
            background: dark ? 'rgba(79,70,229,0.15)' : 'rgba(255,255,255,0.92)',
            border: dark ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(79,70,229,0.2)',
            borderRadius: 100, padding: '10px 20px', cursor: 'pointer',
            color: dark ? '#a5b4fc' : '#4f46e5',
            fontFamily: 'Space Mono, monospace', fontSize: 10,
            letterSpacing: '0.2em', textTransform: 'uppercase',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'float 1.5s ease-in-out infinite' }}>
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
          Scroll down
        </button>
      </div>

    </div>
  );
}
