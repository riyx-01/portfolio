'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { NightCityBackground } from './NightCityBuildings'
import { BR } from '@/lib/constants'

export function Zone3_Skills() {
  const corridorData = useMemo(() => [
    { x: -5.5, color: BR.red },
    { x:  5.5, color: BR.blue }
  ], [])

  const ceilingBars = useMemo(() => [
    { x: -2, color: BR.blue },
    { x:  0, color: BR.red },
    { x:  2, color: BR.blue }
  ], [])

  return (
    <group position={[0, 0, -70]}>
      <pointLight position={[-8, 4, 0]}  color={BR.red} intensity={6} distance={25} decay={2} />
      <pointLight position={[ 8, 2, 0]}  color={BR.blue} intensity={4} distance={22} decay={2} />
      <pointLight position={[ 0, 6, -5]} color={BR.red} intensity={3} distance={18} decay={2} />

      <NightCityBackground zOffset={-70} />

      {/* Tech floor grid */}
      <gridHelper args={[30, 24, BR.blue, '#0a1a18']} position={[0, -3.5, 0]} />

      {/* SERVER CORRIDOR */}
      {corridorData.map((side, i) => (
        <group key={i} position={[side.x, 0, 0]}>
          {Array.from({ length: 5 }, (_, j) => (
            <mesh key={j} position={[0, -2 + j * 1, 0]}>
              <boxGeometry args={[1.4, 0.85, 3.5]} />
              <meshStandardMaterial color="#08080e" roughness={0.9} metalness={0.7}
                emissive={side.color} emissiveIntensity={0.2} />
            </mesh>
          ))}
          {/* Status LED strips */}
          {Array.from({ length: 5 }, (_, j) => (
            <mesh key={`led-${j}`}
              position={[i === 0 ? -0.72 : 0.72, -2 + j * 1, 1]}>
              <sphereGeometry args={[0.04, 8, 8]} /> {/* Corrected to 8 segments */}
              <meshStandardMaterial
                color={j % 2 === 0 ? BR.red : BR.blue}
                emissive={j % 2 === 0 ? BR.red : BR.blue}
                emissiveIntensity={8} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Skill constellation */}
      <SkillConstellation />

      {/* Ceiling neon bars */}
      {ceilingBars.map((bar, i) => (
        <mesh key={i} position={[bar.x, 4.5, 0]}>
          <boxGeometry args={[0.06, 0.06, 16]} />
          <meshStandardMaterial
            color={bar.color}
            emissive={bar.color} emissiveIntensity={6}
            transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

function SkillConstellation() {
  const points = useMemo(() => {
    const p = []
    const tempVec = new THREE.Vector3()
    for (let i = 0; i < 40; i++) {
      tempVec.set(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2
      )
      p.push(tempVec.clone().toArray()) // Pre-convert to array for performance
    }
    return p
  }, [])

  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
  })

  return (
    <group ref={groupRef}>
      {points.map((p, i) => (
        <mesh key={i} position={p as [number,number,number]}>
          <sphereGeometry args={[0.03, 8, 8]} /> {/* Corrected to 8 segments */}
          <meshBasicMaterial color={i % 2 === 0 ? BR.blue : BR.red} />
          {i % 4 === 0 && <pointLight color={i % 2 === 0 ? BR.blue : BR.red} intensity={0.5} distance={1} />}
        </mesh>
      ))}
    </group>
  )
}
