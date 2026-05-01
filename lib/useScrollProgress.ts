'use client'
import { useEffect, useState } from 'react'
import { FRAME_END_PERCENT } from './constants'

export const ZONE_BOUNDARIES = [
  0,      // Zone 0 start (Hero)
  0.18,   // Zone 1 start (About)
  0.36,   // Zone 2 start (Skills)
  0.54,   // Zone 3 start (Projects)
  0.72,   // Zone 4 start (Achievement)
  0.88,   // Zone 5 start (Contact)
  1.0,    // End
]

export function getZoneOpacity(
  progress: number,
  zoneStart: number,
  zoneEnd: number
): number {
  const fadeIn  = 0.03  // 3% of total scroll = fade in duration
  const fadeOut = 0.03  // 3% of total scroll = fade out duration

  if (progress < zoneStart) return 0
  if (progress > zoneEnd)   return 0

  // Fade in
  if (progress < zoneStart + fadeIn) {
    return (progress - zoneStart) / fadeIn
  }
  // Fade out
  if (progress > zoneEnd - fadeOut) {
    return (zoneEnd - progress) / fadeOut
  }
  // Fully visible in the middle
  return 1
}

export interface ScrollState {
  progress: number
  isFramePhase: boolean
  frameProgress: number
  worldProgress: number
}

export function useScrollProgress(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    isFramePhase: true,
    frameProgress: 0,
    worldProgress: 0,
  })

  useEffect(() => {
    let ticking = false
    let raf: number

    const handler = () => {
      if (ticking) return
      ticking = true
      
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement
        const scrollY = window.scrollY
        const maxScroll = doc.scrollHeight - window.innerHeight
        
        if (maxScroll <= 0) {
          ticking = false
          return
        }

        const p = Math.min(Math.max(scrollY / maxScroll, 0), 1)
        const isFramePhase = p < FRAME_END_PERCENT
        
        // Phase-specific mapping
        const fp = Math.min(p / FRAME_END_PERCENT, 1)
        const wp = p < FRAME_END_PERCENT ? 0 : (p - FRAME_END_PERCENT) / (1 - FRAME_END_PERCENT)

        setState({
          progress: p,
          isFramePhase,
          frameProgress: fp,
          worldProgress: wp
        })
        
        ticking = false
      })
    }

    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler, { passive: true })

    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
      cancelAnimationFrame(raf)
    }
  }, [])

  return state
}
