import React from 'react'
import { BR } from '@/lib/constants'
import { getZoneOpacity, ZONE_BOUNDARIES } from '@/lib/useScrollProgress'

interface OverlayProps { progress: number; zone: number }

export const AboutOverlay = React.memo(({ progress, zone }: OverlayProps) => {
  const zoneOpacity = getZoneOpacity(progress, ZONE_BOUNDARIES[1], ZONE_BOUNDARIES[2])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: zoneOpacity, transition: 'opacity 0.5s ease',
      pointerEvents: zoneOpacity > 0.1 ? 'auto' : 'none',
    }}>
      {/* Glass panel — matches the 3D frame behind it */}
      <div className="glass-card" style={{
        width: 'min(580px, 90vw)',
        padding: '3rem',
        borderRadius: '8px',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem', letterSpacing: '0.4em',
          textTransform: 'uppercase', color: BR.orange,
          marginBottom: '1.5rem',
          display: 'flex', alignItems: 'center', gap: '0.6rem',
        }}>
          <span style={{ width:20, height:1, background:BR.orange, display:'inline-block' }}/>
          About
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
          fontWeight: 300, fontStyle: 'italic',
          color: BR.white, lineHeight: 0.9,
          marginBottom: '1.5rem',
        }}>
          Hello, I am<br />
          <span style={{ color:BR.orange }}>Riya Thakur</span>
        </h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.9rem, 1.35vw, 1.05rem)',
          color: BR.white, lineHeight: 1.85, marginBottom: '1rem',
        }}>
          A passionate technology enthusiast with strong interests in
          Artificial Intelligence, Machine Learning, Data Science, Web
          Development, and Digital Marketing.
        </p>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.9rem, 1.35vw, 1.05rem)',
          color: BR.white, lineHeight: 1.85, marginBottom: '1.5rem',
        }}>
          B.Sc. IT (Honours) — S.K. Somaiya College, GPA <strong style={{color:BR.teal, fontWeight:600}}>9.39</strong>.
          Currently pursuing MCA at Bharati Vidyapeeth (BVIMIT).
        </p>

        {/* Stats */}
        <div style={{ display:'flex', gap:'2rem', marginTop:'1.5rem' }}>
          {[['9.39','GPA'],['7+','Projects'],['5+','Certifications']].map(([n,l]) => (
            <div key={l}>
              <div style={{
                fontFamily:'var(--font-display)', fontSize:'2rem',
                fontWeight:300, color:BR.orange,
                textShadow:`0 0 20px ${BR.orange}88`,
              }}>{n}</div>
              <div style={{
                fontFamily:'var(--font-mono)', fontSize:'0.65rem',
                letterSpacing:'0.3em', textTransform:'uppercase', color:BR.muted,
              }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
