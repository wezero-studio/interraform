'use client'
import Link from 'next/link'
import { Facebook, Instagram } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface FooterProps {
  ctaHeadline?: string[]
  ctaImage?: string
}

const defaultHeadline = [
  'If Your Environment Doesn’t',
  'Support Productivity,',
  'It Needs To Be Redesigned.'
]

const defaultImage = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2400'

export default function Footer({ ctaHeadline = defaultHeadline, ctaImage = defaultImage }: FooterProps) {
  const bgRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [textAnimated, setTextAnimated] = useState(false)

  useEffect(() => {
    let currentY = 0;
    let targetY = 0;
    let reqId: number;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const updateParallax = () => {
      currentY = lerp(currentY, targetY, 0.05); 
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${currentY}px, 0)`;
      }
      reqId = window.requestAnimationFrame(updateParallax);
    };

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        targetY = rect.top * 0.15; 
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    reqId = window.requestAnimationFrame(updateParallax);

    const textObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTextAnimated(true)
        textObserver.disconnect()
      }
    }, { threshold: 0.3 })

    if (textRef.current) textObserver.observe(textRef.current)

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(reqId);
      textObserver.disconnect();
    };
  }, [])

  return (
    <>
      <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden z-10 w-full border-t border-white/20 mt-16 pb-24">
        <div
          ref={bgRef}
          className="absolute inset-x-0 bg-cover bg-center bg-no-repeat"
          style={{
            top: '-20%',
            height: '140%', 
            backgroundImage: `url('${ctaImage}')`,
            willChange: 'transform'
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Content Container */}
        <div 
          ref={textRef} 
          className={`relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-12 w-full max-w-4xl ${textAnimated ? 'hero-animated' : ''}`}
        >
          <h2 className="font-heading text-4xl md:text-6xl text-white font-medium leading-[1.2] mb-10 overflow-hidden w-full text-center">
            {ctaHeadline.map((line, idx) => (
              <span key={idx} className="reveal-clip block w-full text-center">
                <span
                  className={`reveal-inner block w-full text-center line-${idx + 1} ${
                    idx === ctaHeadline.length - 1
                      ? 'italic text-white/80'
                      : 'font-body font-medium tracking-tight not-italic'
                  }`}
                >
                  {line}
                </span>
              </span>
            ))}
          </h2>

          <div className="reveal-clip mt-4">
            <Link
              href="/contact"
              className="reveal-inner line-4 inline-flex items-center justify-center gap-3 border border-white/70 rounded-full text-white text-[10px] tracking-[0.2em] uppercase px-10 py-5 hover:bg-white hover:text-black transition-all duration-300"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-[#0a0a0a] text-white pt-24 pb-8 px-6 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-24">
          
          {/* Column 1: Statement & Socials */}
          <div className="flex flex-col">
            <h3 className="text-2xl md:text-3xl font-light mb-10 tracking-tight">Designs that elevate<br/>your workspace</h3>
            <div className="flex flex-col gap-3 w-fit">
              <a href="#" className="flex items-center justify-between gap-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors px-5 py-2.5 rounded-full text-sm">
                <span>Facebook</span>
                <Facebook size={16} />
              </a>
              <a href="#" className="flex items-center justify-between gap-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors px-5 py-2.5 rounded-full text-sm">
                <span>Instagram</span>
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Hours */}
          <div className="flex flex-col">
            <h4 className="text-white/90 text-lg mb-6">Opening hours</h4>
            <div className="flex gap-4 text-white/60 mb-2 font-light">
              <span className="w-16">Mon-Fri</span>
              <span>10:00 - 18:00</span>
            </div>
            <div className="flex gap-4 text-white/60 mb-8 font-light">
              <span className="w-16">Sa</span>
              <span>11:00 - 16:00</span>
            </div>
          </div>

          {/* Column 3: Large Navigation Links */}
          <div className="flex flex-col gap-2">
            {[
              { label: 'Home', href: '/' },
              { label: 'About us', href: '/about' },
              { label: 'Service', href: '/services' },
              { label: 'Projects', href: '/projects' },
              { label: 'Contact us', href: '/contact' }
            ].map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="font-light text-4xl md:text-5xl tracking-tight hover:text-white/50 transition-colors w-fit pb-2 leading-tight"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 4: Contact Info */}
          <div className="flex flex-col lg:pl-12">
            <h4 className="text-white/90 text-lg mb-6">Contact us</h4>
            <div className="text-white/60 font-light flex flex-col gap-1 mb-8">
              <span>Sector G-13</span>
              <span>Islamabad</span>
              <span>Pakistan</span>
            </div>
            <div className="text-white/60 font-light flex flex-col gap-1">
              <a href="tel:+923000000000" className="hover:text-white transition-colors">+92 300 0000000</a>
              <a href="mailto:contact@interraform.com" className="hover:text-white transition-colors">contact@interraform.com</a>
            </div>
          </div>

        </div>

        {/* Bottom Small Links */}
        <div className="max-w-[1400px] mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider text-white/40">
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy / Legal Infos</a>
            <span>© {new Date().getFullYear()} Interraform</span>
          </div>
          <div>
            Website by <span className="text-white/80">INTERRAFORM</span>
          </div>
        </div>
      </footer>
    </>
  )
}

