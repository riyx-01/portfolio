'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMousePosition } from '@/lib/useMousePosition'
import * as THREE from 'three'
import { CAMERA_Z_START, CAMERA_Z_END, FRAME_END_PERCENT } from '@/lib/constants'

interface Props { scrollProgress: number }

export function CameraRig({ scrollProgress }: Props) {
  const mouse = useMousePosition()
  
  useFrame((state) => {
    // Normalizing scroll: Only start moving camera after Image Sequence ends
    const progress = Math.min(Math.max((scrollProgress - FRAME_END_PERCENT) / (1 - FRAME_END_PERCENT), 0), 1)
    
    // Target Z based on normalized scroll
    const targetZ = CAMERA_Z_START + (CAMERA_Z_END - CAMERA_Z_START) * progress

    // Mouse drift
    const targetX = mouse.x * 0.8
    const targetY = -mouse.y * 0.4

    // Smooth lerp
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.08
    state.camera.position.x += (targetX - state.camera.position.x) * 0.04
    state.camera.position.y += (targetY - state.camera.position.y) * 0.04

    // Fixed lookAt to prevent wild swinging
    state.camera.lookAt(0, 0, state.camera.position.z - 20)
  })

  return null
}
