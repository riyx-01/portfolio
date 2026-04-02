'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { BR } from '@/lib/constants'

interface FrameInfoOverlayProps {
  progress: number // frameProgress (0 to 1)
}

export function FrameInfoOverlay({ progress }: FrameInfoOverlayProps) {
  // Intervals of info displayed while the user scrolls through the image sequence
  const segments = [
    {
      range: [0.00, 0.15],
      text: 'RIYA THAKUR',
      sub: 'IT GRADUATE • BSc IT (HONOURS) • MCA STUDENT'
    },

    {
      range: [0.18, 0.33],
      text: 'ACADEMIC EXCELLENCE',
      sub: '9.39 GPA • COMPUTER SCIENCE FOUNDATION'
    },

    {
      range: [0.38, 0.53],
      text: 'SOFTWARE • DATA • WEB',
      sub: 'BUILDING REAL-WORLD APPLICATIONS'
    },

    {
      range: [0.58, 0.73],
      text: 'PROBLEM SOLVING MINDSET',
      sub: 'TURNING IDEAS INTO WORKING PRODUCTS'
    },
    {
      range: [0.80, 0.95],
      text: 'FUTURE READY',
      sub: 'PREPARING FOR INDUSTRY ROLES & INTERNSHIPS'
    },
  ]

  const activeSegment = segments.find(s => progress >= s.range[0] && progress <= s.range[1])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      zIndex: 15, pointerEvents: 'none',
      fontFamily: 'var(--font-mono)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'flex-end',
      paddingBottom: '8vh',
    }}>
      <AnimatePresence mode="wait">
        {activeSegment && (
          <motion.div
            key={activeSegment.text}
            initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -5, filter: 'blur(5px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ textAlign: 'center' }}
          >
            {/* Top rule */}
            <div style={{
              width: '40px', height: '1px', background: BR.teal,
              margin: '0 auto 1.5rem', opacity: 0.6,
            }} />

            <h3 style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.6rem)', color: BR.white,
              fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase',
              marginBottom: '0.5rem',
              textShadow: `0 0 15px ${BR.teal}66`,
            }}>
              {activeSegment.text}
            </h3>

            <p style={{
              fontSize: '0.7rem', color: BR.teal, letterSpacing: '0.3em',
              textTransform: 'uppercase', opacity: 0.8,
            }}>
              {activeSegment.sub}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
