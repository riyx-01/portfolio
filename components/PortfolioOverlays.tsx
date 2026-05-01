'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { BR, FRAME_END_PERCENT } from '@/lib/constants'
import { getZoneOpacity, ZONE_BOUNDARIES } from '@/lib/useScrollProgress'
import MagicRings from '@/components/bits/MagicRings'
import GooeyNav from '@/components/bits/GooeyNav'
import CyberContainer from '@/components/bits/CyberContainer'

// Maps phase-2 range → 0–1 internal progress
function worldProgress(sp: number): number {
  return Math.min(Math.max((sp - FRAME_END_PERCENT) / (1 - FRAME_END_PERCENT), 0), 1)
}

interface Props { scrollProgress: number }

export function PortfolioOverlays({ scrollProgress }: Props) {
  const wp = worldProgress(scrollProgress)

  // Section mappings using the new ZONE_BOUNDARIES
  const zones = {
    hero: getZoneOpacity(wp, ZONE_BOUNDARIES[0], ZONE_BOUNDARIES[1]),
    about: getZoneOpacity(wp, ZONE_BOUNDARIES[1], ZONE_BOUNDARIES[2]),
    skills: getZoneOpacity(wp, ZONE_BOUNDARIES[2], ZONE_BOUNDARIES[3]),
    projects: getZoneOpacity(wp, ZONE_BOUNDARIES[3], ZONE_BOUNDARIES[4]),
    achievement: getZoneOpacity(wp, ZONE_BOUNDARIES[4], ZONE_BOUNDARIES[5]),
    contact: getZoneOpacity(wp, ZONE_BOUNDARIES[5], ZONE_BOUNDARIES[6]),
  }

  let activeZoneIndex = 0;
  for (let i = 5; i >= 0; i--) {
    // If we've passed the midpoint of the zone, consider it active
    const zoneStart = ZONE_BOUNDARIES[i];
    if (wp >= zoneStart - 0.05) {
      activeZoneIndex = i;
      break;
    }
  }

  const scrollToSection = (index: number) => {
    // Land past the 0.03 fade-in ramp so the section is fully visible immediately
    const FADE_IN = 0.04
    const zoneStart = ZONE_BOUNDARIES[index] + (index === 0 ? 0 : FADE_IN)
    const targetSp = FRAME_END_PERCENT + (zoneStart * (1 - FRAME_END_PERCENT))
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetY = Math.round(targetSp * maxScroll)
    
    const lenis = (window as any).lenis
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(targetY, { immediate: false, duration: 1.2, easing: (t: number) => 1 - Math.pow(1 - t, 3) })
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }
  }

  const navItems = [
    { label: 'ABOUT', index: 1, icon: <AboutIcon /> },
    { label: 'SKILLS', index: 2, icon: <SkillsIcon /> },
    { label: 'PROJECTS', index: 3, icon: <ProjectsIcon /> },
    { label: 'ACHIEVE', index: 4, icon: <SkillsIcon /> },
    { label: 'CONTACT', index: 5, icon: <ContactIcon /> },
  ]

  const fontStyle = { fontFamily: 'var(--font-body)', letterSpacing: '0.02em' }

  return (
    <>
      {/* Removed old background to favor MagicRings */}

      <nav style={{
        position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 100, pointerEvents: 'auto'
      }}>
        <GooeyNav 
          items={[
            { label: 'HOME', href: '#', icon: <HomeIcon />, onClick: (e) => { e.preventDefault(); scrollToSection(0); } },
            ...navItems.map(item => ({
              label: item.label,
              href: '#',
              icon: item.icon,
              onClick: (e: React.MouseEvent) => { e.preventDefault(); scrollToSection(item.index); }
            }))
          ]}
          particleCount={20}
          colors={[1, 2, 3]}
          activeIndex={activeZoneIndex}
        />
      </nav>

      {/* ── HERO ── */}
        <Overlay opacity={zones.hero}>
        <div className="scanlines" style={{ opacity: 0.1, zIndex: 1 }} />
        <div style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
          
          <div style={{ width: 'clamp(320px, 90vw, 1100px)' }}>
            <CyberContainer title="RIYA THAKUR" subtitle="ENGINEER" highlight="MCA.DEV" prompt="ACCESS GRANTED">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', padding: 'clamp(1rem, 2vw, 2rem)', gap: 'clamp(1rem, 2vw, 2rem)', width: '100%' }}>
                <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(255, 32, 32, 0.3)', background: '#000', minHeight: '200px' }}>
                  <video src="/video/open.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.1) brightness(0.9)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, #000)' }} />
                  <h1 style={{ ...fontStyle, position: 'absolute', bottom: '1rem', left: '1rem', fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 900, color: '#fff', letterSpacing: '-3px', margin: 0, textShadow: `3px 3px 0px ${BR.red}` }}>RIYA</h1>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="glow-red flicker" style={{ ...fontStyle, fontSize: '0.65rem', letterSpacing: '0.4em', fontWeight: 900, marginBottom: 'clamp(0.5rem, 1vw, 1rem)' }}>&gt; AUTHENTICATION: GRANTED<BlinkingCursor /></div>
                  <h2 style={{ ...fontStyle, fontSize: 'clamp(1.2rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fff', textTransform: 'uppercase', marginBottom: 'clamp(0.8rem, 2vw, 1.5rem)', lineHeight: 1 }}>MCA CANDIDATE & <br /><span style={{ color: BR.red }}>FULL-STACK DEV</span></h2>
                  <p style={{ ...fontStyle, fontSize: '0.9rem', color: '#ccc', lineHeight: 1.6, borderLeft: `3px solid ${BR.red}`, paddingLeft: '1rem', marginBottom: '1.5rem' }}>
                    Results-driven Information Technology specialist with First-Class Honours (9.39/10 GPA). Demonstrated expertise in architecting full-stack web applications, implementing deep learning solutions, and leading technical teams.
                  </p>
                  <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {[{ l: 'TITLE', v: 'MCA.DEV' }, { l: 'LOC', v: 'MUMBAI' }].map(s => (
                      <div key={s.l} style={{ border: '1px solid #333', padding: '0.5rem 0.8rem', background: 'rgba(255,255,255,0.03)', flex: '1 1 min-content' }}>
                        <div style={{ ...fontStyle, fontSize: '0.45rem', color: BR.red, fontWeight: 900 }}>{s.l}</div>
                        <div style={{ ...fontStyle, fontSize: '0.8rem', color: '#fff', fontWeight: 900 }}>{s.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CyberContainer>
          </div>
        </div>
      </Overlay>

      {/* ── ABOUT ── */}
      <Overlay opacity={zones.about}>
        <div style={{ width: 'min(1200px, 95vw)' }}>
          <CyberContainer title="PERSPECTIVE" subtitle="BIO" highlight="V.2025" prompt="READ DATA">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(1.5rem, 3vw, 2rem)', padding: 'clamp(1rem, 2vw, 2rem)' }}>
              <div style={{ position: 'relative', overflow: 'hidden', border: `1px solid ${BR.blue}44`, background: '#000', minHeight: '180px' }}>
                <video src="/video/type.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.2) brightness(0.9) grayscale(0.2)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8))' }} />
                <div className="glow-blue" style={{ position: 'absolute', bottom: '1rem', left: '1rem', ...fontStyle, fontSize: '0.75rem', fontWeight: 900 }}>[OPERATOR BIO]</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="glow-blue" style={{ ...fontStyle, fontSize: '0.65rem', fontWeight: 900, marginBottom: '0.8rem' }}>[PERSPECTIVE.LOG]</div>
                <h2 style={{ ...fontStyle, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#fff', textTransform: 'uppercase', lineHeight: 1, fontWeight: 800, marginBottom: '1rem' }}>ENGINEERING <br /><span className="glow-blue">BETTER FUTURES</span></h2>
                <p style={{ ...fontStyle, fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', color: '#ccc', lineHeight: 1.6, marginBottom: '1.5rem' }}>Bridging academic excellence and professional execution. Eager to drive digital transformation initiatives utilizing modern frameworks and intelligent algorithms.</p>
                <div style={{ display: 'flex', gap: '2rem', marginTop: 'auto' }}>
                  {[{ n: '9.39', l: 'IT GPA' }, { n: '2025', l: 'MCA' }].map(s => (
                    <div key={s.l}><div style={{ ...fontStyle, fontSize: '1.5rem', fontWeight: 900, color: BR.blue }}>{s.n}</div><div style={{ ...fontStyle, fontSize: '0.6rem', color: '#666', fontWeight: 900 }}>{s.l}</div></div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: `1px solid ${BR.blue}33`, paddingLeft: 'clamp(1rem, 2vw, 2rem)' }}>
                <div className="glow-red" style={{ ...fontStyle, fontSize: '0.65rem', marginBottom: '1rem', fontWeight: 900 }}>[ATTRIBUTES]</div>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)', color: '#aaa', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {['ADAPTABLE', 'PROBLEM SOLVING', 'SCALABLE DESIGN', 'TEAM LEADERSHIP'].map(a => <li key={a} style={fontStyle}><span style={{ color: BR.blue }}>➔</span> {a}</li>)}
                </ul>
              </div>
            </div>
          </CyberContainer>
        </div>
      </Overlay>

      {/* ── SKILLS ── */}
      <Overlay opacity={zones.skills}>
        <div style={{ width: 'min(1200px, 95vw)' }}>
          <CyberContainer title="TECH CORE" subtitle="SYS" highlight="V.2.0" prompt="SCANNING ASSETS">
            <div style={{ padding: 'clamp(1rem, 2vw, 2rem)' }}>
              <h2 style={{ ...fontStyle, fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#fff', textAlign: 'center', fontWeight: 900, marginBottom: 'clamp(1rem, 3vw, 2rem)' }}>TECH <span className="glow-red">CORE.SYS</span></h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {SKILL_GROUPS.map(g => (
                  <div key={g.cat} style={{ padding: '1.5rem', borderTop: `4px solid ${g.color}`, background: 'rgba(0,0,0,0.4)', borderRadius: '4px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ ...fontStyle, fontSize: '0.9rem', color: g.color, fontWeight: 900, marginBottom: '1rem', letterSpacing: '1px' }}>{g.cat}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {g.items.map(i => <span key={i} style={{ ...fontStyle, fontSize: '0.8rem', color: '#eee', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{i}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CyberContainer>
        </div>
      </Overlay>

      {/* ── PROJECTS ── */}
      <Overlay opacity={zones.projects}>
        <div style={{ width: 'min(1250px, 98vw)' }}>
          <CyberContainer title="PROJECTS" subtitle="INTF" highlight="V.3.1" prompt="LOAD INTERFACE">
            <div style={{ width: '100%', padding: 'clamp(0.2rem, 1vw, 0.5rem)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{ ...fontStyle, fontSize: 'clamp(1.2rem, 3vh, 2rem)', color: '#fff', fontWeight: 900, marginBottom: '0.2rem' }}>PROJECT <span className="glow-blue">INTERFACE</span></h2>
              <ProjectCarousel />
            </div>
          </CyberContainer>
        </div>
      </Overlay>

      {/* ── ACHIEVEMENT ── */}
      <Overlay opacity={zones.achievement}>
        <div style={{ width: 'min(1100px, 95vw)' }}>
          <CyberContainer title="MILESTONES" subtitle="LOG" highlight="COMPLETE" prompt="VIEW ACHIEVEMENTS">
            <div style={{ padding: 'clamp(1rem, 2vw, 3rem)' }}>
              <h2 style={{ ...fontStyle, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', fontWeight: 900, marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>MILESTONES & <span className="glow-blue">ACHIEVEMENTS</span></h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div style={{ padding: '1.5rem', borderLeft: `4px solid ${BR.blue}`, background: 'rgba(0,0,0,0.4)', borderRadius: '4px' }}>
                  <h3 style={{ ...fontStyle, fontSize: '1.1rem', color: '#fff', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase' }}>Technical Lead — Manthan Event</h3>
                  <p style={{ ...fontStyle, color: '#aaa', fontSize: '0.85rem', lineHeight: 1.6 }}>Directed end-to-end development lifecycle for institutional flagship event's digital infrastructure, successfully serving 110 concurrent users via Agile sprints and delivering production deployment securely.</p>
                </div>
                <div style={{ padding: '1.5rem', borderLeft: `4px solid ${BR.red}`, background: 'rgba(0,0,0,0.4)', borderRadius: '4px' }}>
                  <h3 style={{ ...fontStyle, fontSize: '1.1rem', color: '#fff', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase' }}>The Hindu Change Maker Awards 2025</h3>
                  <p style={{ ...fontStyle, color: '#aaa', fontSize: '0.85rem', lineHeight: 1.6 }}>Provided critical real-time video editing and post-production support during this nationally televised award ceremony in a high-pressure, time-constrained environment.</p>
                </div>
                <div style={{ padding: '1.5rem', borderLeft: `4px solid ${BR.blue}`, background: 'rgba(0,0,0,0.4)', borderRadius: '4px' }}>
                  <h3 style={{ ...fontStyle, fontSize: '1.1rem', color: '#fff', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase' }}>Certifications</h3>
                  <p style={{ ...fontStyle, color: '#aaa', fontSize: '0.85rem', lineHeight: 1.6 }}>• Google Python Programming<br />• Google Ads Display Certification<br />• Google UX Design Fundamentals<br />• Coursera Data Analytics Basics</p>
                </div>
              </div>
            </div>
          </CyberContainer>
        </div>
      </Overlay>

      {/* ── CONTACT ── */}
      <Overlay opacity={zones.contact}>
        <div style={{ width: 'min(1100px, 95vw)' }}>
          <CyberContainer title="CONTACT" subtitle="LINK" highlight="ESTABLISH" prompt="OPEN COMMS">
            <div style={{ padding: 'clamp(1.5rem, 2vw, 3rem)' }}>
                <h2 style={{ ...fontStyle, fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', fontWeight: 900, marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>ESTABLISH <span className="glow-red">LINK</span></h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  {[{ l: 'EMAIL', v: 'riyathakur155555@gmail.com', h: 'mailto:riyathakur155555@gmail.com', c: BR.blue }, { l: 'GITHUB', v: 'riyx-01', h: 'https://github.com/riyx-01', c: BR.red }, { l: 'LINKEDIN', v: 'riyathakur01', h: 'https://www.linkedin.com/in/riyathakur01', c: BR.blue }, { l: 'RESUME', v: 'CV Link', h: 'https://riyathakur-cv.netlify.app', c: BR.red }].map(link => (
                    <a key={link.l} href={link.h} target="_blank" rel="noopener" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', border: `1px solid ${link.c}44`, background: 'rgba(0,0,0,0.3)', borderRadius: '4px', textDecoration: 'none' }}>
                      <div style={{ ...fontStyle, fontSize: '0.7rem', color: link.c, fontWeight: 900 }}>{link.l}</div>
                      <div style={{ ...fontStyle, color: '#fff', fontSize: '1rem', wordBreak: 'break-all' }}>{link.v}</div>
                    </a>
                  ))}
                </div>
            </div>
          </CyberContainer>
        </div>
      </Overlay>
    </>
  )
}



function BlinkingCursor() { return <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>█</motion.span> }
function Overlay({ opacity, children }: { opacity: number, children: React.ReactNode }) { 
  return (
    <div style={{ 
      position: 'fixed', inset: 0, zIndex: 10, 
      opacity, pointerEvents: opacity > 0.1 ? 'auto' : 'none',
      overflowY: 'auto', overflowX: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <div style={{ margin: 'auto 0', padding: '0.5rem 0.5rem 5rem 0.5rem', minHeight: 'min-content', width: '100%', display: 'flex', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  ) 
}

const HomeIcon = () => <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" width="20"><path fill="currentColor" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" /></svg>
const AboutIcon = () => <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" width="20"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C105.1 288 64 329.1 64 379.7V448c0 35.3 28.7 64 64 64h192c35.3 0 64-28.7 64-64v-68.3c0-50.6-41.1-91.7-91.7-91.7z" /></svg>
const SkillsIcon = () => <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" width="20"><path fill="currentColor" d="M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z" /></svg>
const ProjectsIcon = () => <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="20"><path fill="currentColor" d="M464 48H48C21.49 48 0 69.49 0 96v320c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V96c0-26.51-21.49-48-48-48zM192 128c17.67 0 32 14.33 32 32s-14.33 32-32 32-32-14.33-32-32 14.33-32 32-32zm208 256H104c-4.42 0-8-3.58-8-8v-24c0-4.42 3.58-8 8-8h296c4.42 0 8 3.58 8 8v24c0 4.42-3.58 8-8 8zm0-64H104c-4.42 0-8-3.58-8-8v-24c0-4.42 3.58-8 8-8h296c4.42 0 8 3.58 8 8v24c0 4.42-3.58 8-8 8zm0-64H312c-4.42 0-8-3.58-8-8v-24c0-4.42 3.58-8 8-8h96c4.42 0 8 3.58 8 8v24c0 4.42-3.58 8-8 8z" /></svg>
const ContactIcon = () => <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="20"><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9V96c0-26.5-21.5-48-48-48H48C21.5 48 0 69.5 0 96v35.1c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" /></svg>

const SKILL_GROUPS = [{ cat: 'PROGRAMMING.SYS', items: ['Python', 'SQL', 'JavaScript', 'Java', 'HTML', 'CSS', 'R'], color: BR.red }, { cat: 'INTERFACE.SYS', items: ['Flask', 'ASP.NET', 'HTML5', 'CSS3', 'WordPress'], color: BR.blue }, { cat: 'DATA_DEX', items: ['TensorFlow', 'Keras', 'OpenCV', 'CNN/ResNet', 'Database Systems'], color: BR.red }, { cat: 'UTILITY.EXE', items: ['Git/GitHub', 'Figma', 'VS Code', 'Jupyter', 'Agile/REST'], color: BR.blue }]
const RICH_PROJECTS = [
  {
    title: 'Manthan Event Platform',
    subtitle: 'LIVE ARCHITECTURE',
    tech: 'Lead Developer',
    desc: 'Directed end-to-end development lifecycle for my institutional flagship event, serving over 110 concurrent users.',
    features: ['Led planning and Agile sprints', 'Real-time performance analytics framework', 'Risk mitigation & production deployment'],
    demonstrates: 'Leadership, Teamwork, High-pressure production deployment',
    link: 'https://bvimitmanthan.vercel.app/',
    color: BR.blue
  },
  {
    title: 'HSync',
    subtitle: 'HEALTH ASSISTANT',
    tech: 'Python, Flask, SQLite, JS, REST APIs',
    desc: 'Architected health management platform enabling structured AI-generated health reports with historical tracking.',
    features: ['Secure user auth & session management', 'HIPAA-aligned data privacy standards', 'Interpreted analytics & historical tracking'],
    demonstrates: 'Full-stack development, API integration, Role-based access control',
    color: BR.red
  },
  {
    title: 'Deepfake Detection',
    subtitle: 'ML / VISION',
    tech: 'Python, TensorFlow, ResNet-50, OpenCV',
    desc: 'Production-ready deep learning pipeline achieving high accuracy in detecting manipulated visual media.',
    features: ['Transfer learning with ResNet-50', 'Grad-CAM visualization algorithms (heatmaps)', 'Tensor quantization for latency optimization'],
    demonstrates: 'Machine learning, Computer vision, Containerized web deployments',
    color: BR.blue
  },
  {
    title: 'Breast Cancer CNN',
    subtitle: 'DIAGNOSTICS',
    tech: 'Python, TensorFlow, Keras, Scikit-learn',
    desc: 'End-to-end deep learning solution for automated classification of breast tissue histology images with 88% accuracy.',
    features: ['Medical image preprocessing & augmentation', 'Convolutional Neural Network training', 'Hyperparameter optimization'],
    demonstrates: 'Deep learning fundamentals, Data preprocessing, Ensemble modeling',
    color: BR.red
  },
  {
    title: 'Student Management',
    subtitle: 'ARCHITECTURE',
    tech: 'ASP.NET MVC, C#, SQL Server, Bootstrap',
    desc: 'Enterprise-grade web application facilitating student enrollment, course registration, and academic record management.',
    features: ['Robust relational DB with stored procedures', 'Secure authentication & password encryption', 'Stakeholder specification alignment'],
    demonstrates: 'Backend development, Advanced Database logic, Enterprise Architecture',
    color: BR.blue
  },
  {
    title: 'Toontastic',
    subtitle: 'INTERFACE',
    tech: 'JavaScript, CSS, HTML5, Figma',
    desc: 'Responsive single-page application created for users to seamlessly explore and search cartoon programming metadata.',
    features: ['Search cartoons by name & categories', 'Asynchronous data fetching & DOM logic', 'Clean responsive user interface'],
    demonstrates: 'Frontend development skills, User interface design, Async operations',
    color: BR.red
  },
]

function ProjectCarousel() {
  const [index, setIndex] = React.useState(0)
  const [visible, setVisible] = React.useState(true)
  const fontStyle = { fontFamily: 'var(--font-body)', letterSpacing: '0.02em' }

  const goTo = (newIndex: number) => {
    setVisible(false)
    setTimeout(() => {
      setIndex(newIndex)
      setVisible(true)
    }, 180)
  }

  const next = () => goTo((index + 1) % RICH_PROJECTS.length)
  const prev = () => goTo((index - 1 + RICH_PROJECTS.length) % RICH_PROJECTS.length)

  const p = RICH_PROJECTS[index]

  return (
    <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '0.5rem' }}>
        <button onClick={prev} style={{ padding: '0.3rem 0.8rem', background: 'rgba(30,144,255,0.1)', border: `1px solid ${BR.blue}`, color: BR.blue, cursor: 'pointer', fontSize: '0.9rem', borderRadius: '4px', transition: '0.2s', zIndex: 50 }}>◄</button>
        <div style={{ ...fontStyle, color: '#aaa', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em' }}>{index + 1} / {RICH_PROJECTS.length}</div>
        <button onClick={next} style={{ padding: '0.3rem 0.8rem', background: 'rgba(30,144,255,0.1)', border: `1px solid ${BR.blue}`, color: BR.blue, cursor: 'pointer', fontSize: '0.9rem', borderRadius: '4px', transition: '0.2s', zIndex: 50 }}>►</button>
      </div>

      <div style={{ 
        width: '100%', 
        background: 'rgba(10,10,16,0.8)', 
        border: '1px solid rgba(255,255,255,0.1)', 
        borderTop: `4px solid ${p.color}`,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        padding: 'clamp(0.8rem, 2vh, 1.5rem)',
        gap: 'clamp(0.8rem, 2vh, 1.5rem)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.18s ease',
        borderRadius: '4px'
      }}>
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ ...fontStyle, fontSize: 'clamp(0.6rem, 1.5vh, 0.75rem)', color: p.color, fontWeight: 900, marginBottom: '0.2rem', letterSpacing: '1px' }}>{p.subtitle}</div>
          <h3 style={{ ...fontStyle, fontSize: 'clamp(1.1rem, 3vh, 1.6rem)', color: '#fff', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '0.5rem' }}>{p.title}</h3>
          <p style={{ ...fontStyle, fontSize: 'clamp(0.75rem, 1.8vh, 0.85rem)', color: '#ccc', lineHeight: 1.4, marginBottom: '0.8rem' }}>{p.desc}</p>
          <div style={{ ...fontStyle, fontSize: 'clamp(0.7rem, 1.5vh, 0.8rem)', color: '#999', marginTop: 'auto' }}><strong style={{ color: '#fff' }}>TECH:</strong> {p.tech}</div>
          {p.link && (
            <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', alignSelf: 'flex-start', marginTop: '0.8rem', padding: '0.3rem 0.8rem', background: p.color + '22', border: `1px solid ${p.color}`, color: p.color, textDecoration: 'none', fontSize: 'clamp(0.65rem, 1.5vh, 0.75rem)', fontWeight: 900, letterSpacing: '1px', borderRadius: '3px' }}>LAUNCH PROJECT ►</a>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ color: p.color, fontSize: 'clamp(0.65rem, 1.5vh, 0.75rem)', fontWeight: 900, marginBottom: '0.3rem', letterSpacing: '1px' }}>KEY FEATURES</div>
          <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.8rem' }}>
            {p.features.map(f => <li key={f} style={{ ...fontStyle, fontSize: 'clamp(0.7rem, 1.8vh, 0.8rem)', color: '#aaa' }}><span style={{ color: p.color, marginRight: '6px' }}>▹</span>{f}</li>)}
          </ul>
          <div style={{ color: p.color, fontSize: 'clamp(0.65rem, 1.5vh, 0.75rem)', fontWeight: 900, marginBottom: '0.3rem', letterSpacing: '1px' }}>DEMONSTRATES</div>
          <p style={{ ...fontStyle, fontSize: 'clamp(0.7rem, 1.8vh, 0.8rem)', color: '#aaa', lineHeight: 1.3 }}>{p.demonstrates}</p>
        </div>
      </div>
    </div>
  )
}

