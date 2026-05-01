'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { NightCityBackground } from './NightCityBuildings'
import { BR } from '@/lib/constants'

export function Zone6_Contact() {
  return (
    <group position={[0, 0, -175]}>
      {/* City glow rising from below — rooftop POV */}
      <pointLight position={[0,  -5, 0]}   color={BR.red} intensity={8} distance={30} decay={2} />
      <pointLight position={[-8, -3, 0]}   color={BR.blue} intensity={6} distance={25} decay={2} />
      <pointLight position={[ 8, -3, 0]}   color={BR.red} intensity={6} distance={25} decay={2} />
      <pointLight position={[ 0,  8, -10]} color={BR.blue} intensity={4} distance={20} decay={2} />

      <NightCityBackground zOffset={-175} />

      {/* Rooftop surface */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -3.5, 0]}>
        <planeGeometry args={[28, 18, 1, 1]} />
        <meshStandardMaterial color="#05060a" metalness={0.75} roughness={0.25}
          emissive="#080512" emissiveIntensity={0.4} />
      </mesh>

      {/* City glow horizon plane */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -4, -5]}>
        <planeGeometry args={[60, 20, 1, 1]} />
        <meshBasicMaterial color={BR.red} transparent opacity={0.06}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Spinning rings */}
      <SpinningRings />

      {/* Rooftop equipment */}
      {useMemo(() => [[-4,0,-4],[3,-0.5,-3],[-2,-1,-6]], []).map((pos,i)=>(
        <mesh key={i} position={pos as [number,number,number]}>
          <boxGeometry args={[0.7+i*0.2, 0.9+i*0.2, 0.7]} />
          <meshStandardMaterial color="#06060a" roughness={1} />
        </mesh>
      ))}

      {/* Contact neon ring on ground */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -3.3, 0]}>
        <ringGeometry args={[2.5, 2.6, 32]} />
        <meshBasicMaterial color={BR.blue} transparent opacity={0.8}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  )
}

function SpinningRings() {
  const ringRefs = useRef<(THREE.Mesh | null)[]>([])
  const rings = useMemo(() => [
    { r: 4, s: 0.2,  c: BR.red },
    { r: 6, s: -0.1, c: BR.blue },
    { r: 8, s: 0.15, c: BR.red },
  ], [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ringRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.rotation.z = t * rings[i].s
      }
    })
  })

  return (
    <group position={[0, 0, -10]}>
      {rings.map((ring, i) => (
        <mesh key={i} ref={el => { ringRefs.current[i] = el }}>
          <torusGeometry args={[ring.r, 0.02, 6, 32]} />
          <meshBasicMaterial color={ring.c} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  )
}
