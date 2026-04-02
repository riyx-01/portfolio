'use client'
import { useEffect, useState, useRef } from 'react'
import { SCROLL_HEIGHT, FRAME_END_PERCENT, TOTAL_FRAMES } from '@/lib/constants'
import { WorldExperience } from '@/components/world/WorldExperience'
import { FrameSequence } from '@/components/overlays/FrameSequence'
import { PortfolioOverlays } from '@/components/PortfolioOverlays'
import { CyberpunkLoadScreen } from '@/components/CyberpunkLoadScreen'
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
        background: '#050208',
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
            zIndex: 0,
            pointerEvents: 'none',
          }}>
            {!framesDone ? (
              <FrameSequence progress={frameProgress} />
            ) : (
              <WorldExperience scrollProgress={worldProgress} />
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
