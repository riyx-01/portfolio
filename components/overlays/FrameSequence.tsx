'use client'
import { useEffect, useRef, useState } from 'react'
import { preloadFrames } from '@/lib/frameLoader'
import { useMotionValue, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion'
import { TOTAL_FRAMES, BR } from '@/lib/constants'

interface Props { progress: number }

const SLIDES = [
  {
    id: 1,
    heading: ["Hi, I'm ", "Riya Thakur."],
    subtext: "MCA Candidate | Full-Stack Developer | IT Professional",
    position: 'left',
    range: [0.0, 0.18],
    color: 'red'
  },
  {
    id: 2,
    heading: ["I Build ", "Intelligent Systems."],
    subtext: "First-Class Honours Graduate (9.39 GPA) specializing in full-stack architecture and deep learning diagnostics.",
    position: 'left',
    range: [0.20, 0.36],
    color: 'blue'
  },
  {
    id: 3,
    heading: ["Built on a ", "Strong Foundation."],
    subtext: "B.Sc. IT (Hons) from S.K. Somaiya College. Currently pursuing MCA at BVIMIT.",
    position: 'right',
    range: [0.38, 0.54],
    color: 'red'
  },
  {
    id: 4,
    heading: ["Real-world ", "Solutions."],
    subtext: "From AI Health Assistants (HSync) and Deepfake Detection pipelines to Enterprise Registration Systems.",
    position: 'left',
    range: [0.56, 0.72],
    color: 'blue'
  },
  {
    id: 5,
    heading: ["Performance under ", "Pressure."],
    subtext: "Proven technical lead resolving crises for 110+ concurrent users and live directing The Hindu Awards 2025.",
    position: 'center',
    range: [0.74, 0.90],
    color: 'red'
  },
  {
    id: 6,
    heading: ["Welcome to ", "My World."],
    subtext: "",
    position: 'center',
    range: [0.92, 1.0],
    color: 'blue',
    dot: true
  }
]


// OUTSIDE the component (module-level) — persist context
let cachedCtx: CanvasRenderingContext2D | null = null

export function FrameSequence({ progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [isReady, setIsReady] = useState(false)
  
  // Create a motion value for the index
  const frameIndex = useMotionValue(progress * (TOTAL_FRAMES - 1))

  useEffect(() => {
    frameIndex.set(progress * (TOTAL_FRAMES - 1))
  }, [progress, frameIndex])

  useEffect(() => {
    // Optimization: Resolve with just first frame to allow immediate paint, 
    // then continue loading others in background
    preloadFrames(TOTAL_FRAMES, () => {}).then((imgs) => {
      setImages(imgs)
      setIsReady(true)
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    cachedCtx = canvas.getContext('2d', {
      alpha: false,
    })
  }, [isReady])

  function drawFrame(img: HTMLImageElement) {
    const ctx = cachedCtx
    const canvas = canvasRef.current
    if (!ctx || !canvas || !img) return

    const cW = canvas.width
    const cH = canvas.height
    const scale = Math.max(cW / img.naturalWidth, cH / img.naturalHeight)
    const x = (cW - img.naturalWidth * scale) / 2
    const y = (cH - img.naturalHeight * scale) / 2

    ctx.fillStyle = '#050208'
    ctx.fillRect(0, 0, cW, cH)
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale)
  }

  useEffect(() => {
    if (isReady && images.length > 0 && canvasRef.current) {
      drawFrame(images[0])
    }
  }, [isReady, images])

  const rafRef = useRef<number>(0)
  useMotionValueEvent(frameIndex, 'change', (v) => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const idx = Math.round(Math.min(Math.max(v, 0), TOTAL_FRAMES - 1))
      if (images[idx]) drawFrame(images[idx])
    })
  })

  useEffect(() => {
    const resize = () => {
      if (!canvasRef.current) return
      const dpr = 1 // Locked to 1 for performance
      canvasRef.current.width = window.innerWidth * dpr
      canvasRef.current.height = window.innerHeight * dpr
      
      const currentIdx = Math.round(frameIndex.get())
      if (images[currentIdx]) drawFrame(images[currentIdx])
    }
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [images, frameIndex, isReady])

  const activeSlide = SLIDES.find(s => progress >= s.range[0] && progress <= s.range[1])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#050208' }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', height: '100%',
          display: isReady ? 'block' : 'none',
          filter: 'brightness(1.1) contrast(1.1)' 
        }} 
      />

      {/* Frame Text Overlays */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 10vw',
        zIndex: 10
      }}>
        <AnimatePresence mode="wait">
          {activeSlide && (
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                width: '100%',
                textAlign: activeSlide.position as any,
                display: 'flex',
                flexDirection: 'column',
                alignItems: activeSlide.position === 'center' ? 'center' : (activeSlide.position === 'right' ? 'flex-end' : 'flex-start')
              }}
            >
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#fff',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                textShadow: '2px 2px 10px rgba(0,0,0,0.8)',
                maxWidth: '900px'
              }}>
                {activeSlide.heading[0]}
                <span className={activeSlide.color === 'red' ? 'glow-red' : 'glow-blue'}>
                  {activeSlide.heading[1]}
                </span>
              </h2>
              {activeSlide.subtext && (
                <p style={{
                  fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
                  color: 'rgba(240, 232, 208, 0.7)',
                  fontFamily: 'var(--font-mono)',
                  maxWidth: '600px',
                  lineHeight: 1.6,
                  textShadow: '1px 1px 5px rgba(0,0,0,0.5)'
                }}>
                  {activeSlide.subtext}
                </p>
              )}
              {activeSlide.dot && (
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: BR.blue,
                    marginTop: '2rem',
                    boxShadow: `0 0 20px ${BR.blue}`
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator for the beginning */}
      <AnimatePresence>
        {progress < 0.05 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              pointerEvents: 'none',
              zIndex: 20
            }}
          >
            <span style={{ 
              fontSize: '0.7rem', 
              color: 'rgba(255,255,255,0.4)', 
              letterSpacing: '0.2em',
              textTransform: 'uppercase'
            }}>
              Scroll to Explore
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: '1px',
                height: '40px',
                background: `linear-gradient(to bottom, ${BR.red}, transparent)`
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
