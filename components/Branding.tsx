'use client'
import { useEffect, useState, useRef } from 'react'

export default function QuoteSection() {
  const [animated, setAnimated] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let currentOffset = 0;
    let targetOffset = 0;
    let ticking = false;
    let reqId: number;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateParallax = () => {
      // 0.04 creates an ultra-smooth 'liquid' easing effect
      currentOffset = lerp(currentOffset, targetOffset, 0.04); 

      if (bgRef.current) {
        // 0.08 multiplier makes the parallax very slow and subtle
        bgRef.current.style.transform = `translate3d(0, ${currentOffset}px, 0)`;
      }

      if (Math.abs(targetOffset - currentOffset) > 0.5) {
        reqId = window.requestAnimationFrame(updateParallax);
      } else {
        ticking = false;
      }
    };

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        targetOffset = (rect.top - window.innerHeight / 2) * 0.08;
      }
      if (!ticking) {
        ticking = true;
        reqId = window.requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <section className={`relative min-h-[100vh] flex items-center justify-center overflow-hidden py-32 ${animated ? 'hero-animated' : ''}`}>
      {/* Background image taller than container, positioned to allow up/down translation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          ref={bgRef}
          className="absolute inset-x-0 bg-cover bg-center bg-no-repeat"
          style={{
            top: '-25%',
            bottom: '-25%', // 150% height
            backgroundImage: "url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=2400')",
            willChange: 'transform',
          }}
        />
      </div>
      <div className="absolute inset-0 bg-black/75 z-0" />

      <div ref={sectionRef} className="relative z-10 max-w-4xl mx-auto px-8 md:px-12 text-center flex flex-col items-center pt-8">
        <h2 className="text-3xl md:text-5xl text-white leading-[1.3] mb-12 font-heading max-w-3xl">
          <span className="reveal-clip block">
            <span className="reveal-inner w-full block line-1">
              <span className="font-body font-medium tracking-tight not-italic">The Space You Work In</span>
            </span>
          </span>
          <span className="reveal-clip block">
            <span className="reveal-inner w-full block line-2 italic">
              Shapes The Work You Produce
            </span>
          </span>
        </h2>

        <div className="reveal-clip max-w-2xl">
          <p className="reveal-inner text-white/80 text-sm md:text-lg leading-relaxed font-light line-3">
            Most offices and commercial spaces are built without understanding how 
            environment affects productivity, workflow, movement, and focus.
            <br className="mb-4" />
            At Interraform, we design and build environments that are not only modern and 
            visually impressive, but also functional, efficient, and built around how people 
            actually work.
          </p>
        </div>
      </div>
    </section>
  )
}
