'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'
import { projects } from '@/lib/projects'

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)
  const [exitingId, setExitingId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%'])

  const handleCardClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setExitingId(id)
    setTimeout(() => {
      router.push(`/projects/${id}`)
    }, 800)
  }

  const isExiting = exitingId !== null

  return (
    <main className={`bg-[#f5f2ed] min-h-screen ${animated && !isExiting ? 'hero-animated' : ''}`}>
      <motion.div animate={isExiting ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.5 }}>
        <Navbar theme="light" />
      </motion.div>

      {/* ── Page header ── */}
      <section className="pt-40 pb-12 px-8 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <motion.div 
            animate={isExiting ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-black/35 text-[10px] tracking-[0.5em] uppercase mb-5">
              Our Portfolio
            </p>
            <h1 className="font-heading text-5xl md:text-8xl text-[#1a1a1a] font-medium leading-none tracking-tight">
              <span className="reveal-clip block">
               <span className="reveal-inner block line-1">PROJECTS</span>
              </span>
            </h1>
          </motion.div>
          <motion.p 
            animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
            className="hidden md:block text-black/40 text-sm tracking-wider text-right max-w-xs leading-relaxed"
          >
            A selection of our workspace design, office remodeling, and commercial interior projects.
          </motion.p>
        </div>
      </section>

      {/* ── Horizontal scroll section ── */}
      <div ref={containerRef} style={{ height: '350vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

          <motion.div 
            animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
            className="px-8 md:px-16 mb-8 flex items-center justify-between"
          >
           <motion.p
             className="text-[11px] tracking-[0.4em] text-black/35 uppercase"
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
           >
             {projects.length} Projects
           </motion.p>
           <motion.p
             className="text-[11px] tracking-[0.3em] text-black/30 uppercase flex items-center gap-3"
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
           >
             <span>Scroll</span>
             <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
               <path d="M1 5h16M12 1l5 4-5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
             </svg>
           </motion.p>
          </motion.div>

          {/* Sliding row */}
          <div className="pl-8 md:pl-16 overflow-visible">
            <motion.div
              style={{ x }}
              className="flex w-max gap-5 will-change-transform pr-16"
            >
              {projects.map((p, i) => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  index={i} 
                  onClick={(e) => handleCardClick(e, p.id)}
                  isExiting={isExiting}
                />
              ))}
            </motion.div>
          </div>

          <motion.div 
            animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
            className="absolute bottom-8 left-8 right-8 md:left-16 md:right-16"
          >
            <div className="relative w-full h-px bg-black/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-black/35"
                style={{ scaleX: scrollYProgress, originX: 0 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div animate={isExiting ? { opacity: 0 } : { opacity: 1 }}>
        <Footer
          ctaHeadline={['Bringing vision to life,', 'one project at a time.']}
          ctaImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2400"
        />
      </motion.div>
    </main>
  )
}

function ProductCard({
  product,
  index,
  onClick,
  isExiting
}: {
  product: (typeof projects)[0]
  index: number
  onClick: (e: React.MouseEvent) => void
  isExiting: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={isExiting ? { opacity: 0, y: 300 } : { opacity: 1, y: 0 }}
      transition={{
        duration: isExiting ? 0.7 : 1,
        delay: isExiting ? index * 0.05 : 0.15 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex-shrink-0 group cursor-pointer"
      style={{ width: 'clamp(220px, 24vw, 380px)' }}
      onClick={onClick}
    >
      <a href={`/projects/${product.id}`} onClick={(e) => e.preventDefault()}>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[10px] tracking-[0.45em] text-[#1a1a1a]/60 uppercase">
            {product.name}
          </p>
          <span className="text-[9px] tracking-[0.25em] text-black/30">{product.year}</span>
        </div>

        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H5M12 2V9" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </a>
    </motion.div>
  )
}
