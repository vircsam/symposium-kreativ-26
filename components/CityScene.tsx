
import React, { useRef, useMemo, useEffect,useState} from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, Text, MeshDistortMaterial, Stars, Sparkles, Ring } from '@react-three/drei';
import * as THREE from 'three';

const NeuralCoreAxis = ({
  x = 0,          // center horizontally
  y = 0,          // center vertically
  levels = 8,     
  baseSize = 19,   
}: {
  x?: number
  y?: number
  levels?: number
  baseSize?: number
}) => {
  const groupRef = useRef<THREE.Group>(null)
  const nodesRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.Group>(null)

  /* ======================== */
  /* PYRAMID NODE POSITIONS */
  /* ======================== */
  const nodePositions = useMemo(() => {
    const pts: THREE.Vector3[] = []

    const triangleVertices = [
      new THREE.Vector3(-0.5, 0, -Math.sqrt(3) / 6),
      new THREE.Vector3(0.5, 0, -Math.sqrt(3) / 6),
      new THREE.Vector3(0, 0, Math.sqrt(3) / 3),
    ]

    const totalHeight = levels * 1.8

    for (let l = 0; l < levels; l++) {
      const yOffset = l * 1.2 - totalHeight / 2  // shift downward to center
      const scale = ((levels - l) / levels) * baseSize

      triangleVertices.forEach(v => {
        pts.push(new THREE.Vector3(v.x * scale, yOffset, v.z * scale))
      })
    }

    // Tip of pyramid
    pts.push(new THREE.Vector3(0, totalHeight / 2, 0))

    return pts
  }, [levels, baseSize])

  /* ======================== */
  /* NEURAL CONNECTIONS */
  /* ======================== */
  const connections = useMemo(() => {
    const pairs: [THREE.Vector3, THREE.Vector3][] = []

    nodePositions.forEach((a, i) => {
      nodePositions.forEach((b, j) => {
        if (i === j) return
        if (a.distanceTo(b) < baseSize * 1.2) {
          pairs.push([a, b])
        }
      })
    })

    return pairs
  }, [nodePositions, baseSize])

  /* ======================== */
  /* ANIMATION */
  /* ======================== */
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (groupRef.current) groupRef.current.rotation.y = t * 0.15
    if (nodesRef.current) nodesRef.current.rotation.y = t * 0.25
    if (linesRef.current) linesRef.current.rotation.y = t * 0.25
  })

  return (
    <group ref={groupRef} position={[x, y-4, 0]}>
      {/* CONNECTION LINES */}
      <group ref={linesRef}>
        {connections.map(([a, b], i) => (
          <line key={i} geometry={new THREE.BufferGeometry().setFromPoints([a, b])}>
            <lineBasicMaterial
              color={i % 2 === 0 ? '#3b82f6' : '#ec4899'}
              transparent
              opacity={0.45}
            />
          </line>
        ))}
      </group>

      {/* NEURAL NODES */}
      <group ref={nodesRef}>
        {nodePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color="#020617"
              emissive={i % 2 === 0 ? '#22d3ee' : '#ec4899'}
              emissiveIntensity={3}
              metalness={1}
              roughness={0}
            />
          </mesh>
        ))}
      </group>

      {/* LIGHTS */}
      <pointLight intensity={7} distance={50} color="#22d3ee" />
      <pointLight intensity={5} distance={40} color="#ec4899" />
    </group>
  )
}


// const SkyTower = ({ height = 40 }) => {
//   const coreRef = useRef<THREE.Mesh>(null);
//   const ringRef = useRef<THREE.Mesh>(null);

//   useFrame((state) => {
//     const t = state.clock.elapsedTime;

//     if (coreRef.current) {
//       coreRef.current.rotation.y += 0.01;
//       coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
//     }

//     if (ringRef.current) {
//       ringRef.current.rotation.z = t * 0.6;
//     }
//   });

//   return (
//     <group position={[0, 10, 0]}>
//       {/* Core */}
//       <mesh ref={coreRef}>
//         <icosahedronGeometry args={[2.2, 1]} />
//         <meshStandardMaterial
//           color="#020617"
//           emissive="#ec4899"
//           emissiveIntensity={3}
//           metalness={1}
//           roughness={0}
//         />
//       </mesh>

//       {/* Orbital Ring */}
//       <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
//         <torusGeometry args={[5, 0.08, 16, 100]} />
//         <meshStandardMaterial
//           color="#3b82f6"
//           emissive="#3b82f6"
//           emissiveIntensity={5}
//         />
//       </mesh>

//       {/* Energy Sparkles */}
//       <Sparkles
//         count={300}
//         scale={12}
//         size={3}
//         speed={0.6}
//         color="#ec4899"
//         opacity={0.8}
//       />

//       {/* Glow Light */}
//       <pointLight
//         intensity={6}
//         distance={50}
//         color="#ec4899"
//       />
//     </group>
//   );
// };

const CosmicBuilding = ({ position, height, width, color, emissiveColor, scrollProgress, index }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Each building starts below ground and rises based on scroll
  // Stagger the rising effect using the index
  const riseStart = (index * 0.01) % 0.5;
  const currentRise = Math.max(0, Math.min(1, (scrollProgress - riseStart) * 3));
  const animatedY = (height / 2) * currentRise - (height * (1 - currentRise));

  useFrame((state) => {
    if (meshRef.current) {
      // Rotation movement for business towers
      if (index % 3 === 0) {
        meshRef.current.rotation.y += 0.005;
      }
      // Pulse emission
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime + index) * 0.5;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], animatedY, position[2]]}>
      <boxGeometry args={[width, height, width]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0} 
        metalness={1}
        emissive={emissiveColor}
        emissiveIntensity={1}
      />
      {/* Visual Tech Details */}
      <mesh position={[0, 0, width / 2 + 0.02]}>
        <planeGeometry args={[width * 0.8, height * 0.9]} />
        <meshStandardMaterial 
          color="#22d3ee" 
          transparent 
          opacity={0.3 * currentRise} 
          emissive="#22d3ee"
          emissiveIntensity={2}
        />
      </mesh>
    </mesh>
  );
};

export const CityScene = ({ scrollY, isMobile }: { scrollY: number; isMobile: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  
  // Calculate global scroll progress (0 to 1)
  const maxScroll = typeof window !== 'undefined' ? document.body.scrollHeight - window.innerHeight : 1000;
  const scrollProgress = Math.min(1, scrollY / maxScroll);

  const buildings = useMemo(() => {
    const temp = [];
    const colors = ['#0f172a', '#1e1b4b', '#1e293b'];
    const glowColors = ['#ec4899', '#3b82f6', '#d946ef'];

    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 8 + Math.random() * 30;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const h = 4 + Math.random() * 12;
      const w = 1.2 + Math.random() * 1.8;
      
      temp.push({
        id: i,
        position: [x, 0, z] as [number, number, number],
        height: h,
        width: w,
        color: colors[i % colors.length],
        emissiveColor: glowColors[i % glowColors.length],
        index: i
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    // Dynamic Camera Fly-through
    // Move camera in a subtle orbit that tightens/shifts as we scroll
    const angle = scrollProgress * Math.PI * 0.5;
    const radius = 35 - scrollProgress * 15;
    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius;
    camera.position.y = 15 + Math.sin(scrollProgress * Math.PI) * 10;
    camera.lookAt(0, 5 + scrollProgress * 10, 0);

    if (groupRef.current) {
      // Slow background rotation
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault fov={50} />
      <Environment preset="night" />
      
      <Stars radius={150} depth={50} count={7000} factor={4} saturation={0.5} fade speed={2} />
      <Sparkles count={400} scale={60} size={3} speed={0.5} color="#ec4899" opacity={0.5} />
      <Sparkles count={400} scale={60} size={3} speed={0.4} color="#3b82f6" opacity={0.5} />

      <ambientLight intensity={0.05} />
      <pointLight position={[20, 20, 20]} intensity={2} color="#ec4899" />
      <pointLight position={[-20, 20, -20]} intensity={2} color="#3b82f6" />
      <group ref={groupRef}>
  {/* Neural Network Core Axis */}
  {!isMobile && <NeuralCoreAxis x={14} y={12} />}

  {/* City */}
  {buildings.map((b) => (
    <CosmicBuilding key={b.id} {...b} scrollProgress={scrollProgress} />
  ))}

  {/* Floor */}
  ...
</group>

      <group ref={groupRef}>
        {/* Sky Tower */}
        


        {/* Business and Standard Buildings */}
        {buildings.map((b) => (
          <CosmicBuilding key={b.id} {...b} scrollProgress={scrollProgress} />
        ))}

        {/* Floor - Infinite Dark Ocean */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
          <circleGeometry args={[100, 64]} />
          <meshStandardMaterial 
            color="#02020a" 
            roughness={0.01} 
            metalness={1} 
          />
        </mesh>

        {/* Floating Abstract Tech Elements */}
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
          <group position={[15, 20, -10]}>
             <mesh>
              <dodecahedronGeometry args={[2, 0]} />
              <meshStandardMaterial 
                color="#ec4899" 
                emissive="#ec4899" 
                emissiveIntensity={2} 
                wireframe 
              />
            </mesh>
            <Text
              position={[0, 3, 0]}
              fontSize={1}
              color="#ec4899"
              anchorX="center"
              anchorY="middle"
            >
              CORE-AXIS
            </Text>
          </group>
        </Float>
      </group>
      
      {/* Cosmic Fog */}
      <fog attach="fog" args={['#020210', 30, 80]} />
    </>
  );
};
