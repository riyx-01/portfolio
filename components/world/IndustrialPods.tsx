'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BR } from '@/lib/constants'

export function IndustrialPods() {
  return (
    <group>
      {/* Pods/Chambers (MESHES 1,2,3) */}
      {[[-8, 0, -10], [8, 0, -10], [0, 8, -15]].map((pos, i) => (
        <group key={i} position={pos as [number,number,number]}>
          <mesh>
            <cylinderGeometry args={[2.5, 2.5, 8, 12]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.9} />
          </mesh>
          {/* Glowing Glass (MESHES 4,5,6 inside loop) */}
          <mesh position={[0, 0, 1.2]}>
            <planeGeometry args={[2, 6]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} transparent opacity={0.3} />
          </mesh>
        </group>
      ))}

      {/* Industrial Beams (MESHES 7,8) */}
      <mesh position={[0, 4, -5]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.5, 40, 0.5]} />
        <meshStandardMaterial color="#111" roughness={1} />
      </mesh>
      <mesh position={[0, -2, -5]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.5, 40, 0.5]} />
        <meshStandardMaterial color="#111" roughness={1} />
      </mesh>

      {/* Floor - Wet Metallic (MESH 9) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#050505" metalness={1} roughness={0.05} emissive="#000808" emissiveIntensity={0.2} />
      </mesh>

      {/* Volumetric Light Rays (MESHES 10,11,12) */}
      <LightRay x={-10} z={-5} color="#00f0ff" />
      <LightRay x={10} z={-5} color="#ff2a00" />
      <LightRay x={0} z={-20} color="#00f0ff" />
    </group>
  )
}

function LightRay({ x, z, color }: { x: number, z: number, color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  })
  return (
    <mesh ref={ref} position={[x, 10, z]} rotation={[Math.PI / 8, 0, 0]}>
      <cylinderGeometry args={[0.1, 4, 30, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  )
}
