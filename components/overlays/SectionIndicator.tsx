import React from 'react'
import { BR } from '@/lib/constants'

export const SectionIndicator = React.memo(({ zone }: { zone: number }) => {
  const zones = ['Home','About','Skills','Projects','Contact']
  return (
    <div style={{ 
      position:'fixed', right:'3.5rem', top:'50%', 
      transform:'translateY(-50%)',
      zIndex:20,
      display:'flex', flexDirection:'column', gap:'1rem',
      alignItems:'center',
      pointerEvents:'none',
    }}>
      {zones.map((name, i) => (
        <div key={name} style={{
          position:'relative',
          width: zone === i ? 10 : 4,
          height: zone === i ? 10 : 4,
          borderRadius:'50%',
          background: zone === i ? BR.orange : 'rgba(232, 98, 42, 0.15)',
          boxShadow: zone === i ? `0 0 20px ${BR.orange}` : 'none',
          transition:'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        }}>
          {zone === i && (
            <span style={{
              position:'absolute', right:'2rem', top:'50%',
              transform:'translateY(-50%)',
              fontFamily:'var(--font-mono)', fontSize:'0.65rem',
              letterSpacing:'0.25em', textTransform:'uppercase',
              color: BR.orange, whiteSpace:'nowrap',
              opacity: 0.9,
              fontWeight: 600,
            }}>
              {name}
            </span>
          )}
        </div>
      ))}
    </div>
  )
})
