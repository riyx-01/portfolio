'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { BR, FRAME_END_PERCENT } from '@/lib/constants'
import { getZoneOpacity, ZONE_BOUNDARIES } from '@/lib/useScrollProgress'

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
    contact: getZoneOpacity(wp, ZONE_BOUNDARIES[4], ZONE_BOUNDARIES[5]),
  }

  const scrollToSection = (index: number) => {
    const zoneStart = ZONE_BOUNDARIES[index]
    const targetSp = FRAME_END_PERCENT + (zoneStart * (1 - FRAME_END_PERCENT))
    const totalHeight = document.documentElement.scrollHeight
    window.scrollTo({
      top: targetSp * totalHeight,
      behavior: 'smooth'
    })
  }

  const navItems = [
    { label: 'ABOUT', index: 1, icon: <AboutIcon /> },
    { label: 'SKILLS', index: 2, icon: <SkillsIcon /> },
    { label: 'PROJECTS', index: 3, icon: <ProjectsIcon /> },
    { label: 'CONTACT', index: 4, icon: <ContactIcon /> },
  ]

  const fontStyle = { fontFamily: 'var(--font-body)', letterSpacing: '0.02em' }

  return (
    <>
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1,
        backgroundImage: `url('/persona_city.png')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.12, filter: 'grayscale(0.4) contrast(1.2) brightness(0.7)',
        pointerEvents: 'none'
      }} />

      <nav style={{
        position: 'fixed', top: '2.5rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 100,
      }}>
        <div className="nav-card-iso">
          <ul>
            {navItems.map((item) => (
              <li key={item.label} className="iso-pro" onClick={() => scrollToSection(item.index)}>
                <span></span><span></span><span></span>
                <div className="svg-nav">{item.icon}</div>
                <div className="iso-text" style={fontStyle}>{item.label}</div>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── HERO ── */}
      <Overlay opacity={zones.hero}>
        <div className="scanlines" style={{ opacity: 0.1, zIndex: 0 }} />
        <div style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', zIndex: 1 }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}><CityVisuals /></div>
          
          <div className="holo-card holo-card-red" style={{ position: 'relative', width: 'clamp(300px, 90vw, 1100px)', height: 'clamp(400px, 80vh, 700px)', zIndex: 5, padding: '2px', overflowY: 'auto', overflowX: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', minHeight: '100%', padding: 'clamp(1.5rem, 3vw, 3rem)', gap: 'clamp(1.5rem, 3vw, 3rem)' }}>
              <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(255, 32, 32, 0.3)', background: '#000', minHeight: '250px' }}>
                <video src="/video/open.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.1) brightness(0.9)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, #000)' }} />
                <h1 style={{ ...fontStyle, position: 'absolute', bottom: '1.5rem', left: '1.5rem', fontSize: 'clamp(4rem, 8vw, 9rem)', fontWeight: 900, color: '#fff', letterSpacing: '-5px', margin: 0, textShadow: `5px 5px 0px ${BR.red}` }}>RIYA</h1>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="glow-red flicker" style={{ ...fontStyle, fontSize: '0.7rem', letterSpacing: '0.5em', fontWeight: 900, marginBottom: 'clamp(1rem, 2vw, 2.5rem)' }}>&gt; AUTHENTICATION: GRANTED<BlinkingCursor /></div>
                <h2 style={{ ...fontStyle, fontSize: 'clamp(1.5rem, 3vw, 3rem)', fontWeight: 800, color: '#fff', textTransform: 'uppercase', marginBottom: 'clamp(1.5rem, 2vw, 2.5rem)', lineHeight: 1 }}>IT GRADUATE & <br /><span style={{ color: BR.red }}>MCA OPERATIVE</span></h2>
                <p style={{ ...fontStyle, fontSize: '1rem', color: '#ccc', lineHeight: 1.8, borderLeft:`3px solid ${BR.red}`, paddingLeft:'1.5rem' }}>
                    I am a highly motivated IT graduate with a strong academic background and hands-on experience in developing practical, real-world applications. Currently pursuing MCA, I am eager to contribute to meaningful projects and grow into a versatile technology professional.
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                  {[{l:'LVL',v:'21'},{l:'EXP',v:'HIGH'},{l:'LOC',v:'BVIMIT'}].map(s=>(
                    <div key={s.l} style={{ border:'1px solid #333', padding:'0.8rem 1rem', background:'rgba(255,255,255,0.03)', flex: 1 }}>
                      <div style={{...fontStyle, fontSize:'0.5rem', color:BR.red, fontWeight:900}}>{s.l}</div>
                      <div style={{...fontStyle, fontSize:'0.85rem', color:'#fff', fontWeight:900}}>{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Overlay>

      {/* ── ABOUT ── */}
      <Overlay opacity={zones.about}>
        <div className="holo-card" style={{ maxWidth: '1200px', width: '95%', maxHeight: '85vh', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(2rem, 4vw, 4rem)', padding: 'clamp(2rem, 4vw, 4.5rem)' }}>
          <div style={{ position: 'relative', overflow: 'hidden', border: `1px solid ${BR.blue}44`, background: '#000', minHeight: '300px' }}>
             <video src="/video/type.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.2) brightness(0.9) grayscale(0.2)' }} />
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8))' }} />
             <div className="glow-blue" style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', ...fontStyle, fontSize: '0.8rem', fontWeight: 900 }}>[OPERATOR BIO]</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="glow-blue" style={{ ...fontStyle, fontSize: '0.75rem', fontWeight: 900, marginBottom: '1.5rem' }}>[PERSPECTIVE.LOG]</div>
            <h2 style={{ ...fontStyle, fontSize:'clamp(2rem, 4vw, 3.5rem)', color:'#fff', textTransform:'uppercase', lineHeight:1, fontWeight:800, marginBottom:'1.5rem' }}>ENGINEERING <br /><span className="glow-blue">BETTER FUTURES</span></h2>
            <p style={{ ...fontStyle, fontSize:'clamp(0.9rem, 1.5vw, 1.1rem)', color:'#ccc', lineHeight:1.8, marginBottom:'2rem' }}>Bridging academic excellence and professional execution. Specializing in full-stack architecture and intelligent systems.</p>
            <div style={{ display:'flex', gap:'3rem', marginTop: 'auto' }}>
                {[{n:'9.39',l:'GRAD GPA'},{n:'2025',l:'MCA TARGET'}].map(s=>(
                    <div key={s.l}><div style={{...fontStyle, fontSize:'clamp(1.5rem, 3vw, 2.5rem)', fontWeight:900, color:BR.blue}}>{s.n}</div><div style={{...fontStyle, fontSize:'0.7rem', color:'#666', fontWeight:900}}>{s.l}</div></div>
                ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft:`1px solid ${BR.blue}33`, paddingLeft:'clamp(1.5rem, 3vw, 4rem)' }}>
            <div className="glow-red" style={{ ...fontStyle, fontSize:'0.75rem', marginBottom:'2rem', fontWeight:900 }}>[ATTRIBUTES]</div>
            <ul style={{ listStyle:'none', padding:0, fontSize:'clamp(0.85rem, 1.5vw, 1rem)', color:'#aaa', display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              {['ADAPTABLE', 'PROBLEM SOLVING', 'SCALABLE DESIGN', 'TEAM LEADERSHIP'].map(a => <li key={a} style={fontStyle}><span style={{color:BR.blue}}>➔</span> {a}</li>)}
            </ul>
          </div>
        </div>
      </Overlay>

      {/* ── SKILLS ── */}
      <Overlay opacity={zones.skills}>
        <div style={{ width: '100%', maxWidth: '1200px', padding: '0 clamp(1rem, 4vw, 4rem)', maxHeight: '85vh', overflowY: 'auto' }}>
          <h2 style={{ ...fontStyle, fontSize:'clamp(3rem, 6vw, 6rem)', color:'#fff', textAlign:'center', fontWeight:900, marginBottom:'clamp(2rem, 4vw, 4rem)' }}>TECH <span className="glow-red">CORE.SYS</span></h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'1.5rem' }}>
            {SKILL_GROUPS.map(g => (
                <div key={g.cat} className="holo-card" style={{ padding:'3rem', borderTop:`6px solid ${g.color}` }}>
                    <div style={{...fontStyle, fontSize:'1.1rem', color:g.color, fontWeight:900, marginBottom:'2rem'}}>{g.cat}</div>
                    <div style={{display:'flex', flexDirection:'column', gap:'1.2rem'}}>
                        {g.items.map(i => <span key={i} style={{...fontStyle, fontSize:'1rem', color:'#eee'}}>{i}</span>)}
                    </div>
                </div>
            ))}
          </div>
        </div>
      </Overlay>

      {/* ── PROJECTS ── */}
      <Overlay opacity={zones.projects}>
        <div style={{ width:'100%', padding:'0 5vw', maxHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ ...fontStyle, fontSize:'clamp(2.5rem, 5vw, 5rem)', color:'#fff', fontWeight:900, marginBottom:'clamp(1rem, 2vw, 2rem)' }}>PROJECT <span className="glow-blue">INTERFACE</span></h2>
          <ProjectCarousel />
        </div>
      </Overlay>

      {/* ── CONTACT ── */}
      <Overlay opacity={zones.contact}>
        <div className="holo-card" style={{ width:'100%', maxWidth:'1100px', maxHeight: '85vh', overflowY: 'auto', padding:'clamp(2rem, 4vw, 5rem)', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'clamp(2rem, 4vw, 5rem)' }}>
            <div>
                <h2 style={{...fontStyle, fontSize:'clamp(3rem, 6vw, 5rem)', color:'#fff', fontWeight:900, marginBottom:'clamp(2rem, 4vw, 4rem)'}}>ESTABLISH <span className="glow-red">LINK</span></h2>
                <div style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
                    {[{l:'EMAIL',v:'riyathakur155555@gmail.com',h:'mailto:riyathakur155555@gmail.com',c:BR.blue},{l:'GITHUB',v:'github.com/riyx-01',h:'https://github.com/riyx-01',c:BR.red},{l:'LINKEDIN',v:'linkedin.com/in/riyathakur01',h:'https://www.linkedin.com/in/riyathakur01',c:BR.blue}].map(link => (
                        <a key={link.l} href={link.h} target="_blank" rel="noopener" className="holo-card" style={{ padding:'1.5rem', display:'flex', justifyContent:'space-between', border:`1px solid ${link.c}44`, textDecoration:'none' }}>
                            <div><div style={{...fontStyle, fontSize:'0.7rem', color:link.c, fontWeight:900}}>{link.l}</div><div style={{...fontStyle, color:'#fff', fontSize:'0.9rem'}}>{link.v}</div></div>
                        </a>
                    ))}
                </div>
            </div>
            <div style={{ borderLeft:`1px solid ${BR.blue}33`, paddingLeft:'clamp(1rem, 3vw, 4rem)' }}>
                <div className="glow-blue" style={{...fontStyle, fontSize:'0.8rem', fontWeight:900, marginBottom:'3rem'}}>[EXPERIENCE_STREAMS]</div>
                <div className="holo-card" style={{ padding:'3rem', borderLeft:`8px solid ${BR.blue}` }}>
                    <h3 style={{...fontStyle, fontSize:'1.6rem', color:'#fff', fontWeight:800, marginBottom:'1.5rem'}}>THE HINDU AWARDS 2025</h3>
                    <p style={{...fontStyle, color:'#aaa', fontSize:'1rem', lineHeight:1.7}}>Technical support and real-time operations for national excellence awards.</p>
                </div>
            </div>
        </div>
      </Overlay>
    </>
  )
}

function CityVisuals() {
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1 }}>
      <div style={{ position:'absolute', bottom:0, left:'-50%', width:'200%', height:'40%', background:`linear-gradient(90deg, transparent, rgba(30,144,255,0.05) 50%, transparent), repeating-linear-gradient(90deg, rgba(30,144,255,0.03) 0, rgba(30,144,255,0.03) 1px, transparent 1px, transparent 120px), repeating-linear-gradient(0deg, rgba(30,144,255,0.03) 0, rgba(30,144,255,0.03) 1px, transparent 1px, transparent 120px)`, transform:'perspective(400px) rotateX(65deg)', opacity:0.6 }} />
      {[ { l:'10%', h:'60%', w:'120px', c:BR.red }, { l:'25%', h:'85%', w:'180px', c:BR.blue }, { l:'60%', h:'70%', w:'150px', c:BR.red }, { l:'85%', h:'90%', w:'200px', c:BR.blue } ].map((b, i) => (
        <div key={i} style={{ position:'absolute', bottom:'15%', left:b.l, width:b.w, height:b.h, background:'rgba(5,5,10,0.98)', borderTop:`4px solid ${b.c}`, borderLeft:`1px solid ${b.c}22`, clipPath: i%2===0?'polygon(0 0, 100% 10%, 100% 100%, 0% 100%)':'polygon(0 15%, 100% 0, 100% 100%, 0% 100%)' }}>
          <div style={{ position:'absolute', inset:'1rem', background:`repeating-linear-gradient(to bottom, ${b.c}11 0px, ${b.c}11 2px, transparent 2px, transparent 12px)`, opacity:0.3 }} />
        </div>
      ))}
    </div>
  )
}

function BlinkingCursor() { return <motion.span animate={{ opacity:[1,0,1] }} transition={{ duration:0.8, repeat:Infinity }}>█</motion.span> }
function Overlay({ opacity, children }: { opacity:number, children:React.ReactNode }) { return <div style={{ position: 'fixed', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity, transition: 'opacity 0.6s ease', pointerEvents: opacity > 0.1 ? 'auto' : 'none' }}>{children}</div> }

const AboutIcon = () => <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" width="20"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C105.1 288 64 329.1 64 379.7V448c0 35.3 28.7 64 64 64h192c35.3 0 64-28.7 64-64v-68.3c0-50.6-41.1-91.7-91.7-91.7z" /></svg>
const SkillsIcon = () => <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" width="20"><path fill="currentColor" d="M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z" /></svg>
const ProjectsIcon = () => <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="20"><path fill="currentColor" d="M464 48H48C21.49 48 0 69.49 0 96v320c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V96c0-26.51-21.49-48-48-48zM192 128c17.67 0 32 14.33 32 32s-14.33 32-32 32-32-14.33-32-32 14.33-32 32-32zm208 256H104c-4.42 0-8-3.58-8-8v-24c0-4.42 3.58-8 8-8h296c4.42 0 8 3.58 8 8v24c0 4.42-3.58 8-8 8zm0-64H104c-4.42 0-8-3.58-8-8v-24c0-4.42 3.58-8 8-8h296c4.42 0 8 3.58 8 8v24c0 4.42-3.58 8-8 8zm0-64H312c-4.42 0-8-3.58-8-8v-24c0-4.42 3.58-8 8-8h96c4.42 0 8 3.58 8 8v24c0 4.42-3.58 8-8 8z" /></svg>
const ContactIcon = () => <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="20"><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9V96c0-26.5-21.5-48-48-48H48C21.5 48 0 69.5 0 96v35.1c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" /></svg>

const SKILL_GROUPS = [ { cat: 'PROGRAMMING.SYS', items: ['Python', 'SQL', 'JavaScript', 'C#'], color: BR.red }, { cat: 'INTERFACE.SYS', items: ['HTML/CSS', 'Flask', 'Next.js'], color: BR.blue }, { cat: 'DATA_DEX', items: ['ML', 'Computer Vision'], color: BR.red }, { cat: 'UTILITY.EXE', items: ['Git', 'Figma', 'VS Code'], color: BR.blue } ]
const RICH_PROJECTS = [
  {
    title: 'HSync',
    subtitle: 'HEALTH ASSISTANT',
    tech: 'Python, Flask, SQLite, JS, GenAI',
    desc: 'Full-stack health assistant providing an instant AI-generated health report based on interactive symptom input.',
    features: ['Secure user auth & session management', 'Interactive 3D/clickable body map', 'AI-generated reports with exercises'],
    demonstrates: 'Full-stack development, API & AI integration, Secure data storage',
    color: BR.red
  },
  {
    title: 'Deepfake Detection',
    subtitle: 'ML / VISION',
    tech: 'Python, TensorFlow, OpenCV, Flask, ResNet-50',
    desc: 'Deep learning web application that detects manipulated images and videos with instant heatmap visualizations.',
    features: ['Media upload & analysis', 'ResNet-50 deep learning model', 'Heatmap & metadata extraction'],
    demonstrates: 'Machine learning, Computer vision, Model evaluation',
    color: BR.blue
  },
  {
    title: 'Breast Cancer CNN',
    subtitle: 'DIAGNOSTICS',
    tech: 'Python, TensorFlow, Keras',
    desc: 'Applies deep learning in the healthcare domain to classify medical imagery tumors as benign or malignant.',
    features: ['Medical image preprocessing', 'Convolutional Neural Network training', 'High accuracy prediction system'],
    demonstrates: 'Deep learning fundamentals, Data preprocessing',
    color: BR.red
  },
  {
    title: 'Student Management',
    subtitle: 'ARCHITECTURE',
    tech: 'ASP.NET, SQL Server',
    desc: 'Complete web-based administrative system designed to manage student information and course registration automatically.',
    features: ['Registration & login system', 'Course registration module', 'Railway concession form integration'],
    demonstrates: 'Backend development, CRUD operations, Database integration',
    color: BR.blue
  },
  {
    title: 'Toontastic',
    subtitle: 'INTERFACE',
    tech: 'JavaScript, CSS, Figma',
    desc: 'An immersive web application created for cartoon enthusiasts to seamlessly explore and search content.',
    features: ['Search cartoons by name', 'Browse episodes and series', 'Clean and simple user interface'],
    demonstrates: 'Frontend development skills, User interface design',
    color: BR.red
  },
  {
    title: 'Manthan Event',
    subtitle: 'LIVE PRODUCTION',
    tech: 'Lead Developer',
    desc: 'Real production project deployed for my institute’s flagship event. Led the team to deliver within strict deadlines.',
    features: ['Led planning and development', 'Coordinated design teams', 'Built and deployed live environment'],
    demonstrates: 'Leadership, Teamwork, Real-world deployment',
    link: 'https://bvimitmanthan.vercel.app/',
    color: BR.blue
  }
]

function ProjectCarousel() {
  const [index, setIndex] = React.useState(0)
  const fontStyle = { fontFamily: 'var(--font-body)', letterSpacing: '0.02em' }
  const next = () => setIndex((i) => (i + 1) % RICH_PROJECTS.length)
  const prev = () => setIndex((i) => (i - 1 + RICH_PROJECTS.length) % RICH_PROJECTS.length)
  const active = RICH_PROJECTS[index]

  return (
    <div style={{ width: '100%', maxWidth: '750px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button onClick={prev} className="holo-card" style={{ padding: '0.8rem 1.2rem', background: 'rgba(30,144,255,0.1)', border: `1px solid ${BR.blue}`, color: BR.blue, cursor: 'pointer', fontSize: '1.2rem', transition: '0.2s' }}>◄</button>
        <div style={{ ...fontStyle, color: '#fff', fontSize: '1.2rem', fontWeight: 900, letterSpacing: '0.2em' }}>{index + 1} / {RICH_PROJECTS.length}</div>
        <button onClick={next} className="holo-card" style={{ padding: '0.8rem 1.2rem', background: 'rgba(30,144,255,0.1)', border: `1px solid ${BR.blue}`, color: BR.blue, cursor: 'pointer', fontSize: '1.2rem', transition: '0.2s' }}>►</button>
      </div>

      <style>{`
        .uiverse-container {
          position: relative;
          width: 100%;
          max-width: 500px;
          height: 180px; /* Initial state height corresponds to card-front */
          display: flex;
          justify-content: center;
          margin-bottom: 350px; /* Pre-allocate space for dropdown to prevent jumping */
        }
        .card-front {
          position: absolute;
          width: 100%;
          height: 180px;
          background: #0a0a10;
          border: 1px solid rgba(255,255,255,0.1);
          border-top: 4px solid var(--accent);
          z-index: 2;
          transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .card-back {
          position: absolute;
          width: 95%;
          height: 180px;
          background: rgba(5, 5, 8, 0.98);
          border: 1px solid rgba(255,255,255,0.05);
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          z-index: 1;
          transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          padding-top: 180px; /* Stays below front card */
          top: 0;
        }
        /* Uiverse CSS translated to cyberpunk hover */
        .card-front:hover {
          transform: translateY(-20px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px var(--accent-glow);
          background: #0f0f18;
        }
        .card-front:hover + .card-back {
          height: 520px;
          border-color: rgba(255,255,255,0.15);
          box-shadow: 0 20px 40px rgba(0,0,0,0.8);
        }
        .details-content {
          opacity: 0;
          transform: translateY(20px);
          transition: 0.4s;
          transition-delay: 0.1s;
          padding: 1.5rem;
          height: 340px;
          overflow-y: auto;
        }
        .card-front:hover + .card-back .details-content {
          opacity: 1;
          transform: translateY(0);
        }
        /* Custom invisible scrollbar for details */
        .details-content::-webkit-scrollbar { width: 4px; }
        .details-content::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 4px; }
      `}</style>
      
      <div className="uiverse-container" style={{ '--accent': active.color, '--accent-glow': active.color + '44' } as any}>
         <div className="card-front">
            <div style={{...fontStyle, fontSize:'0.75rem', color:active.color, fontWeight:900, marginBottom:'0.8rem'}}>{active.subtitle}</div>
            <h3 style={{...fontStyle, fontSize:'1.6rem', color:'#fff', fontWeight:800, textTransform: 'uppercase', lineHeight: 1.2}}>{active.title}</h3>
            <p style={{...fontStyle, fontSize:'0.9rem', color:'#999', marginTop:'1rem'}}><strong style={{color:'#fff'}}>TECH:</strong> {active.tech}</p>
         </div>
         <div className="card-back">
            <div className="details-content">
                <p style={{...fontStyle, fontSize:'0.95rem', color:'#ccc', lineHeight:1.7, marginBottom:'1.5rem'}}>{active.desc}</p>
                <div style={{ color: active.color, fontSize: '0.8rem', fontWeight: 900, marginBottom: '0.8rem', letterSpacing: '2px' }}>KEY FEATURES</div>
                <ul style={{ padding:0, margin:0, listStyle:'none', display:'flex', flexDirection:'column', gap:'0.6rem', marginBottom:'1.5rem' }}>
                   {active.features.map(f => <li key={f} style={{...fontStyle, fontSize:'0.9rem', color:'#aaa'}}><span style={{color:active.color, marginRight:'8px'}}>▹</span> {f}</li>)}
                </ul>
                <div style={{ color: active.color, fontSize: '0.8rem', fontWeight: 900, marginBottom: '0.8rem', letterSpacing: '2px' }}>DEMONSTRATES</div>
                <p style={{...fontStyle, fontSize:'0.9rem', color:'#aaa', lineHeight:1.5}}>{active.demonstrates}</p>
                {active.link && (
                   <a href={active.link} target="_blank" rel="noopener noreferrer" className="glow-blue" style={{ display:'inline-block', marginTop:'1.5rem', padding:'0.8rem 1.5rem', background:active.color+'22', border:`1px solid ${active.color}`, color:'#fff', textDecoration:'none', fontSize:'0.85rem', fontWeight:900, letterSpacing: '1px' }}>LAUNCH PROJECT ►</a>
                )}
            </div>
         </div>
      </div>
    </div>
  )
}
