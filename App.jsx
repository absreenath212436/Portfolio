import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ambientLight, directionalLight } from '@react-three/drei';
import Avatar3D from './Avatar3D';

const availableActions = ["Wave", "Point", "Celebrate", "Thinking"]; // Replace with exact animation clip names from your model

export default function App() {
  const [currentAction, setCurrentAction] = useState("Wave");

  return (
    <div className="app-container" style={{ height: '100vh', width: '100vw' }}>
      {/* Avatar Canvas */}
      <Canvas camera={{ position: [0, 1.5, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[0, 5, 10]} />
        <Avatar3D actionName={currentAction} />
        <OrbitControls enableZoom={true} />
      </Canvas>

      {/* Controls to switch gestures */}
      <div style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 8, padding: 10 }}>
        {availableActions.map((action) => (
          <button
            key={action}
            onClick={() => setCurrentAction(action)}
            style={{
              marginRight: 10,
              padding: '8px 12px',
              backgroundColor: currentAction === action ? '#4f46e5' : '#e0e7ff',
              color: currentAction === action ? 'white' : 'black',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

