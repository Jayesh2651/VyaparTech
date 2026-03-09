import { useRef, useMemo, useEffect, useState, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const AnimatedSphere = memo(() => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color="#6366F1"
          roughness={0.3}
          metalness={0.7}
          distort={0.2}
          speed={1.2}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
});

AnimatedSphere.displayName = "AnimatedSphere";

const ParticleField = memo(() => {
  const count = 60;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#06B6D4" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
});

ParticleField.displayName = "ParticleField";

/** CSS-only fallback for mobile — no Three.js overhead */
const MobileFallback = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div
      className="absolute w-[300px] h-[300px] rounded-full opacity-20 blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float"
      style={{ background: "hsl(239 84% 67%)" }}
    />
    <div
      className="absolute w-[200px] h-[200px] rounded-full opacity-15 blur-[60px] top-1/3 left-1/3 animate-float-slow"
      style={{ background: "hsl(187 94% 43%)" }}
    />
  </div>
);

const HeroScene = () => {
  const [isMobile, setIsMobile] = useState(true); // default mobile to avoid flash

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) return <MobileFallback />;

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        performance={{ min: 0.5 }}
        frameloop="demand"
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#6366F1" />
        <directionalLight position={[-3, -3, 2]} intensity={0.3} color="#06B6D4" />
        <AnimatedSphere />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default memo(HeroScene);
