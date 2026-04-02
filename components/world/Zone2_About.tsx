'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { NightCityBackground } from './NightCityBuildings'
import { BR } from '@/lib/constants'

export function Zone2_About() {
  const buildingTotems = useMemo(() => [
    { pos: [-6, 1, -4], color: BR.blue, h: 8, w: 0.8 },
    { pos: [6, 0.5, -4], color: BR.red, h: 7, w: 0.9 },
    { pos: [0, 0, -8], color: BR.blue, h: 18, w: 5.5 }
  ], [])

  return (
    <group position={[0, 0, -35]}>
      <pointLight position={[-4, 3, 2]}  color={BR.blue} intensity={6} distance={25} decay={2} />
      <pointLight position={[ 4, 3, 2]}  color={BR.red} intensity={6} distance={25} decay={2} />

      <NightCityBackground zOffset={-35} />

      {/* Buildings Totems — Replacing floating tablets */}
      {buildingTotems.map((b, i) => (
        <group key={i} position={b.pos as [number,number,number]} rotation={[0, i*0.4, 0]}>
          <mesh>
            <cylinderGeometry args={[b.w * 0.7, b.w, b.h, 4]} />
            <meshStandardMaterial color="#020205" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, b.h/3, b.w/2 + 0.1]}>
            <planeGeometry args={[b.w * 0.8, 0.15]} />
            <meshStandardMaterial color={b.color} emissive={b.color} emissiveIntensity={10} />
          </mesh>
          <pointLight color={b.color} intensity={5} distance={12} />
        </group>
      ))}

      {/* Wet ground */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -3.5, 0]}>
        <planeGeometry args={[30, 20, 1, 1]} />
        <meshStandardMaterial color="#050810" metalness={0.95} roughness={0.05} emissive="#030608" emissiveIntensity={0.5} />
      </mesh>

    </group>
  )
}

