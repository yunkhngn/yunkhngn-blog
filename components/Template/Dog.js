import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { useState, useEffect } from 'react';

const DogModel = () => {
  const modelRef = useRef();
  const [speed, setSpeed] = useState(0.7); 
  const { scene } = useGLTF('/dog.glb', true); 
  const [fixedSpeed, setFixedSpeed] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setFixedSpeed(true);
    }, 3200); 

    return () => clearTimeout(timer);
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      const rotationSpeed = fixedSpeed ? 0.01 : speed;
      modelRef.current.rotation.y += rotationSpeed;
      if (!fixedSpeed) {
        setSpeed(prev => Math.max(prev * 0.98, 0.01)); 
      }
    }
  });

  return (
    <primitive 
        ref={modelRef} 
        object={scene} 
        scale={[0.45, 0.45, 0.45]} 
        castShadow 
        position={[0, 0, 0]}
        receiveShadow 
    />
  );
};

const Dog = ({theme}) => {
  return (
    <Canvas 
    shadows 
    dpr={[1, 2]} 
    camera={{ position: [3, 3, 3], fov: 50 }} 
    style={{ width: '100%', height: '100%' }}
    gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputEncoding: THREE.sRGBEncoding }}
    >
      {/* Ánh sáng */}
      <ambientLight intensity={(theme === 'light' ? 3 : 1)} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />

      {/* Model */}
      <DogModel />
      <OrbitControls enableZoom={false}/>
    </Canvas>
  );
};

export default Dog;