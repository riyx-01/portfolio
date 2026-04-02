// Total scroll: 300vh (Frames) + 500vh (Experience) = 800vh
export const SCROLL_HEIGHT = '800vh'

// Split point: 300 / 800 = 0.375
export const FRAME_END_PERCENT = 0.375 
export const TOTAL_FRAMES = 89

export const BR = {
  void:     '#050208',
  fog:      '#050208', // Match background as per rule
  red:      '#ff2020',
  blue:     '#1e90ff',
  white:    '#f0e8d0',
  teal:     '#1e90ff',
  orange:   '#ff2020',
  purple:   '#1e90ff',
  muted:    '#6a6580',
  gold:     '#e8a040',
} as const

// Night City Zone mapping
export const ZONES = {
  HERO:     { z: 0,    label: 'Home',     color: '#ff2020' },
  ABOUT:    { z: -35,  label: 'About',    color: '#1e90ff' },
  SKILLS:   { z: -70,  label: 'Skills',   color: '#ff2020' },
  PROJECTS: { z: -105, label: 'Projects', color: '#1e90ff' },
  CONTACT:  { z: -140, label: 'Contact',  color: '#ff2020' },
} as const

// Camera Path
export const CAMERA_Z_START = 5
export const CAMERA_Z_END = -140

// Fog settings — clear and cool cinematic visibility
export const FOG_NEAR = 25
export const FOG_FAR  = 150
export const FOG_COLOR = BR.fog
