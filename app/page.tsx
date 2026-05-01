'use client'
import { useEffect, useState, useRef } from 'react'
import { SCROLL_HEIGHT, FRAME_END_PERCENT, TOTAL_FRAMES } from '@/lib/constants'

import { FrameSequence } from '@/components/overlays/FrameSequence'
import { PortfolioOverlays } from '@/components/PortfolioOverlays'
import { CyberpunkLoadScreen } from '@/components/CyberpunkLoadScreen'
import MagicRings from '@/components/bits/MagicRings'
import Balatro from '@/components/bits/Balatro'
import { preloadFrames } from '@/lib/frameLoader'
import { AnimatePresence } from 'framer-motion'
import { ScanlineTransition } from '@/components/world/ScanlineTransition'

export default function Page() {
  const [framesDone, setFramesDone] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [loadProgress, setLoadProgress] = useState(0)
  const [loadDone, setLoadDone] = useState(false)
  const rafRef = useRef<number>(0)

  // 1. Initial boot: Preload assets
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }
    }
    // Corrected to use TOTAL_FRAMES constant
    preloadFrames(TOTAL_FRAMES, (pct) => setLoadProgress(pct))
  }, [])

  // 2. Optimized scroll handler — Low latency tracker
  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
        
        setScrollProgress(progress)
        
        // Threshold check for transition between image sequence and 3D world
        if (progress > FRAME_END_PERCENT) {
          if (!framesDone) setFramesDone(true)
        } else {
          if (framesDone) setFramesDone(false)
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [framesDone])

  // Maps progress to 0-1 within their respective phases
  const frameProgress = Math.min(scrollProgress / FRAME_END_PERCENT, 1)
  const worldProgress = Math.min(Math.max((scrollProgress - FRAME_END_PERCENT) / (1 - FRAME_END_PERCENT), 0), 1)

  return (
    <>
       <ScanlineTransition active={framesDone} />
       
       <div style={{ position: 'fixed', inset: 0, zIndex: -10, pointerEvents: 'none' }}>
         <Balatro 
           color1="#1a0830" 
           color2="#0a0510" 
           color3="#ff2020" 
           contrast={4.0} 
           lighting={0.3} 
           pixelFilter={600}
         />
       </div>

       <MagicRings 
         color="#ff2020" 
         colorTwo="#1e90ff" 
         followMouse={true}
         ringCount={10}
         speed={1.0}
         opacity={0.3}
       />

      <AnimatePresence>
        {!loadDone && (
          <CyberpunkLoadScreen
            progress={loadProgress}
            onComplete={() => setLoadDone(true)}
          />
        )}
      </AnimatePresence>

      <div style={{ 
        height: SCROLL_HEIGHT, 
        position: 'relative', 
        background: 'transparent',
        opacity: loadDone ? 1 : 0,
        transition: 'opacity 0.8s ease'
      }}>
        <main style={{
          pointerEvents: loadDone ? 'auto' : 'none',
        }}>
          {/* ── CANVAS LAYER ── always fixed, always z-index 0 */}
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
          }}>
            {!framesDone && (
              <FrameSequence progress={frameProgress} />
            )}
          </div>

          {/* ── PORTFOLIO OVERLAYS ── z-index 10, above canvas */}
          {framesDone && (
            <PortfolioOverlays scrollProgress={scrollProgress} />
          )}

          {/* Dummy scroll tracker */}
          <div style={{ height: SCROLL_HEIGHT, pointerEvents: 'none' }} />
        </main>
      </div>
    </>
  )
}
