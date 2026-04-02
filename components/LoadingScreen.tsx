'use client'

export function LoadingScreen({ progress }: { progress: number }) {
  if (progress >= 100) return null

  const bars = Math.floor(progress / 5)   // 0–20 bars

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: '#050508',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
    }}>
      {/* Blade Runner orange glow top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, #e8622a, transparent)',
        boxShadow: '0 0 40px rgba(232,98,42,0.8)',
        opacity: progress > 20 ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }} />

      {/* Name */}
      <p style={{
        fontSize: '0.65rem', letterSpacing: '0.5em',
        textTransform: 'uppercase', color: '#4a4560',
        marginBottom: '3rem',
      }}>
        RIYA THAKUR — PORTFOLIO
      </p>

      {/* Progress bar — terminal style */}
      <div style={{
        width: 'min(400px, 80vw)',
        fontFamily: 'monospace',
      }}>
        <div style={{
          fontSize: '0.7rem', color: '#2a2840',
          marginBottom: '0.5rem', letterSpacing: '0.1em',
        }}>
          INITIALISING SYSTEM
        </div>

        <div style={{
          border: '1px solid #1a1830',
          padding: '0.4rem 0.6rem',
          display: 'flex', gap: '0',
        }}>
          <span style={{ color: '#e8622a' }}>
            {'█'.repeat(bars)}
          </span>
          <span style={{ color: '#1a1830' }}>
            {'░'.repeat(20 - bars)}
          </span>
          <span style={{
            marginLeft: 'auto', paddingLeft: '1rem',
            color: '#4a4560', fontSize: '0.7rem',
          }}>
            {progress}%
          </span>
        </div>

        <div style={{
          fontSize: '0.6rem', color: '#2a2840',
          marginTop: '0.5rem', letterSpacing: '0.05em',
        }}>
          {progress < 30  && '> LOADING SEQUENCE DATA...'}
          {progress >= 30 && progress < 60  && '> CALIBRATING VISUAL SYSTEMS...'}
          {progress >= 60 && progress < 90  && '> RENDERING WORLD...'}
          {progress >= 90 && '> READY TO ENTER'}
        </div>
      </div>

      {/* Bottom accent */}
      <div style={{
        position: 'absolute', bottom: '2rem',
        fontSize: '0.55rem', letterSpacing: '0.3em',
        color: '#1a1830', textTransform: 'uppercase',
      }}>
        Los Angeles · 2049
      </div>
    </div>
  )
}
