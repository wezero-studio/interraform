'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function AboutPage() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const delay = 1200
    const timer = setTimeout(() => setAnimated(true), delay)
    
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll('.reveal-clip-vertical, .slide-up')
    animatedElements.forEach(el => observer.observe(el))

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <main className={`bg-[#f5f2ed] min-h-screen ${animated ? 'hero-animated' : ''}`}>
      <Navbar theme="light" />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-8 md:px-16 border-b border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* Top-Right Subtext */}
          <div className="md:absolute top-0 right-0 max-w-xs md:text-right mb-12 md:mb-0">
             <p className="text-black/60 text-xs md:text-sm font-light leading-relaxed slide-up">
               Environment influences focus, movement, collaboration, and productivity
             </p>
          </div>

          <p className="text-black/40 text-[10px] tracking-[0.4em] uppercase mb-4">
            Est. 1989
          </p>
          <h1 className="font-heading text-6xl md:text-[14rem] text-[#1a1a1a] font-semibold leading-none tracking-tighter">
            <span className="reveal-clip block">
              <span className="reveal-inner block line-1">INTERRA</span>
            </span>
            <span className="reveal-clip block">
              <span className="reveal-inner block line-2">FORM</span>
            </span>
          </h1>
        </div>
      </section>

      {/* Intro — Side Info Section */}
      <section className="py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left — Mission Statement text */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-[#1a1a1a] leading-tight mb-12">
              About Interraform
            </h2>
            <div className="space-y-8 text-[#1a1a1a]/70 text-base md:text-lg font-light leading-relaxed">
              <p>
                Interraform is a workspace design and interior transformation company focused on 
                building modern, functional, and high-performance environments.
              </p>
              <p>
                We believe that productivity, efficiency, and business performance are strongly 
                influenced by the environment people work in.
              </p>
              <p>
                That is why we focus on designing and building spaces that are not just 
                aesthetically modern, but also strategically planned and efficiently executed.
              </p>
              <p className="text-[#1a1a1a] font-medium">
                From office interiors to complete workspace remodeling, our goal is to create 
                environments where people work better, businesses operate smoother, and clients 
                feel impressed the moment they walk in.
              </p>
            </div>
          </div>

          {/* Right — Visual (High-end office/team context) */}
          <div className="relative aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 rounded-sm">
            <Image
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200"
              alt="High-performance Workspace"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute bottom-10 left-10">
              <p className="text-white text-lg font-light uppercase tracking-widest">Strategic Transformation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Impact Section — 3 Column */}
      <section className="py-32 px-8 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          
          {/* Left Column (4 cols) */}
          <div className="md:col-span-4 slide-up">
            <h2 className="font-heading text-4xl md:text-5xl text-[#1a1a1a] font-medium leading-[1.1] mb-8">
              Better environment leads to better work and better business.
            </h2>
            <div className="flex items-center gap-4 text-black/30">
              <div className="w-10 h-px bg-current" />
              <p className="text-[10px] tracking-[0.4em] uppercase font-light">Performance First</p>
            </div>
          </div>

          {/* Center Column — The Rectangle Animation (4 cols) */}
          <div className="md:col-span-4 flex justify-center">
             <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm group reveal-clip-vertical">
                {/* Scroll-triggered reveal inner */}
                <div className="reveal-inner-vertical absolute inset-0">
                  <Image
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200"
                    alt="Strategic Workspace Design"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
             </div>
          </div>

          {/* Right Column (4 cols) — Generated thematic text */}
          <div className="md:col-span-4 slide-up">
            <div className="space-y-8 text-[#1a1a1a]/70 text-base md:text-lg font-light leading-relaxed">
              <p>
                We believe that every square foot of your office should be a strategic asset. By meticulously optimizing for ergonomics, natural lighting, and intelligent spatial flow, we eliminate the friction that stifles team creativity.
              </p>
              <p>
                Our precision-led approach to design-build transformations ensures that your environment doesn&apos;t just house your team—it actively empowers their best work. When your physical space reflects your level of excellence, your business results follow.
              </p>
              <p className="text-[#1a1a1a] font-medium flex items-center gap-4">
                <ArrowRight size={18} className="text-black/30" />
                <span>Engineered for Focus</span>
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer with custom CTA content */}
      <Footer 
        ctaHeadline={["The space you work in", "shapes the work you produce."]} 
        ctaImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2400"
      />
    </main>
  )
}

