'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function CTASection() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let currentY = 0;
    let targetY = 0;
    let ticking = false;
    let reqId: number;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateParallax = () => {
      currentY = lerp(currentY, targetY, 0.05); 
      
      if (bgRef.current) {
        // The background translates subtly upwards as we scroll down to simulate depth
        bgRef.current.style.transform = `translate3d(0, ${currentY * 0.1}px, 0)`;
      }

      reqId = window.requestAnimationFrame(updateParallax);
    };

    const handleScroll = () => {
      targetY = window.scrollY;
      if (!ticking) {
        ticking = true;
        reqId = window.requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(reqId);
    };
  }, [])

  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden z-10">
      
      {/* Background Image Layer */}
      <div
        ref={bgRef}
        className="absolute inset-x-0 bg-cover bg-center bg-no-repeat"
        style={{
          top: '-20%',
          height: '140%', 
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2400')",
          willChange: 'transform',
        }}
      />
      
      {/* Dark Overlay for text legibility */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-12 max-w-4xl">
        <h2 className="font-heading text-4xl md:text-6xl text-white font-medium leading-tight mb-10">
          If Your Environment Doesn’t Support Productivity, <span className="italic text-white/80">It Needs To Be Redesigned.</span>
        </h2>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center border border-white/70 rounded-full text-white text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-white hover:text-black transition-all duration-300"
        >
          Book Free Consultation
        </Link>
      </div>
    </section>
  )
}
