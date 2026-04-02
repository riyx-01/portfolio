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

export function WorldExperience({ scrollProgress }: { scrollProgress: number }) {
  return (
    <Canvas
      gl={{ 
        antialias: false,               // Biggest single perf gain
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
        logarithmicDepthBuffer: false,  // Disable expensive buffer
      }}
      shadows={false}
      dpr={1} // Locked to 1 for maximum performance as per request
      frameloop="always"
      performance={{ min: 0.5 }}
      style={{
        // Move visual effects to CSS filter to save GPU overhead from post-processing
        filter: 'brightness(1.15) saturate(1.2) contrast(1.1) drop-shadow(0 0 10px rgba(255, 32, 32, 0.1))'
      }}
    >
      <AdaptiveDpr pixelated />    {/* Auto-reduce DPR when FPS drops */}
      <AdaptiveEvents />

      <color attach="background" args={[BR.void]} />
      <fog attach="fog" args={[BR.fog, FOG_NEAR, 60]} /> {/* Fog far set to 60 as per request */}

      <PerspectiveCamera makeDefault fov={38} far={400} position={[0, 0, 10]} />
      
      {/* ─── CONTINUOUS JOURNEY WORLD ─── */}
      <group>
        <JourneyWorld scrollProgress={scrollProgress} />
        
        {/* Global FX */}
        <Rain />
        <Particles />
      </group>

      {/* ─── RIGS ─── */}
      <CameraRig scrollProgress={scrollProgress} />

      {/* Ambient Fill — Cool blue tint matching theme */}
      <ambientLight intensity={0.15} color={BR.blue} />
    </Canvas>
  )
}
