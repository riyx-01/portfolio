import React from 'react'
import { BR } from '@/lib/constants'

export const Nav = React.memo(({ currentZone }: { currentZone: number }) => {
  const isScrolled = currentZone > 0

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0,
      padding:'2rem 3rem',
      zIndex: 50,
      background: isScrolled ? 'rgba(5,5,8,0.85)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? `1px solid ${BR.orange}33` : 'none',
      transition: 'all 0.5s ease',
      display:'flex', justifyContent:'space-between', alignItems:'center',
    }}>
      <a href="#" style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.8rem', fontWeight: 300, fontStyle: 'italic',
        color: BR.white, textDecoration: 'none',
        letterSpacing: '0.02em',
      }}>
        Riya<span style={{ color: BR.orange, fontStyle: 'normal' }}>.</span>
      </a>

      <div style={{ display:'flex', gap:'3rem', alignItems:'center' }}>
        {['About','Skills','Work','Contact'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.3em',
            color: BR.muted, textDecoration: 'none',
            transition: 'color 0.25s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = BR.white }}
          onMouseLeave={e => { e.currentTarget.style.color = BR.muted }}
          >
            {item}
          </a>
        ))}
        
        <a href="#contact" style={{
          padding: '0.75rem 1.6rem',
          borderRadius: '100px',
          background: `${BR.orange}22`,
          border: `1px solid ${BR.orange}44`,
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.2em',
          color: BR.white, textDecoration: 'none',
          boxShadow: `0 0 20px ${BR.orange}22`,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.background = `${BR.orange}44`
          el.style.transform = 'translateY(-2px)'
          el.style.boxShadow = `0 0 30px ${BR.orange}66`
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.background = `${BR.orange}22`
          el.style.transform = 'translateY(0)'
          el.style.boxShadow = `0 0 20px ${BR.orange}22`
        }}
        >
          Hire Me
        </a>
      </div>
    </nav>
  )
})
