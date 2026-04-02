'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FogLayer({
  z, y, opacity, color, speed
}: {
  z: number; y: number; opacity: number; color: string; speed: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    // Fog slowly drifts horizontally — breathing effect
    ref.current.position.x = Math.sin(state.clock.elapsedTime * speed) * 3
    ref.current.position.y = y + Math.cos(state.clock.elapsedTime * speed * 0.5) * 0.5
  })
  return (
    <mesh ref={ref} position={[0, y, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[60, 40]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export function FogVolume() {
  // Layers at different Z depths — creates atmospheric depth
  const layers = [
    { z: -5,   y: -1,  opacity: 0.018, color: '#4fa8d5', speed: 0.08 },
    { z: -20,  y: 0,   opacity: 0.022, color: '#1a1040', speed: 0.06 },
    { z: -40,  y: 1,   opacity: 0.02,  color: '#4fa8d5', speed: 0.09 },
    { z: -60,  y: -1,  opacity: 0.025, color: '#e8622a', speed: 0.05 },
    { z: -80,  y: 0.5, opacity: 0.02,  color: '#1a1040', speed: 0.07 },
    { z: -100, y: -1,  opacity: 0.025, color: '#d4547a', speed: 0.06 },
    { z: -120, y: 1,   opacity: 0.018, color: '#4fa8d5', speed: 0.08 },
    { z: -140, y: 0,   opacity: 0.03,  color: '#e8622a', speed: 0.05 },
  ]
  return (
    <>
      {layers.map((l, i) => <FogLayer key={i} {...l} />)}
    </>
  )
}
