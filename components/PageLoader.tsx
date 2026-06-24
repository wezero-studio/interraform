'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

// Module-level flag — resets on real page reload (module reload),
// but survives React Strict Mode's double-mount within the same session.
let loaderHasPlayed = false

export default function PageLoader() {
  const [exiting, setExiting] = useState(false)
  const [hidden, setHidden] = useState(false)
  const pathname = usePathname()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    const pc = document.getElementById('page-content')

    if (!loaderHasPlayed) {
      loaderHasPlayed = true

      if (pc) pc.style.opacity = '0'
      setTimeout(() => { if (pc) pc.style.opacity = '1' }, 100)

      // No cleanup returned — timers must survive the strict-mode remount
      // so the exit animation actually fires on the live component instance.
      setTimeout(() => setExiting(true), 1200)
      setTimeout(() => setHidden(true), 2000)
      return
    }

    // Client-side navigation after the initial load
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname
      setHidden(true)
      if (pc) pc.style.opacity = '1'
    }
  }, [pathname])

  if (hidden) return null

  return (
    <div
      className={exiting ? 'loader-exit' : ''}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: 'calc(100vh + 120px)',
        zIndex: 9999,
        willChange: 'transform',
      }}
    >
      {/* Solid black main panel */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '100vh',
        backgroundColor: '#000',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem',
      }}>
        <h1 style={{
          color: 'white',
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 500,
          letterSpacing: '-0.03em',
          fontFamily: 'Inter, sans-serif',
        }}>
          interra<span style={{ fontWeight: 700 }}>Form</span>
        </h1>
        <div style={{ width: '160px', height: '1px', backgroundColor: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
          <div className="loader-bar" style={{ height: '100%', backgroundColor: 'rgba(255,255,255,0.8)' }} />
        </div>
      </div>

      {/* Concave wave tail — black, sits below viewport, creates curved exit */}
      <div style={{ position: 'absolute', top: '100vh', left: 0, right: 0, height: '120px', overflow: 'visible' }}>
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '120px', display: 'block', overflow: 'visible' }}
        >
          <path d="M0,0 L1440,0 L1440,120 Q720,-60 0,120 Z" fill="#000000" />
        </svg>
      </div>
    </div>
  )
}
