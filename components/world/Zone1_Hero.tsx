'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { NightCityBackground, NeonSignStrip } from './NightCityBuildings'
import { BR } from '@/lib/constants'

export function Zone1_Hero() {
  const reflections = useMemo(() => [
    { x: -3, z: 0, w: 3, d: 5, color: BR.red, opacity: 0.15 },
    { x:  3, z: -1, w: 2, d: 4, color: BR.blue, opacity: 0.12 },
    { x:  0, z:  1, w: 4, d: 3, color: BR.red, opacity: 0.1  },
  ], [])

  return (
    <group position={[0, 0, 0]}>
      <pointLight position={[0,  6, 2]}   color={BR.red} intensity={8}   distance={30} decay={2} />
      <pointLight position={[-5, 3, -2]}  color={BR.blue} intensity={6}   distance={25} decay={2} />
      <pointLight position={[ 5, 3, -2]}  color={BR.red} intensity={6} distance={25} decay={2} />

      <NightCityBackground zOffset={0} />

      {/* Wet City Street */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -3.5, 2]}>
        <planeGeometry args={[40, 20, 1, 1]} />
        <meshStandardMaterial color="#050810" metalness={0.95} roughness={0.05} emissive="#040612" emissiveIntensity={0.5} />
      </mesh>

      {/* Reflections */}
      {reflections.map((r, i) => (
        <mesh key={i} rotation={[-Math.PI/2, 0, 0]} position={[r.x, -3.4, r.z]}>
          <planeGeometry args={[r.w, r.d, 1, 1]} />
          <meshBasicMaterial color={r.color} transparent opacity={r.opacity} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}

      {/* Huge realistic center building instead of a band */}
      <group position={[0, 0, -5]}>
        <mesh>
          <boxGeometry args={[4, 15, 3]} />
          <meshStandardMaterial color="#04040A" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Glow windows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[0, i * 1.5 - 5, 1.51]}>
            <planeGeometry args={[3.5, 0.4]} />
            <meshBasicMaterial color={BR.red} toneMapped={false} />
          </mesh>
        ))}
      </group>

      {/* HERO BUILDING TOTEM - replacing abstract orb */}
      <group position={[-3.5, 1, -2]} rotation={[0, Math.PI/6, 0]}>
        <mesh>
          <cylinderGeometry args={[0.7, 1.1, 7, 4]} />
          <meshStandardMaterial color="#050510" metalness={1} roughness={0} />
        </mesh>
        {/* Glowing window detail */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={i} position={[0, i * 0.5 - 2.5, 0.82]}>
            <planeGeometry args={[0.4, 0.12]} />
            <meshStandardMaterial color={BR.red} emissive={BR.red} emissiveIntensity={10} />
          </mesh>
        ))}
        <pointLight color={BR.red} intensity={4} distance={10} />
      </group>

      {/* Structural nightlife elements */}
      <mesh position={[0, -1.5, -1]}>
        <boxGeometry args={[10, 0.15, 4]} />
        <meshStandardMaterial color="#0a1214" roughness={0.8} metalness={0.6} />
      </mesh>
      <mesh position={[0, -1.42, 1]}>
        <boxGeometry args={[10, 0.04, 0.04]} />
        <meshStandardMaterial color={BR.blue} emissive={BR.blue} emissiveIntensity={10} />
      </mesh>
    </group>
  )
}
