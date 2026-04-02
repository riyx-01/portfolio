'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ScanlineTransition({ active, onComplete }: { active: boolean, onComplete?: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (active) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        if (onComplete) onComplete()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [active, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            display: 'flex', pointerEvents: 'none',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              flex: 1, background: '#050208',
              borderRight: '1px solid #00ffd222',
            }}
          />
          {/* Right Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              flex: 1, background: '#050208',
              borderLeft: '1px solid #ff2d6b22',
            }}
          />

          {/* Central Name Flash */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1.1, 1.2] }}
            transition={{ duration: 1.2, times: [0, 0.2, 0.8, 1] }}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 101,
            }}
          >
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '5vw',
              color: '#fff', letterSpacing: '0.4em', textTransform: 'uppercase',
            }}>
              RIYA<span style={{ color: '#00ffd2' }}>THAKUR</span>
            </h2>
          </motion.div>

          {/* Scanline Sweep */}
          <motion.div
            initial={{ top: '-10%' }}
            animate={{ top: '110%' }}
            transition={{ duration: 1.5, ease: 'linear' }}
            style={{
              position: 'absolute', left: 0, right: 0, height: '2px',
              background: 'linear-gradient(90deg, transparent, #00ffd2, #ff2d6b, transparent)',
              boxShadow: '0 0 40px #00ffd288',
              zIndex: 102,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
