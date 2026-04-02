'use client'
import React from 'react'
import { Zone1_Hero } from './Zone1_Hero'
import { Zone2_About } from './Zone2_About'
import { Zone3_Skills } from './Zone3_Skills'
import { Zone4_Projects } from './Zone4_Projects'
import { Zone5_Contact } from './Zone5_Contact'

export function JourneyWorld({ scrollProgress }: { scrollProgress: number }) {
  return (
    <group>
      <Zone1_Hero />
      <Zone2_About />
      <Zone3_Skills />
      <Zone4_Projects />
      <Zone5_Contact />
    </group>
  )
}
