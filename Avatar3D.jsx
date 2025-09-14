import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function Avatar3D({ actionName = "Wave", ...props }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/Sree.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions) return;

    // Stop all animations first
    Object.values(actions).forEach(action => action.stop());

    // Play chosen animation if available
    if (actions[actionName]) {
      actions[actionName].reset().fadeIn(0.5).play();
    } else {
      // Default to Idle or first animation if actionName not found
      const keys = Object.keys(actions);
      if (keys.length > 0) actions[keys[0]].play();
    }
  }, [actions, actionName]);

  return <primitive ref={group} object={scene} {...props} />;
}

useGLTF.preload('/Sree.glb');
