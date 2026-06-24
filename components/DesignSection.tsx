'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Layout, PenTool, Building2, Key } from 'lucide-react'

const services = [
  {
    icon: Layout,
    title: 'Workspace Design',
    desc: 'Strategic interior design focused on productivity, workflow, and space efficiency.',
    desktopPos: 'top-[35%] left-[8%]', 
    glass: false,
    speed: 0.15
  },
  {
    icon: PenTool,
    title: 'Office Remodeling',
    desc: 'Transforming outdated offices into modern, efficient work environments.',
    desktopPos: 'top-0 left-[28%]', 
    glass: false,
    speed: -0.2
  },
  {
    icon: Building2,
    title: 'Commercial Interiors',
    desc: 'Interior solutions for showrooms, clinics, restaurants, and commercial spaces.',
    desktopPos: 'bottom-0 right-[25%]', 
    glass: true,
    speed: 0.25
  },
  {
    icon: Key,
    title: 'Turnkey Projects',
    desc: 'Complete solution from design to execution and final handover.',
    desktopPos: 'top-20 right-[8%]', 
    glass: false,
    speed: -0.1
  }
]

export default function DesignSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let currentOffset = 0
    let targetOffset = 0
    let ticking = false
    let reqId: number

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const updateParallax = () => {
      currentOffset = lerp(currentOffset, targetOffset, 0.05)

      // Move central image - reduced multiplier so it stays in frame tightly
      if (imageRef.current) {
        imageRef.current.style.transform = `translate3d(0, ${currentOffset * 0.15 * 300}px, 0)`
      }

      // Move cards at individual speeds - amplified
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const speed = services[index].speed
          card.style.transform = `translate3d(0, ${currentOffset * speed * 600}px, 0)`
        }
      })

      if (Math.abs(targetOffset - currentOffset) > 0.01) {
        reqId = window.requestAnimationFrame(updateParallax)
      } else {
        ticking = false
      }
    }

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        // Normalized scroll position relative to section center (-0.5 to 0.5)
        targetOffset = (rect.top - window.innerHeight / 2) / window.innerHeight
      }
      if (!ticking) {
        ticking = true
        reqId = window.requestAnimationFrame(updateParallax)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.cancelAnimationFrame(reqId)
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="bg-[#0a0a0a] min-h-screen pt-32 pb-8 px-6 md:px-12 lg:px-24 overflow-hidden relative"
    >
      <div className="max-w-[1400px] mx-auto relative pt-12 md:pt-24 pb-8">
        
        {/* Title Block */}
        <div className="relative z-20 mb-16 md:mb-0 md:absolute md:top-0 md:left-0 md:w-1/3">
          <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-4">
            OUR SERVICES
          </p>
          <h2 className="font-heading text-5xl md:text-6xl text-white font-semibold leading-tight tracking-tight">
            What We Do
          </h2>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden md:block relative w-full h-[800px]">
          
          {/* Central Curved Image Box - Made Slightly Smaller */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] h-[72%] z-0 rounded-[40px] overflow-hidden" 
               style={{ borderTopRightRadius: '220px', borderBottomLeftRadius: '220px' }}>
            <div 
              ref={imageRef}
              className="absolute inset-x-0 w-full"
              style={{ top: '-15%', height: '130%' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                alt="Office Workspace Interior"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="absolute inset-0 bg-black/25 mix-blend-overlay" />
          </div>

          {/* Cards - Thinner, taller, and Floating */}
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div 
                key={index}
                ref={el => { cardsRef.current[index] = el }}
                className={`absolute w-[240px] min-h-[280px] z-10 flex flex-col items-center justify-center text-center px-8 py-10 rounded-2xl transition-all duration-300
                  ${service.glass 
                    ? 'bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl' 
                    : 'bg-[#111] border border-white/5'
                  } 
                  ${service.desktopPos}
                `}
              >
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-white mb-3 tracking-tight">{service.title}</h3>
                <p className="text-white/40 text-[11px] leading-relaxed max-w-[180px]">
                  {service.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* MOBILE LAYOUT */}
        <div className="md:hidden flex flex-col gap-12 relative">
          <div className="relative w-full aspect-[4/5] rounded-[40px] overflow-hidden z-0"
               style={{ borderTopRightRadius: '120px' }}>
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
              alt="Office Workspace Interior"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="grid grid-cols-1 gap-6 relative z-10 -mt-20">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div 
                  key={index}
                  className="flex flex-col items-center text-center p-8 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10"
                >
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed max-w-[220px]">
                    {service.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
