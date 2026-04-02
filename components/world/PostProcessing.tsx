'use client'
import { EffectComposer, Bloom, Vignette, ChromaticAberration, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import * as THREE from 'three'

export function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.15}  // lower threshold = more glow (neon signs bloom hard)
        luminanceSmoothing={0.85}
        intensity={1.6}            // strong — neon city needs heavy bloom
        radius={0.9}
        mipmapBlur
      />
      <Vignette offset={0.2} darkness={0.75} />
      <ChromaticAberration 
        offset={new THREE.Vector2(0.001, 0.001)} 
        radialModulation={false}
        modulationOffset={0}
      />
      <ToneMapping mode={ToneMappingMode.REINHARD} />
    </EffectComposer>
  )
}
