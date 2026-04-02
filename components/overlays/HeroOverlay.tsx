import React from 'react'
import { BR } from '@/lib/constants'
import { getZoneOpacity, ZONE_BOUNDARIES } from '@/lib/useScrollProgress'

interface OverlayProps { progress: number; zone: number }

export const HeroOverlay = React.memo(({ progress, zone }: OverlayProps) => {
  const zoneOpacity = getZoneOpacity(progress, ZONE_BOUNDARIES[0], ZONE_BOUNDARIES[1])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10,
      display: 'flex', alignItems: 'center',
      paddingLeft: 'clamp(2rem, 8vw, 8rem)',
      pointerEvents: zoneOpacity > 0.1 ? 'auto' : 'none',
      opacity: zoneOpacity, transition: 'opacity 0.5s ease',
    }}>
      <div className="max-w-xl">
        {/* Eyebrow Label */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: BR.teal,
          marginBottom: '1.2rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: BR.teal,
            boxShadow: `0 0 12px ${BR.teal}`,
            display: 'inline-block',
          }} className="animate-pulse" />
          AI · ML · Data · Web
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: BR.white,
          lineHeight: 0.88,
          marginBottom: '1.5rem',
        }}>
          RIYA<br />
          <span style={{
            color: BR.orange,
            textShadow: `0 0 60px ${BR.orange}44`,
          }}>
            THAKUR
          </span>
          <span style={{ color: BR.teal }}>.</span>
        </h1>

        {/* Tagline */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
          color: '#8a85a0',
          lineHeight: 1.7,
          maxWidth: '440px',
          fontWeight: 400,
        }}>
          Aspiring AI/ML Engineer crafting<br />
          intelligent systems from Mumbai.
        </p>

        {/* Scroll cue */}
        <div style={{
          marginTop: '2.5rem',
          display: 'flex', alignItems: 'center', gap: '1rem',
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem', letterSpacing: '0.3em',
          textTransform: 'uppercase', color: BR.muted,
        }}>
          <div style={{
            width: 40, height: 1,
            background: `linear-gradient(90deg, ${BR.orange}, transparent)`,
          }} />
          Scroll to begin
        </div>
      </div>
    </div>
  )
})
