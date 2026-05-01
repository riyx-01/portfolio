import React from 'react'
import type { Metadata } from 'next'
import { Cormorant_Garamond, Syne, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
})

import SmoothScroll from '../components/SmoothScroll'

export const metadata: Metadata = {
  title: 'Portfolio — Riya Thakur',
  description: 'IT Graduate • Software Development • Data • Web • MCA Student',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${syne.variable} ${mono.variable}`}>
      <body className="bg-bg text-text font-body antialiased selection:bg-accent selection:text-bg">
        <style dangerouslySetInnerHTML={{ __html: `
          html {
            scroll-behavior: auto !important;  /* NO SMOOTH SCROLL — breaks Three.js sync */
          }
          * {
            -webkit-overflow-scrolling: touch;
          }
          body {
            overflow-x: hidden;
          }
           /* Disable scroll pull-to-refresh on mobile */
          body { overscroll-behavior-y: none; }
        ` }} />
        
        {/* SVG UI Filters (Hidden) */}
        <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="13" result="blur" />
              <feColorMatrix in="blur" mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
            <filter id="glass-distort">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3"
                stitchTiles="stitch" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise"
                scale="3" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
        </svg>
        
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
