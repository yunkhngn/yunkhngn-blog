import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const DogModel = () => {
  const modelRef = useRef();
  const { scene } = useGLTF('/dog.glb', true); 
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005; 
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