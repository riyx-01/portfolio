import React from 'react'
import { BR } from '@/lib/constants'
import { getZoneOpacity, ZONE_BOUNDARIES } from '@/lib/useScrollProgress'

interface OverlayProps { progress: number; zone: number }

export const SkillsOverlay = React.memo(({ progress, zone }: OverlayProps) => {
  const zoneOpacity = getZoneOpacity(progress, ZONE_BOUNDARIES[2], ZONE_BOUNDARIES[3])
  
  const skills = [
    { cat: 'Programming', items: ['Python','SQL','JavaScript','C'] },
    { cat: 'Web',         items: ['React','Next.js','ASP.NET','Flask'] },
    { cat: 'AI / ML',     items: ['TensorFlow','OpenCV','CNN','Computer Vision'] },
    { cat: 'Data',        items: ['Pandas','NumPy','Excel','Visualization'] },
    { cat: 'Dev Tools',   items: ['VS Code','Git','PyCharm','Unity'] },
    { cat: 'Design',      items: ['Figma','WordPress','UI/UX'] },
  ]

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:10,
      display:'flex', alignItems:'center', justifyContent:'center',
      opacity: zoneOpacity, transition:'opacity 0.5s ease',
      pointerEvents: zoneOpacity > 0.1 ? 'auto' : 'none',
      padding: '0 clamp(1.5rem, 6vw, 6rem)',
    }}>
      <div style={{ width:'100%', maxWidth:'1100px' }}>
        <div style={{
          fontFamily:'var(--font-mono)', fontSize:'0.7rem',
          letterSpacing:'0.4em', textTransform:'uppercase',
          color: BR.teal, marginBottom:'0.75rem',
          display:'flex', alignItems:'center', gap:'0.8rem',
        }}>
          <div style={{ width:40, height:1, background: BR.teal }} />
          Technical Stack
        </div>
        <h2 style={{
          fontFamily:'var(--font-display)',
          fontSize:'clamp(2.5rem, 6vw, 6rem)',
          fontWeight:300, fontStyle:'italic',
          color: BR.white, marginBottom:'2.5rem', lineHeight:0.9,
        }}>
          The Tools I<br />
          <span style={{color: BR.teal}}>Think With.</span>
        </h2>

        {/* Skill grid */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))',
          gap:'1rem',
        }}>
          {skills.map(group => (
            <div key={group.cat} className="glass-card" style={{
              borderRadius:'24px',
              padding:'1.5rem',
              boxShadow:`0 0 20px ${BR.teal}11`,
            }}>
              <div style={{
                fontFamily:'var(--font-mono)', fontSize:'0.65rem',
                letterSpacing:'0.3em', textTransform:'uppercase',
                color: BR.teal, marginBottom:'1.2rem', fontWeight:600,
              }}>{group.cat}</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
                {group.items.map(item => (
                  <span key={item} style={{
                    fontFamily:'var(--font-body)', fontSize:'0.78rem',
                    color: BR.white, background:`${BR.orange}11`,
                    border:`1px solid ${BR.orange}22`,
                    borderRadius:'100px', padding:'0.35rem 0.85rem',
                    letterSpacing:'0.03em', fontWeight:400,
                  }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
