import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";

function AICoreMesh() {
  const meshRef = useRef();

  // Smooth, continuous cinematic rotation
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.rotation.x += delta * 0.15;
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.2}>
        {/* An intricate, tech-focused shape instead of a plain sphere */}
        <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
        
        {/* Premium Physical Material for a cinematic glass/metal look */}
        <meshPhysicalMaterial
          color="#6366f1"
          emissive="#2a2b66"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingAvatar() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={2} color="#8b5cf6" />
      <AICoreMesh />
    </Canvas>
  );
}