import React, { useRef } from 'react'
import { BR } from '@/lib/constants'
import { getZoneOpacity, ZONE_BOUNDARIES } from '@/lib/useScrollProgress'

interface OverlayProps { progress: number; zone: number }

export const ProjectsOverlay = React.memo(({ progress, zone }: OverlayProps) => {
  const zoneOpacity = getZoneOpacity(progress, ZONE_BOUNDARIES[3], ZONE_BOUNDARIES[4])
  const scrollRef = useRef<HTMLDivElement>(null)

  const projects = [
    { num: '01', year: '2024', title: 'DS Visualizer (DataStruct2.0)', desc: 'Interactive, high-fidelity platform for visualizing complex DSA concepts with a 3D Code-to-Viz engine.', tags: ['React','Three.js','Monaco','WASM'], link: 'https://ds-vis.vercel.app/', color: BR.teal },
    { num: '02', year: '2024', title: 'Manthan Event Site', desc: 'Live event website for BVIMIT\'s Manthan cultural event with high-performance animations.', tags: ['Next.js','React','Framer Motion'], link: 'https://bvimitmanthan.vercel.app/', color: BR.red },
    { num: '03', year: '2024', title: 'Deepfake Detection', desc: 'Real vs fake detection using ResNet-50, OpenCV, and Flask for secure media verification.', tags: ['Python','TensorFlow','OpenCV','Flask'], color: BR.gold },
    { num: '04', year: '2024', title: 'Breast Cancer CNN', desc: 'Medical diagnostic CNN model classifying benign vs malignant cancer cells with high accuracy.', tags: ['Python','TensorFlow','CNN'], color: BR.teal },
    { num: '05', year: '2024', title: 'Student Management', desc: 'Full-stack enterprise application for student records and course registration systems.', tags: ['ASP.NET','SQL','JavaScript'], color: BR.red },
    { num: '06', year: '2024', title: 'Toontastic', desc: 'Cartoon discovery app featuring dynamic episode browsing and interactive search UX.', tags: ['Search','Episodes','UX'], color: BR.gold },
    { num: '07', year: 'CONCEPT', title: 'TeamUpNow', desc: 'Social sports platform connecting players to organize matches and track performance.', tags: ['Teammates','Scheduling','Reviews'], color: BR.teal },
  ]

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = dir === 'left' ? -400 : 400
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:10,
      opacity: zoneOpacity, transition:'opacity 0.5s ease',
      pointerEvents: zoneOpacity > 0.1 ? 'auto' : 'none',
      display:'flex', flexDirection:'column', justifyContent:'center',
      padding:'0 clamp(1.5rem, 5vw, 5rem)', paddingTop: '6rem',
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'2.5rem' }}>
        <div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', letterSpacing:'0.4em', textTransform:'uppercase', color: BR.red, marginBottom:'0.75rem', display:'flex', alignItems:'center', gap:'0.8rem' }}>
            <div style={{ width:40, height:1, background: BR.red }} /> Selected Work
          </div>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.5rem, 5vw, 5rem)', fontWeight:300, fontStyle:'italic', color: BR.white, lineHeight:0.9 }}>
            Projects<span style={{color: BR.red}}>.</span>
          </h2>
        </div>
        
        {/* Navigation Arrows */}
        <div style={{ display:'flex', gap:'1rem', marginBottom:'0.5rem' }}>
          <button onClick={() => scroll('left')} style={{ width:48, height:48, borderRadius:'50%', border:`1px solid ${BR.white}22`, background:`${BR.white}11`, color: BR.white, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.3s' }}>←</button>
          <button onClick={() => scroll('right')} style={{ width:48, height:48, borderRadius:'50%', border:`1px solid ${BR.white}22`, background:`${BR.white}11`, color: BR.white, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.3s' }}>→</button>
        </div>
      </div>

      <div ref={scrollRef} className="no-scrollbar" style={{ display:'flex', gap:'1.5rem', overflowX:'auto', paddingBottom:'2.5rem', scrollSnapType:'x mandatory' }}>
        {projects.map((p) => (
          <div key={p.num} className="glass-card" style={{ flexShrink:0, width:'clamp(300px, 35vw, 420px)', minHeight:'420px', border:`1px solid ${p.color}33`, borderTop:`4px solid ${p.color}`, borderRadius:'32px', padding:'3rem 2.5rem', scrollSnapAlign:'start', boxShadow:`0 0 40px ${p.color}11`, display:'flex', flexDirection:'column', justifyContent:'space-between', transition:'all 0.35s ease' }}>
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1.8rem' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color: p.color, letterSpacing:'0.25em', fontWeight:600 }}>{p.num}</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color: BR.muted, letterSpacing:'0.15em', textTransform:'uppercase' }}>{p.year}</span>
              </div>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem, 2.5vw, 2.2rem)', fontWeight:400, fontStyle:'italic', color: BR.white, marginBottom:'1.2rem', lineHeight:1.1 }}>{p.title}</h3>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'0.95rem', color: BR.white, lineHeight:1.75, marginBottom:'1.8rem', opacity: 0.8 }}>{p.desc}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
                {p.tags.map(tag => <span key={tag} style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color: p.color, background:`${p.color}15`, border:`1px solid ${p.color}30`, borderRadius:'100px', padding:'0.25rem 0.75rem' }}>{tag}</span>)}
              </div>
            </div>
            {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ marginTop:'2rem', display:'inline-flex', alignItems:'center', gap:'0.6rem', fontFamily:'var(--font-mono)', fontSize:'0.75rem', color: p.color, textDecoration:'none', letterSpacing:'0.15em', textTransform:'uppercase', fontWeight:600, borderBottom:`1px solid ${p.color}40`, paddingBottom:'4px' }}>Launch Live →</a>}
          </div>
        ))}
      </div>
    </div>
  )
})
