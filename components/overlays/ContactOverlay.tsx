import React from 'react'
import { BR } from '@/lib/constants'
import { getZoneOpacity, ZONE_BOUNDARIES } from '@/lib/useScrollProgress'

interface OverlayProps { progress: number; zone: number }

export const ContactOverlay = React.memo(({ progress, zone }: OverlayProps) => {
  const zoneOpacity = getZoneOpacity(progress, ZONE_BOUNDARIES[4], ZONE_BOUNDARIES[5])

  const links = [
    { label:'Email', value:'riyathakur155555@gmail.com',
      href:'mailto:riyathakur155555@gmail.com', color: BR.orange },
    { label:'GitHub', value:'github.com/riyx-01',
      href:'https://github.com/riyx-01', color: BR.teal },
    { label:'LinkedIn', value:'riyathakur01',
      href:'https://www.linkedin.com/in/riyathakur01', color: BR.red },
  ]

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:10,
      display:'flex', alignItems:'center', justifyContent:'center',
      opacity: zoneOpacity, transition:'opacity 0.5s ease',
      pointerEvents: zoneOpacity > 0.1 ? 'auto' : 'none',
    }}>
      <div style={{ textAlign:'center', maxWidth:'700px', padding:'0 2rem' }}>
        <div style={{
          fontFamily:'var(--font-mono)', fontSize:'0.7rem',
          letterSpacing:'0.45em', textTransform:'uppercase', color: BR.teal,
          marginBottom:'1.5rem',
          display:'flex', alignItems:'center', gap:'1rem', justifyContent:'center',
        }}>
          <div style={{ width:30, height:1, background: BR.teal }} />
          Connect with me
        </div>

        <h2 style={{
          fontFamily:'var(--font-display)',
          fontSize:'clamp(3.5rem, 8vw, 8rem)',
          fontWeight:300, fontStyle:'italic',
          color: BR.white, lineHeight:0.88,
          marginBottom:'4rem',
        }}>
          Let's Build<br />
          <span style={{
            color: BR.orange,
            textShadow:`0 0 60px ${BR.orange}aa`,
          }}>Something.</span>
        </h2>

        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'1.2rem' }}>
          {links.map(link => (
            <a key={link.label} href={link.href}
              target="_blank" rel="noopener noreferrer"
              className="glass-card"
              style={{
                display:'flex', justifyContent:'space-between', alignItems:'center',
                padding:'1.5rem 2.2rem',
                border:`1px solid ${link.color}40`,
                borderRadius:'16px',
                textDecoration:'none',
                transition:'all 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
                boxShadow:`0 0 24px ${link.color}08`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = `${link.color}20`
                el.style.borderColor = `${link.color}80`
                el.style.transform = 'translateY(-4px) scale(1.02)'
                el.style.boxShadow = `0 12px 40px ${link.color}30`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(5, 5, 8, 0.75)'
                el.style.borderColor = `${link.color}40`
                el.style.transform = 'translateY(0) scale(1)'
                el.style.boxShadow = `0 0 24px ${link.color}08`
              }}
            >
              <div style={{ textAlign:'left' }}>
                <div style={{
                  fontFamily:'var(--font-mono)', fontSize:'0.65rem',
                  letterSpacing:'0.35em', textTransform:'uppercase',
                  color: link.color, marginBottom:'0.4rem', fontWeight:600,
                }}>{link.label}</div>
                <div style={{
                  fontFamily:'var(--font-body)', fontSize:'1.1rem',
                  color: BR.white, fontWeight:400,
                }}>{link.value}</div>
              </div>
              <span style={{
                fontFamily:'var(--font-mono)', color: link.color, fontSize:'1.4rem',
                opacity:0.8,
              }}>→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
})
