import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment } from '@react-three/drei';
import * as THREE from 'three';

function AvatarNavigator({ currentAction }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/Portfolio/avatar.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return;
    
    const animNames = Object.keys(actions);
    let targetAnim = animNames[0]; // fallback
    
    if (currentAction) {
      const match = animNames.find(n => n.toLowerCase().includes(currentAction.toLowerCase()));
      if (match) targetAnim = match;
    }
    
    if (actions[targetAnim]) {
      actions[targetAnim].reset().fadeIn(0.5).play();
      return () => {
        if (actions[targetAnim]) actions[targetAnim].fadeOut(0.5);
      };
    }
  }, [currentAction, actions]);

  useFrame((state) => {
    if (group.current) {
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(state.clock.elapsedTime * 2) * 0.05 - 2, 0.1);
    }
  });

  return (
    <group ref={group} position={[3, -2, 2.5]} scale={2.5} rotation={[0, -0.6, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/Portfolio/avatar.glb');

export default function Scene({ currentAction }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', background: '#ffffff' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#fff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#fbbf24" />
        <Environment preset="city" />
        <AvatarNavigator currentAction={currentAction} />
      </Canvas>
    </div>
  );
}
