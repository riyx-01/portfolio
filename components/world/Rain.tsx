'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BR } from '@/lib/constants'

interface Props {
  count?: number
}

export function Rain({ count = 300 }: Props) {
  const meshRef = useRef<THREE.Points>(null)
  
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = Math.random() * 40
      pos[i * 3 + 2] = (Math.random() - 0.5) * 150 - 40
      vel[i] = 0.5 + Math.random() * 0.5
    }
    return { positions: pos, velocities: vel }
  }, [count])

  useFrame(() => {
    if (!meshRef.current) return
    const attr = meshRef.current.geometry.attributes.position
    
    // Performance: Use simple loop, no array instance methods
    for (let i = 0; i < count; i++) {
      let y = attr.getY(i)
      y -= velocities[i]
      if (y < -20) y = 20
      attr.setY(i, y)
    }
    attr.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={BR.blue}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
