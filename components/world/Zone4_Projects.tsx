'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { NightCityBackground, NeonSignStrip } from './NightCityBuildings'
import { BR } from '@/lib/constants'

export function Zone4_Projects() {
  const reflections = useMemo(() => [
    { x:-2, z:-2, c:BR.red,  w:2,   d:5  },
    { x: 3, z:-5, c:BR.blue, w:1.5, d:4  },
    { x: 0, z:-9, c:BR.red,  w:3,   d:6  },
    { x:-3, z:-12,c:BR.blue, w:1.5, d:4  },
  ], [])

  const projectData = useMemo(() => [
    { x:-3.5, z:1,   c:BR.blue },
    { x: 3.5, z:-2,  c:BR.red },
    { x:-3.5, z:-5,  c:BR.blue },
    { x: 3.5, z:-8,  c:BR.red },
    { x:-3.5, z:-11, c:BR.blue },
    { x: 3.5, z:-14, c:BR.red },
    { x: 0,   z:-17, c:BR.blue },
  ], [])

  return (
    <group position={[0, 0, -105]}>
      {/* Intense red/blue lighting */}
      <pointLight position={[-5, 5, 2]}  color={BR.red} intensity={5} distance={25} decay={2} />
      <pointLight position={[ 5, 4, 0]}  color={BR.blue} intensity={4} distance={22} decay={2} />
      <pointLight position={[ 0, 2, -8]} color={BR.red} intensity={3} distance={25} decay={2} />

      <NightCityBackground zOffset={-105} />

      {/* Wet market floor */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -3.5, -5]}>
        <planeGeometry args={[22, 30, 1, 1]} />
        <meshStandardMaterial color="#050810" metalness={0.95} roughness={0.05}
          emissive="#050308" emissiveIntensity={0.5} />
      </mesh>

      {/* Floor reflections */}
      {reflections.map((r, i) => (
        <mesh key={i} rotation={[-Math.PI/2,0,0]} position={[r.x, -3.4, r.z]}>
          <planeGeometry args={[r.w, r.d, 1, 1]} />
          <meshBasicMaterial color={r.c} transparent opacity={0.15}
            blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}

      {/* Stall neon signs */}
      <NeonSignStrip position={[-5, 1.5, 0]}    color={BR.red} width={2.5} />
      <NeonSignStrip position={[ 5, 1,   -4]}   color={BR.blue} width={2}   />
      <NeonSignStrip position={[-4.5, 0.5, -8]} color={BR.red} width={2.5} />
      <NeonSignStrip position={[ 5, 1.5, -12]}  color={BR.blue} width={2}   />

      {/* 7 project panels — using optimized SimpleFloat component to limit Float usage */}
      {projectData.map((p, i) => (
        <SimpleFloat key={i} position={[p.x, 0, p.z]} color={p.c} delay={i * 0.2} />
      ))}
    </group>
  )
}

function SimpleFloat({ position, color, delay }: { position: [number,number,number], color: string, delay: number }) {
  const ref = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!ref.current) return
    // High performance sine wave movement
    const t = state.clock.elapsedTime + delay
    ref.current.position.y = Math.sin(t * 0.8) * 0.15
    ref.current.rotation.z = Math.sin(t * 0.4) * 0.02
  })

  return (
    <group ref={ref} position={position}>
      <mesh>
        <boxGeometry args={[3.2, 2.2, 0.04]} />
        <meshStandardMaterial color="#06060c" transparent opacity={0.1}
          emissive={color} emissiveIntensity={0.1} />
      </mesh>
      {/* Top border */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[3.2, 0.04, 0.05]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={8} />
      </mesh>
      {/* Bottom border */}
      <mesh position={[0, -1.1, 0]}>
        <boxGeometry args={[3.2, 0.03, 0.05]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={6} />
      </mesh>
      {/* Glow dot */}
       <mesh position={[1.4, 0.9, 0.05]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={10} />
      </mesh>
    </group>
  )
}
