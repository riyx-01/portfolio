'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BR } from '@/lib/constants'

interface Props {
  progress: number      // 0–100
  onComplete: () => void
}

export function CyberpunkLoadScreen({ progress, onComplete }: Props) {
  const [phase, setPhase] = useState<'boot' | 'scan' | 'glitch' | 'enter'>('boot')
  const [displayText, setDisplayText] = useState('')
  const [showEnter, setShowEnter] = useState(false)

  // PHASE 1: Boot text types out immediately (typewriter, 0ms delay)
  const bootLines = [
    '> SYSTEM BOOT.............[OK]',
    '> NEURAL INTERFACE........[OK]',
    '> LOADING ASSETS..........[  ]',
    '> RIYA THAKUR — PORTFOLIO',
  ]

  useEffect(() => {
    // Typewriter effect — starts instantly
    let lineIdx = 0
    let charIdx = 0
    let output = ''
    const interval = setInterval(() => {
      if (lineIdx >= bootLines.length) {
        clearInterval(interval)
        setPhase('scan')
        return
      }
      const line = bootLines[lineIdx]
      output += line[charIdx]
      setDisplayText(output)
      charIdx++
      if (charIdx >= line.length) {
        output += '\n'
        lineIdx++
        charIdx = 0
      }
    }, 8) // fast typewriter — 8ms per char
    return () => clearInterval(interval)
  }, [])

  // When progress hits 100 → show ENTER button
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setShowEnter(true), 150)
    }
  }, [progress])

  const bars = Math.floor(progress / 5)

  return (
    <motion.div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#050208',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: '"JetBrains Mono", "Courier New", monospace',
        overflow: 'hidden',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >


      {/* Main content */}
      <div style={{
        width: 'min(500px, 90vw)',
        position: 'relative', zIndex: 2,
      }}>

        {/* City name — Night City style */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            fontSize: '0.6rem', letterSpacing: '0.6em',
            textTransform: 'uppercase', color: BR.red,
            marginBottom: '0.5rem',
            textShadow: `0 0 20px ${BR.red}`,
          }}
        >
          NIGHT CITY // 2077
        </motion.div>

        {/* Big name */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 700, color: '#f0e8d0',
            letterSpacing: '-0.02em', lineHeight: 0.9,
            marginBottom: '2rem',
            textShadow: `0 0 80px ${BR.red}55`,
          }}
        >
          RIYA<br />
          <span style={{
            color: BR.blue,
            textShadow: `0 0 40px ${BR.blue}`,
          }}>THAKUR</span>
        </motion.h1>

        {/* Boot text terminal */}
        <div style={{
          background: 'rgba(0,0,0,0.6)',
          border: `1px solid ${BR.blue}33`,
          padding: '1rem 1.2rem',
          marginBottom: '1.5rem',
          minHeight: '100px',
        }}>
          <pre style={{
            margin: 0, fontSize: '0.7rem', lineHeight: 1.6,
            color: BR.blue,
            whiteSpace: 'pre-wrap',
            fontFamily: 'inherit',
          }}>
            {displayText}
            <span style={{
              animation: 'blink 1s step-end infinite',
              color: BR.blue,
            }}>█</span>
          </pre>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: '0.6rem', color: '#4a4560',
            letterSpacing: '0.2em', marginBottom: '0.4rem',
          }}>
            <span>LOADING ASSETS</span>
            <span style={{ color: BR.blue }}>{progress}%</span>
          </div>

          {/* Segmented progress bar */}
          <div style={{ display: 'flex', gap: '3px' }}>
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} style={{
                flex: 1, height: '6px',
                background: i < bars
                  ? (i < 10 ? BR.red : BR.blue)
                  : 'rgba(255,255,255,0.05)',
                boxShadow: i < bars
                  ? `0 0 8px ${i < 10 ? BR.red : BR.blue}`
                  : 'none',
                transition: 'background 0.1s ease, box-shadow 0.1s ease',
              }} />
            ))}
          </div>
        </div>

        {/* ENTER button — appears when loaded */}
        <AnimatePresence>
          {showEnter && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onClick={onComplete}
              style={{
                width: '100%', padding: '1rem',
                background: 'transparent',
                border: `1px solid ${BR.blue}`,
                color: BR.blue,
                fontFamily: 'inherit',
                fontSize: '0.75rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: `0 0 20px ${BR.blue}44`,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background = `${BR.blue}22`
                el.style.boxShadow = `0 0 40px ${BR.blue}88`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.background = 'transparent'
                el.style.boxShadow = `0 0 20px ${BR.blue}44`
              }}
            >
              ► ENTER PORTFOLIO
            </motion.button>
          )}
        </AnimatePresence>

        {!showEnter && (
          <p style={{
            fontSize: '0.6rem', color: '#2a2840',
            letterSpacing: '0.2em', textAlign: 'center',
          }}>
            {progress < 40  && 'INITIALIZING...'}
            {progress >= 40 && progress < 75 && 'LOADING WORLD DATA...'}
            {progress >= 75 && progress < 100 && 'ALMOST READY...'}
          </p>
        )}
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: '1.5rem',
        display: 'flex', gap: '3rem',
        fontSize: '0.5rem', letterSpacing: '0.3em',
        color: '#1a1830', textTransform: 'uppercase',
      }}>
        <span>AI // ML</span>
        <span>MUMBAI</span>
        <span>2077</span>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scanBar { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes gridPulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
      `}
      </style>
    </motion.div>
  )
}
