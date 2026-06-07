import { useRef, Suspense, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, addEffect } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Torus, Octahedron } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';

// ─── 90 fps cap ───────────────────────────────────────────────────────────────
// R3F's `frameloop="demand"` only renders when invalidated.
// We add a global RAF effect that invalidates at most every ~11ms (90fps).
// On 60hz screens this simply fires every frame (no overhead).
const TARGET_MS = 1000 / 90; // ~11.1ms
let lastTime = 0;
function use90fps() {
  useEffect(() => {
    const unsub = addEffect((time: number) => {
      return time - lastTime >= TARGET_MS
        ? ((lastTime = time), true)   // allow render
        : false;                       // skip frame
    });
    return unsub;
  }, []);
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function WebfixxiesLogo({ size = 48, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size * 46 / 48} viewBox="0 0 48 46" fill="none" style={style}>
      <defs>
        <linearGradient id="wf-hero-grad" x1="0" y1="0" x2="48" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
      </defs>
      <path fill="url(#wf-hero-grad)" opacity="0.95" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" />
    </svg>
  );
}

// ─── 3D scene components ──────────────────────────────────────────────────────
function CrystalCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, state.pointer.x * 0.5, 0.05);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -state.pointer.y * 0.5, 0.05);
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.3;
      innerRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1.8, 48, 48]}>
        <MeshDistortMaterial
          color="#7c3aed"
          distort={0.35}
          speed={1.8}
          roughness={0.05}
          metalness={0.15}
          transparent
          opacity={0.88}
          envMapIntensity={0.4}
        />
      </Sphere>
      <Octahedron ref={innerRef} args={[0.9, 0]}>
        <meshStandardMaterial color="#c026d3" emissive="#9333ea" emissiveIntensity={1.6} metalness={0.85} roughness={0.1} transparent opacity={0.9} />
      </Octahedron>
      <pointLight color="#7c3aed" intensity={5} distance={6} />
      <pointLight color="#c026d3" intensity={2.5} distance={4} position={[0, 1, 0]} />
    </group>
  );
}

function OrbitRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (r1.current) { r1.current.rotation.x += delta * 0.25; r1.current.rotation.z += delta * 0.1; }
    if (r2.current) { r2.current.rotation.y += delta * 0.2;  r2.current.rotation.x -= delta * 0.15; }
    if (r3.current) { r3.current.rotation.z -= delta * 0.3;  r3.current.rotation.y += delta * 0.05; }
  });

  return (
    <group>
      <Torus ref={r1} args={[2.8, 0.025, 12, 80]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={2.2} metalness={1} roughness={0} transparent opacity={0.7} />
      </Torus>
      <Torus ref={r2} args={[3.5, 0.018, 12, 80]} rotation={[0, Math.PI / 5, Math.PI / 4]}>
        <meshStandardMaterial color="#e879f9" emissive="#c026d3" emissiveIntensity={1.8} metalness={1} roughness={0} transparent opacity={0.55} />
      </Torus>
      <Torus ref={r3} args={[4.2, 0.012, 12, 80]} rotation={[Math.PI / 6, Math.PI / 3, 0]}>
        <meshStandardMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={1.3} metalness={1} roughness={0} transparent opacity={0.4} />
      </Torus>
    </group>
  );
}

function CrystalShard({ position, scale, speed, rotAxis }: {
  position: [number, number, number]; scale: number; speed: number; rotAxis: [number, number, number];
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
      <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={0.7} metalness={0.7} roughness={0.2} transparent opacity={0.8} />
    </Octahedron>
  );
}

function CrystalShards() {
  const shards = useMemo(() => [
    { position: [4.2, 1.5, -1]   as [number,number,number], scale: 0.20, speed: 0.40, rotAxis: [1,0.5,0.2] as [number,number,number] },
    { position: [-3.8, 2, 0.5]   as [number,number,number], scale: 0.15, speed: 0.55, rotAxis: [0.3,1,0.5] as [number,number,number] },
    { position: [2, -3.2, -2]    as [number,number,number], scale: 0.24, speed: 0.35, rotAxis: [0.5,0.3,1] as [number,number,number] },
    { position: [-3.2, -2, 1]    as [number,number,number], scale: 0.11, speed: 0.75, rotAxis: [1,1,0.2]   as [number,number,number] },
    { position: [0.5, 3.8, -1.5] as [number,number,number], scale: 0.16, speed: 0.50, rotAxis: [0.2,0.5,1] as [number,number,number] },
  ], []);

  return (
    <>
      {shards.map((s, i) => (
        <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0} floatIntensity={0.8} floatingRange={[-0.3, 0.3]}>
          <CrystalShard {...s} />
        </Float>
      ))}
    </>
  );
}

function Scene() {
  use90fps();
  return (
    <>
      <ambientLight intensity={0.25} color="#2d0060" />
      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#a78bfa" />
      <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#c026d3" />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.5} floatingRange={[-0.15, 0.15]}>
          <CrystalCore />
        </Float>
        <OrbitRings />
        <CrystalShards />
      </Suspense>
      <OrbitControls
        enableZoom={false} enablePan={false} enableRotate={true}
        rotateSpeed={0.4} autoRotate autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI * 0.7} minPolarAngle={Math.PI * 0.3}
      />
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero3D() {
  const heroRef = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef, { once: true });
  const [dpr] = useState(() => Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5));

  return (
    <div ref={heroRef} style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse 140% 90% at 50% -5%, #1e0047 0%, #0a0018 45%, #04000d 100%)',
    }}>
      {/* ── Full-screen 3D canvas — no frame, no screen ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Canvas
          camera={{ position: [0, 0, 9], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={dpr}
          frameloop="always"
          style={{ background: 'transparent', width: '100%', height: '100%' }}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Soft radial glows behind the crystal */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(192,38,211,0.08) 40%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', right: '10%', bottom: '15%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,38,211,0.14) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

      {/* ── Text overlay — left-aligned, sitting over the 3D ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', alignItems: 'center',
        padding: '0 clamp(24px, 6vw, 100px)',
        // gradient mask so text is readable but 3D bleeds through on the right
        background: 'linear-gradient(90deg, rgba(4,0,13,0.72) 0%, rgba(4,0,13,0.35) 50%, transparent 75%)',
        pointerEvents: 'none',
      }}>
        <div style={{ maxWidth: 560, pointerEvents: 'auto' }}>

          {/* Logo + badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}
          >
            <motion.div
              animate={{ filter: ['drop-shadow(0 0 8px rgba(167,139,250,0.5))', 'drop-shadow(0 0 22px rgba(192,38,211,0.7))', 'drop-shadow(0 0 8px rgba(167,139,250,0.5))'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <WebfixxiesLogo size={48} />
            </motion.div>
            <div className="section-tag">
              <span className="dot" />
              <span>Next-Gen Web Engineering</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display glitch no-select"
            data-text="WEB FIXXIES"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(44px, 9vw, 112px)', fontWeight: 900,
              lineHeight: 0.88, letterSpacing: '-0.03em', textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #f5f0ff 0%, #c4b5fd 35%, #e879f9 65%, #818cf8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              marginBottom: 24,
              filter: 'drop-shadow(0 0 40px rgba(167,139,250,0.5))',
            }}
          >
            WEB FIXXIES
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              maxWidth: 440, fontSize: 'clamp(14px, 1.5vw, 17px)', fontWeight: 300,
              lineHeight: 1.8, color: '#c4b5fd', marginBottom: 40, letterSpacing: '0.02em',
            }}
          >
            Dismantling the limitations of the traditional web. We engineer
            high-performance, hardware-accelerated 3D digital environments
            designed to command market attention.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
          >
            <a href="#mission" className="btn-primary" style={{ textDecoration: 'none' }}>
              Explore Our Work
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <a href="#contact" className="btn-outline" style={{ textDecoration: 'none' }}>
              Get In Touch
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.65 }}
            style={{ display: 'flex', gap: 36, marginTop: 44, flexWrap: 'wrap' }}
          >
            {[{ value: '3D', label: 'Immersive UI' }, { value: '<2ms', label: 'Latency' }, { value: '100%', label: 'Custom Built' }].map(stat => (
              <div key={stat.label}>
                <div className="font-display" style={{ fontSize: 28, fontWeight: 800, background: 'linear-gradient(135deg, #a78bfa, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{stat.value}</div>
                <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(124,58,237,0.65)', marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.1 }}
        style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, pointerEvents: 'none',
        }}
      >
        <div style={{ width: 1.5, height: 48, background: 'linear-gradient(to bottom, transparent, rgba(167,139,250,0.6), transparent)', animation: 'float 2s ease-in-out infinite' }} />
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.35em', color: 'rgba(124,58,237,0.65)', textTransform: 'uppercase' }}>Scroll ↓</span>
      </motion.div>

      {/* HUD corners */}
      <div className="hud-element" style={{ position: 'absolute', top: 100, left: 24, zIndex: 3, opacity: 0.4 }}>+ SYS.ONLINE</div>
      <div className="hud-element" style={{ position: 'absolute', top: 100, right: 24, zIndex: 3, opacity: 0.4 }}>+ LATENCY: 2ms</div>
      <div className="hud-element" style={{ position: 'absolute', bottom: 32, left: 24, zIndex: 3, opacity: 0.4 }}>+ W.F.PROTOCOL</div>
      <div className="hud-element" style={{ position: 'absolute', bottom: 32, right: 24, zIndex: 3, opacity: 0.4 }}>+ MATRIX.ACTIVE</div>
    </div>
  );
}
