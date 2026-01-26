import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model() {
  // This path works because you put the file in the 'public' folder
  // The "/Portfolio/" part is needed for GitHub Pages
  // If testing locally, it might look broken unless we handle both cases.
  // For now, let's use the GitHub-safe path:
  const { scene } = useGLTF("/Portfolio/avatar.glb");
  
  return <primitive object={scene} scale={2} position={[0, -1, 0]} />;
}

export default function Avatar3D() {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Model />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}