'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMousePosition } from '@/lib/useMousePosition'
import * as THREE from 'three'
import { CAMERA_Z_START, CAMERA_Z_END, FRAME_END_PERCENT } from '@/lib/constants'

export function CameraRig() {
  const mouse = useMousePosition()
  
  useFrame((state, delta) => {
    // Normalizing scroll from DOM
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const p = Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
    const progress = Math.min(Math.max((p - FRAME_END_PERCENT) / (1 - FRAME_END_PERCENT), 0), 1)
    
    // Target Z based on normalized scroll
    const targetZ = CAMERA_Z_START + (CAMERA_Z_END - CAMERA_Z_START) * progress

    // Mouse drift
    const targetX = mouse.x * 0.8
    const targetY = -mouse.y * 0.4

    // Smooth lerp (framerate independent)
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 8, delta)
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 5, delta)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 5, delta)

    // Fixed lookAt to prevent wild swinging
    state.camera.lookAt(0, 0, state.camera.position.z - 20)
  })

  return null
}
