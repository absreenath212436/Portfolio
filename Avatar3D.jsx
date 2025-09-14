import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function Avatar3D(props) {
  const group = useRef();
  const { scene, animations } = useGLTF('/Sree.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play a default animation (replace "Wave" with your animation clip name)
    const actionName = 'Wave';  // You can list and play specific animations here
    if (actions && actions[actionName]) {
      actions[actionName].reset().fadeIn(0.5).play();
    }
  }, [actions]);

  return <primitive ref={group} object={scene} {...props} />;
}

useGLTF.preload('/Sree.glb');
