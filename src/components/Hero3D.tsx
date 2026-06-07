import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshDistortMaterial, Sphere, Torus, Octahedron } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';

// Webfixxies logo SVG inline
function WebfixxiesLogo({ size = 48, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size * 46 / 48} viewBox="0 0 48 46" fill="none" style={style}>
      <path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"/>
      <defs>
        <linearGradient id="wf-grad" x1="0" y1="0" x2="48" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c4b5fd"/>
          <stop offset="50%" stopColor="#a78bfa"/>
          <stop offset="100%" stopColor="#e879f9"/>
        </linearGradient>
      </defs>
      <path fill="url(#wf-grad)" opacity="0.9" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"/>
    </svg>
  );
}

function CrystalCore() {
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
      <Sphere ref={meshRef} args={[1.8, 80, 80]}>
        <MeshDistortMaterial
          color="#7c3aed"
          distort={0.38}
          speed={2.2}
          roughness={0}
          metalness={0.1}
          transmission={0.92}
          thickness={2.5}
          ior={1.6}
          transparent
          opacity={0.85}
          envMapIntensity={1.5}
        />
      </Sphere>
      <Octahedron ref={innerRef} args={[0.9, 0]}>
        <meshStandardMaterial
          color="#c026d3"
          emissive="#9333ea"
          emissiveIntensity={1.8}
          metalness={0.9}
          roughness={0.05}
          transparent
          opacity={0.9}
        />
      </Octahedron>
      <pointLight color="#7c3aed" intensity={6} distance={6} />
      <pointLight color="#c026d3" intensity={3} distance={4} position={[0, 1, 0]} />
    </group>
  );
}

function OrbitRings() {
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
      <Torus ref={ring1} args={[2.8, 0.025, 16, 120]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={2.5} metalness={1} roughness={0} transparent opacity={0.7} />
      </Torus>
      <Torus ref={ring2} args={[3.5, 0.018, 16, 120]} rotation={[0, Math.PI / 5, Math.PI / 4]}>
        <meshStandardMaterial color="#e879f9" emissive="#c026d3" emissiveIntensity={2} metalness={1} roughness={0} transparent opacity={0.55} />
      </Torus>
      <Torus ref={ring3} args={[4.2, 0.012, 16, 120]} rotation={[Math.PI / 6, Math.PI / 3, 0]}>
        <meshStandardMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={1.5} metalness={1} roughness={0} transparent opacity={0.4} />
      </Torus>
    </group>
  );
}

function CrystalShard({ position, scale, speed, rotAxis }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  rotAxis: [number, number, number];
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
        color="#a78bfa" emissive="#7c3aed" emissiveIntensity={0.8}
        metalness={0.8} roughness={0.1} transmission={0.6} thickness={0.5}
        transparent opacity={0.85}
      />
    </Octahedron>
  );
}

function CrystalShards() {
  const shards = useMemo(() => [
    { position: [4.5, 1.5, -1] as [number,number,number],  scale: 0.22, speed: 0.4, rotAxis: [1,0.5,0.2] as [number,number,number] },
    { position: [-4, 2, 0.5] as [number,number,number],    scale: 0.16, speed: 0.6, rotAxis: [0.3,1,0.5] as [number,number,number] },
    { position: [2, -3.5, -2] as [number,number,number],   scale: 0.28, speed: 0.35, rotAxis: [0.5,0.3,1] as [number,number,number] },
    { position: [-3.5, -2, 1] as [number,number,number],   scale: 0.12, speed: 0.8, rotAxis: [1,1,0.2] as [number,number,number] },
    { position: [0.5, 4, -1.5] as [number,number,number],  scale: 0.18, speed: 0.5, rotAxis: [0.2,0.5,1] as [number,number,number] },
    { position: [-1, -4, 0.5] as [number,number,number],   scale: 0.14, speed: 0.7, rotAxis: [1,0.2,0.5] as [number,number,number] },
    { position: [5, -1, 0] as [number,number,number],      scale: 0.1,  speed: 0.9, rotAxis: [0.5,1,0.3] as [number,number,number] },
    { position: [-5, 0.5, -0.5] as [number,number,number], scale: 0.2,  speed: 0.45, rotAxis: [0.3,0.7,1] as [number,number,number] },
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
  return (
    <>
      <ambientLight intensity={0.2} color="#2d0060" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#a78bfa" />
      <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#c026d3" />
      <pointLight position={[0, 6, 0]} intensity={2} color="#7c3aed" distance={12} />
      <Environment preset="night" />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.5} floatingRange={[-0.15, 0.15]}>
          <CrystalCore />
        </Float>
        <OrbitRings />
        <CrystalShards />
      </Suspense>
      <OrbitControls
        enableZoom={false} enablePan={false} enableRotate={true}
        rotateSpeed={0.4} autoRotate={true} autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI * 0.7} minPolarAngle={Math.PI * 0.3}
      />
    </>
  );
}

// Monitor / desktop screen frame wrapping the 3D canvas
function DesktopFrame({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 680,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        filter: 'drop-shadow(0 40px 80px rgba(124,58,237,0.35))',
      }}
    >
      {/* Monitor bezel */}
      <div style={{
        width: '100%',
        background: 'linear-gradient(180deg, #150825 0%, #0d0318 100%)',
        borderRadius: 18,
        border: '2px solid rgba(139,92,246,0.35)',
        boxShadow: '0 0 0 1px rgba(192,38,211,0.15), inset 0 0 30px rgba(124,58,237,0.08), 0 30px 80px rgba(0,0,0,0.8)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Top bar of monitor */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: 'rgba(8,0,22,0.9)',
          borderBottom: '1px solid rgba(139,92,246,0.18)',
        }}>
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: 6 }}>
            {['#ef4444','#f59e0b','#10b981'].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.75 }} />
            ))}
          </div>
          {/* Address bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(4,0,12,0.7)', borderRadius: 8,
            border: '1px solid rgba(139,92,246,0.2)',
            padding: '4px 12px', flex: 1, maxWidth: 320, margin: '0 16px',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
            <span className="font-mono" style={{ fontSize: 9, color: 'rgba(167,139,250,0.6)', letterSpacing: '0.12em', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              webfixxies.dev
            </span>
          </div>
          {/* Logo mark in top-right */}
          <WebfixxiesLogo size={20} style={{ opacity: 0.7, flexShrink: 0 }} />
        </div>

        {/* The 3D canvas screen area */}
        {children}

        {/* Screen bottom status bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '6px 16px', background: 'rgba(8,0,22,0.95)',
          borderTop: '1px solid rgba(139,92,246,0.12)',
        }}>
          <span className="font-mono" style={{ fontSize: 8, color: 'rgba(124,58,237,0.6)', letterSpacing: '0.2em' }}>WF.RUNTIME</span>
          <div style={{ height: 2, flex: 1, margin: '0 12px', background: 'rgba(139,92,246,0.1)', borderRadius: 1, overflow: 'hidden' }}>
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ height: '100%', width: '40%', background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)' }}
            />
          </div>
          <span className="font-mono" style={{ fontSize: 8, color: 'rgba(192,38,211,0.6)', letterSpacing: '0.2em' }}>SYS.ACTIVE</span>
        </div>
      </div>

      {/* Monitor neck / stand */}
      <div style={{
        width: 3,
        height: 28,
        background: 'linear-gradient(to bottom, rgba(139,92,246,0.5), rgba(80,50,160,0.3))',
        marginTop: 0,
      }} />

      {/* Monitor base */}
      <div style={{
        width: '45%',
        height: 10,
        background: 'linear-gradient(to bottom, #150825, #0a0214)',
        borderRadius: '0 0 16px 16px',
        border: '1px solid rgba(139,92,246,0.22)',
        borderTop: '2px solid rgba(139,92,246,0.4)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
      }} />

      {/* Base foot / shadow spread */}
      <div style={{
        width: '65%',
        height: 5,
        background: 'linear-gradient(to bottom, rgba(80,50,160,0.25), transparent)',
        borderRadius: '0 0 50% 50%',
        marginTop: 2,
        filter: 'blur(4px)',
      }} />

      {/* Keyboard below the monitor */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        style={{
          marginTop: 20,
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          alignItems: 'center',
        }}
      >
        {/* Keyboard rows */}
        {[
          { keys: 14, width: '100%' },
          { keys: 13, width: '96%' },
          { keys: 11, width: '90%' },
          { keys: 9, width: '80%' },
        ].map((row, ri) => (
          <div key={ri} style={{
            display: 'flex', gap: 4, width: row.width, justifyContent: 'center',
          }}>
            {Array.from({ length: row.keys }).map((_, ki) => (
              <div key={ki} style={{
                flex: ri === 2 && ki === 5 ? 4 : (ri === 0 && (ki === 0 || ki === row.keys - 1) ? 1.5 : 1),
                height: 14,
                background: 'linear-gradient(to bottom, #1a0a30, #0f0520)',
                borderRadius: 4,
                border: '1px solid rgba(139,92,246,0.2)',
                boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.5), 0 0 4px rgba(124,58,237,0.05)',
              }} />
            ))}
          </div>
        ))}
        {/* Touchpad */}
        <div style={{
          width: '35%',
          height: 22,
          marginTop: 4,
          background: 'linear-gradient(135deg, #120820, #0d0418)',
          borderRadius: 6,
          border: '1px solid rgba(139,92,246,0.18)',
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)',
        }} />
      </motion.div>
    </motion.div>
  );
}

export default function Hero3D() {
  const heroRef = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef, { once: true });

  return (
    <div ref={heroRef} style={{
      position: 'relative', width: '100vw', minHeight: '100vh',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse 120% 80% at 50% -10%, #1e0047 0%, #0a0018 40%, #04000d 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      paddingTop: 90, paddingBottom: 60,
    }}>
      {/* Radial glow blobs */}
      <div style={{ position: 'absolute', left: '20%', top: '30%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(192,38,211,0.06) 40%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', right: '15%', bottom: '20%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,38,211,0.12) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Main layout: text left + monitor right on wide, stacked on mobile */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 1200,
        padding: '0 clamp(16px, 4vw, 48px)',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'center',
        gap: '40px 60px',
      }}>
        {/* ---- LEFT: text content ---- */}
        <div style={{ flex: '1 1 320px', maxWidth: 540, textAlign: 'left' }}>
          {/* Logo + badge row */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}
          >
            <motion.div
              animate={{ filter: ['drop-shadow(0 0 8px rgba(167,139,250,0.5))', 'drop-shadow(0 0 20px rgba(192,38,211,0.7))', 'drop-shadow(0 0 8px rgba(167,139,250,0.5))'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <WebfixxiesLogo size={52} />
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
              fontSize: 'clamp(42px, 8vw, 96px)', fontWeight: 900,
              lineHeight: 0.9, letterSpacing: '-0.03em', textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #f5f0ff 0%, #c4b5fd 35%, #e879f9 65%, #818cf8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              marginBottom: 28,
              filter: 'drop-shadow(0 0 40px rgba(167,139,250,0.4))',
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
              maxWidth: 480, fontSize: 'clamp(14px, 1.6vw, 17px)', fontWeight: 300,
              lineHeight: 1.8, color: '#c4b5fd', marginBottom: 44, letterSpacing: '0.02em',
            }}
          >
            Dismantling the limitations of the traditional web. We engineer
            high-performance, hardware-accelerated 3D digital environments
            designed to command market attention.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
          >
            <a href="#mission" className="btn-primary" style={{ textDecoration: 'none' }}>
              Explore Our Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
            <a href="#contact" className="btn-outline" style={{ textDecoration: 'none' }}>
              Get In Touch
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.65 }}
            style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}
          >
            {[{ value: '3D', label: 'Immersive UI' }, { value: '<2ms', label: 'Latency' }, { value: '100%', label: 'Custom Built' }].map(stat => (
              <div key={stat.label}>
                <div className="font-display" style={{ fontSize: 26, fontWeight: 800, background: 'linear-gradient(135deg, #a78bfa, #e879f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{stat.value}</div>
                <div className="font-mono" style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(124,58,237,0.6)', marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ---- RIGHT: Desktop/Monitor frame with 3D canvas ---- */}
        <div style={{ flex: '1 1 340px', maxWidth: 680, display: 'flex', justifyContent: 'center' }}>
          <DesktopFrame>
            <div style={{ width: '100%', aspectRatio: '16/10', position: 'relative', background: 'radial-gradient(ellipse 120% 80% at 50% -10%, #1e0047 0%, #0a0018 40%, #04000d 100%)' }}>
              <Canvas camera={{ position: [0, 0, 9], fov: 42 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]} style={{ background: 'transparent', width: '100%', height: '100%' }}>
                <Scene />
              </Canvas>
              {/* Screen inner glow */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
            </div>
          </DesktopFrame>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
        style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, pointerEvents: 'none',
        }}
      >
        <div style={{ width: 1.5, height: 48, background: 'linear-gradient(to bottom, transparent, rgba(167,139,250,0.6), transparent)', animation: 'float 2s ease-in-out infinite' }} />
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.35em', color: 'rgba(124,58,237,0.7)', textTransform: 'uppercase' }}>Scroll ↓</span>
      </motion.div>

      {/* HUD corner elements */}
      <div className="hud-element" style={{ position: 'absolute', top: 100, left: 24, zIndex: 3, opacity: 0.4 }}>+ SYS.ONLINE</div>
      <div className="hud-element" style={{ position: 'absolute', top: 100, right: 24, zIndex: 3, opacity: 0.4 }}>+ LATENCY: 2ms</div>
      <div className="hud-element" style={{ position: 'absolute', bottom: 28, left: 24, zIndex: 3, opacity: 0.4 }}>+ W.F.PROTOCOL</div>
      <div className="hud-element" style={{ position: 'absolute', bottom: 28, right: 24, zIndex: 3, opacity: 0.4 }}>+ MATRIX.ACTIVE</div>
    </div>
  );
}
