'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { JourneyWorld } from './JourneyWorld'
import { Rain } from './Rain'
import { Particles } from './Particles'
import { CameraRig } from './CameraRig'
import { PostProcessing } from './PostProcessing'
import * as THREE from 'three'
import { BR, FOG_NEAR, FOG_FAR } from '@/lib/constants'

export function WorldExperience() {
  return (
    <Canvas
      gl={{ 
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
        logarithmicDepthBuffer: false,
      }}
      shadows={false}
      dpr={1}
      frameloop="always"
      performance={{ min: 0.5 }}
      style={{
        filter: 'brightness(1.15) saturate(1.2) contrast(1.1)'
      }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* <color attach="background" args={[BR.void]} /> */}
      <fog attach="fog" args={[BR.fog, FOG_NEAR, 60]} />

      <PerspectiveCamera makeDefault fov={38} far={400} position={[0, 0, 10]} />
      
      <group>
        <JourneyWorld />
        
        <Rain />
        <Particles />
      </group>

      <CameraRig />

      <ambientLight intensity={0.15} color={BR.blue} />
    </Canvas>
  )
}
