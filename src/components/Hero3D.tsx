import { useRef, Suspense, useMemo, useEffect } from 'react';
import { navTo } from '../utils/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshDistortMaterial, Sphere, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

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
          color="#4f46e5"
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
          color="#6366f1"
          emissive="#4338ca"
          emissiveIntensity={1.8}
          metalness={0.9}
          roughness={0.05}
          transparent
          opacity={0.9}
        />
      </Octahedron>
      <pointLight color="#4f46e5" intensity={6} distance={6} />
      <pointLight color="#6366f1" intensity={3} distance={4} position={[0, 1, 0]} />
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
        <meshStandardMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={2.5} metalness={1} roughness={0} transparent opacity={0.7} />
      </Torus>
      <Torus ref={ring2} args={[3.5, 0.018, 16, 120]} rotation={[0, Math.PI / 5, Math.PI / 4]}>
        <meshStandardMaterial color="#a5b4fc" emissive="#6366f1" emissiveIntensity={2} metalness={1} roughness={0} transparent opacity={0.55} />
      </Torus>
      <Torus ref={ring3} args={[4.2, 0.012, 16, 120]} rotation={[Math.PI / 6, Math.PI / 3, 0]}>
        <meshStandardMaterial color="#94a3b8" emissive="#4338ca" emissiveIntensity={1.5} metalness={1} roughness={0} transparent opacity={0.4} />
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
        color="#818cf8" emissive="#4f46e5" emissiveIntensity={0.8}
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
      <ambientLight intensity={0.2} color="#0d1a40" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#818cf8" />
      <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#6366f1" />
      <pointLight position={[0, 6, 0]} intensity={2} color="#4f46e5" distance={12} />
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
        touches={{ ONE: 0, TWO: 0 }}
      />
    </>
  );
}

export default function Hero3D() {
  return (
    <div style={{
      position: 'relative', width: '100vw', minHeight: '100svh', height: '100svh',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse 120% 80% at 50% -10%, #111827 0%, #080c14 40%, #07080a 100%)',
    }}>
      {/* 3D Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, touchAction: 'pan-y' }}>
        <Canvas camera={{ position: [0, -1.2, 9], fov: 42 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]} style={{ background: 'transparent', touchAction: 'pan-y' }}
          onCreated={({ gl }) => { gl.domElement.style.touchAction = 'pan-y'; }}>
          <Scene />
        </Canvas>
      </div>

      {/* Radial glow behind crystal */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.2) 0%, rgba(99,102,241,0.06) 40%, transparent 70%)',
        filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Hero text overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: 'clamp(16px, 5vw, 24px) clamp(16px, 5vw, 24px)', pointerEvents: 'none',
        background: 'linear-gradient(to bottom, transparent 50%, #07080a 100%)',
      }}>
        {/* Logo badge */}
        <div style={{ marginBottom: 24, pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 12, padding: '8px 20px', borderRadius: 100, border: '1px solid rgba(99,102,241,0.22)', background: 'rgba(79,70,229,0.08)' }}>
          <img src="logo.png" alt="Web Fixxies" style={{ width: 20, height: 20, objectFit: 'contain' }} />
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#818cf8' }}>Premium Web Development Studio</span>
        </div>

        <h1
          className="font-display glitch no-select"
          data-text="WEB FIXXIES"
          style={{
            fontSize: 'clamp(36px, 10vw, 130px)', fontWeight: 900,
            lineHeight: 0.9, letterSpacing: '-0.03em', textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #f1f5f9 0%, #a5b4fc 35%, #818cf8 65%, #6366f1 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: 'clamp(16px, 3vw, 28px)',
            filter: 'drop-shadow(0 0 40px rgba(99,102,241,0.35))',
            maxWidth: '100%', wordBreak: 'break-word',
          }}
        >
          WEB FIXXIES
        </h1>

        <p style={{
          maxWidth: 620, fontSize: 'clamp(13px, 2vw, 18px)', fontWeight: 300,
          lineHeight: 1.75, color: '#94a3b8', marginBottom: 'clamp(24px, 4vw, 44px)', letterSpacing: '0.02em',
          padding: '0 8px',
        }}>
          We engineer high-performance, visually immersive web experiences that
          command attention and drive measurable business results. Built for brands
          that refuse to blend in.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', pointerEvents: 'auto' }}>
          <a
            href="#mission"
            onClick={(e) => { e.preventDefault(); navTo('mission'); }}
            className="btn-primary"
            style={{ textDecoration: 'none' }}
          >
            Explore Our Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); navTo('contact'); }}
            className="btn-outline"
            style={{ textDecoration: 'none' }}
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, pointerEvents: 'none',
      }}>
        <div style={{ width: 1.5, height: 56, background: 'linear-gradient(to bottom, transparent, rgba(129,140,248,0.6), transparent)', animation: 'float 2s ease-in-out infinite' }} />
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.35em', color: 'rgba(99,102,241,0.7)', textTransform: 'uppercase' }}>Scroll ↓</span>
      </div>

    </div>
  );
}
