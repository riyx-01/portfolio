'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BR } from '@/lib/constants'

// Persona 5 Style Stylized Building (Tapered or Slanted)
function Skyscraper({
  x, z, width, height, depth, windowColor
}: {
  x: number; z: number; width: number
  height: number; depth: number; windowColor: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <group position={[x, height/2 - 4, z]}>
      {/* Realistic Boxy Building Structure */}
      <mesh>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color="#0A0A1A" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Structured Wireframe/Structural Grid for clarity */}
      <mesh>
        <boxGeometry args={[width + 0.1, height + 0.1, depth + 0.1]} />
        <meshBasicMaterial color={windowColor} wireframe transparent opacity={0.15} toneMapped={false} />
      </mesh>
      
      {/* Realistic Window Grid Lines instead of scattered strips */}
      {Array.from({ length: Math.floor(height / 4) }).map((_, i) => (
        <mesh key={i} position={[0, (i - Math.floor(height/8)) * 4, depth/2 + 0.05]}>
          <planeGeometry args={[width * 0.8, 0.2]} />
          <meshBasicMaterial color={windowColor} transparent opacity={0.8}
            blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </mesh>
      ))}

      {/* Red vertical detail strip */}
      <mesh position={[width/2, 0, width/2]}>
        <boxGeometry args={[0.05, height, 0.05]} />
        <meshStandardMaterial color={BR.red} emissive={BR.red} emissiveIntensity={6} toneMapped={false} />
      </mesh>
    </group>
  )
}

// Full city skyline
export function NightCityBackground({ zOffset = 0 }: { zOffset?: number }) {
  const buildings = useMemo(() => [
    { x: -16, z: zOffset - 18, w: 4.5, h: 32, d: 3,   c: BR.red },
    { x: -11, z: zOffset - 16, w: 3.2, h: 25, d: 2.5, c: BR.blue },
    { x: -22, z: zOffset - 25, w: 5.5, h: 45, d: 4,   c: BR.red },
    { x: -4,  z: zOffset - 24, w: 4.0, h: 52, d: 3.5, c: BR.red },
    { x:  2,  z: zOffset - 20, w: 3.0, h: 35, d: 3,   c: BR.blue },
    { x:  8,  z: zOffset - 26, w: 4.5, h: 48, d: 3,   c: BR.red },
    { x: 15,  z: zOffset - 22, w: 4.2, h: 38, d: 3.5, c: BR.blue },
    { x: 25,  z: zOffset - 35, w: 6.5, h: 65, d: 5,   c: BR.red },
  ], [zOffset])

  return (
    <group>
      {buildings.map((b, i) => (
        <Skyscraper key={i}
          x={b.x} z={b.z}
          width={b.w} height={b.h} depth={b.d}
          windowColor={b.c}
        />
      ))}
    </group>
  )
}

export function NeonSignStrip({
  position, color, width, label
}: {
  position: [number,number,number]
  color: string; width: number; label?: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.MeshStandardMaterial
    mat.emissiveIntensity = 5 + Math.sin(state.clock.elapsedTime * 15) * 1.5
  })

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[width, 1.2, 0.3]} />
        <meshStandardMaterial color="#050510" />
      </mesh>
      <mesh ref={meshRef} position={[0, 0, 0.16]}>
        <planeGeometry args={[width * 0.95, 0.9]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={8} />
      </mesh>
      <pointLight 
        position={[0, 0, 1]} 
        color={color} 
        intensity={4} 
        distance={15} 
        decay={2}
      />
    </group>
  )
}
