'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    projectType: '',
    spaceSize: '',
    budgetRange: '',
    timeline: '',
    message: '' 
  })
  const [submitted, setSubmitted] = useState(false)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 1200)

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }, observerOptions)

    const els = document.querySelectorAll('.slide-up, .reveal-clip-vertical, .reveal-inner')
    els.forEach(el => observer.observe(el))
    
    // We also need to observe the pricing section container if we want to trigger reveal lines
    const sectionEls = document.querySelectorAll('.animate-on-scroll')
    sectionEls.forEach(el => observer.observe(el))

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className={`bg-[#f5f2ed] min-h-screen ${animated ? 'hero-animated' : ''}`}>
      <Navbar theme="light" />

      {/* Main Form Section */}
      <section className="pt-36 pb-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">

          {/* Left Column: Form (8 cols) */}
          <div className="lg:col-span-8">
            <div className="mb-16">
              <h2 className="font-heading text-4xl md:text-5xl text-[#1a1a1a] font-medium mb-6 leading-tight max-w-2xl">
                <span className="reveal-clip block">
                  <span className="reveal-inner block line-1">Let&apos;s Build an</span>
                </span>
                <span className="reveal-clip block">
                  <span className="reveal-inner block line-2">Environment Where Your</span>
                </span>
                <span className="reveal-clip block">
                  <span className="reveal-inner block line-3">Business Performs Better</span>
                </span>
              </h2>
              <p className="text-[#1a1a1a]/60 text-base md:text-lg font-light leading-relaxed max-w-2xl slide-up">
                Contact us to discuss your project, get a consultation, and receive a detailed 
                quotation based on your space and requirements.
              </p>
            </div>

            {submitted ? (
              <div className="py-20 border-t border-black/10">
                <div className="w-16 h-px bg-black/20 mb-10" />
                <h3 className="font-heading text-4xl text-[#1a1a1a] mb-4">Thank you.</h3>
                <p className="text-[#1a1a1a]/60 text-lg font-light">We&apos;ve received your request and our team will be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                
                {/* Name */}
                <div className="border-b border-black/10 pb-4 group focus-within:border-black transition-colors duration-500">
                  <label className="block text-[10px] tracking-widest uppercase text-black/40 mb-3 group-focus-within:text-black transition-colors">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent text-[#1a1a1a] text-lg font-light outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div className="border-b border-black/10 pb-4 group focus-within:border-black transition-colors duration-500">
                  <label className="block text-[10px] tracking-widest uppercase text-black/40 mb-3 group-focus-within:text-black transition-colors">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent text-[#1a1a1a] text-lg font-light outline-none"
                    placeholder="example@domain.com"
                  />
                </div>

                {/* Phone */}
                <div className="border-b border-black/10 pb-4 group focus-within:border-black transition-colors duration-500">
                  <label className="block text-[10px] tracking-widest uppercase text-black/40 mb-3 group-focus-within:text-black transition-colors">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-transparent text-[#1a1a1a] text-lg font-light outline-none"
                    placeholder="+92 3XX XXXXXXX"
                  />
                </div>

                {/* Project Type */}
                <div className="border-b border-black/10 pb-4 group focus-within:border-black transition-colors duration-500">
                  <label className="block text-[10px] tracking-widest uppercase text-black/40 mb-3 group-focus-within:text-black transition-colors">Project Type</label>
                  <input
                    type="text"
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className="w-full bg-transparent text-[#1a1a1a] text-lg font-light outline-none"
                    placeholder="e.g. Office, Showroom, Clinic"
                  />
                </div>

                {/* Space Size */}
                <div className="border-b border-black/10 pb-4 group focus-within:border-black transition-colors duration-500">
                  <label className="block text-[10px] tracking-widest uppercase text-black/40 mb-3 group-focus-within:text-black transition-colors">Space Size</label>
                  <input
                    type="text"
                    value={form.spaceSize}
                    onChange={(e) => setForm({ ...form, spaceSize: e.target.value })}
                    className="w-full bg-transparent text-[#1a1a1a] text-lg font-light outline-none"
                    placeholder="e.g. 2500 sq ft"
                  />
                </div>

                {/* Budget Range */}
                <div className="border-b border-black/10 pb-4 group focus-within:border-black transition-colors duration-500">
                  <label className="block text-[10px] tracking-widest uppercase text-black/40 mb-3 group-focus-within:text-black transition-colors">Budget Range</label>
                  <input
                    type="text"
                    value={form.budgetRange}
                    onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
                    className="w-full bg-transparent text-[#1a1a1a] text-lg font-light outline-none"
                    placeholder="Enter your budget estimate"
                  />
                </div>

                {/* Timeline */}
                <div className="border-b border-black/10 pb-4 group focus-within:border-black transition-colors duration-500">
                  <label className="block text-[10px] tracking-widest uppercase text-black/40 mb-3 group-focus-within:text-black transition-colors">Timeline</label>
                  <input
                    type="text"
                    value={form.timeline}
                    onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    className="w-full bg-transparent text-[#1a1a1a] text-lg font-light outline-none"
                    placeholder="e.g. 3 months"
                  />
                </div>

                {/* Message */}
                <div className="md:col-span-2 border-b border-black/10 pb-4 group focus-within:border-black transition-colors duration-500">
                  <label className="block text-[10px] tracking-widest uppercase text-black/40 mb-3 group-focus-within:text-black transition-colors">Message</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent text-[#1a1a1a] text-lg font-light outline-none resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <div className="md:col-span-2 mt-8">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center border border-black text-black text-xs tracking-[0.3em] uppercase px-12 py-5 rounded-full hover:bg-black hover:text-white transition-all duration-500"
                  >
                    Request Consultation
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col pt-12 lg:pt-36">
            <div className="space-y-16">
              
              <div>
                <h4 className="text-black/30 text-[10px] tracking-[0.4em] uppercase mb-8">Direct Contact</h4>
                <div className="space-y-6">
                  <div className="flex items-start gap-5">
                    <Mail size={18} className="text-black/30 mt-1" />
                    <div>
                      <p className="text-black/40 text-[10px] tracking-widest uppercase mb-1">Email Details</p>
                      <a href="mailto:contact@interraform.com" className="text-[#1a1a1a] text-lg font-light hover:opacity-60 transition-opacity">contact@interraform.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <Phone size={18} className="text-black/30 mt-1" />
                    <div>
                      <p className="text-black/40 text-[10px] tracking-widest uppercase mb-1">Call Us</p>
                      <a href="tel:+923000000000" className="text-[#1a1a1a] text-lg font-light hover:opacity-60 transition-opacity">+92 300 0000000</a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-black/30 text-[10px] tracking-[0.4em] uppercase mb-8">Location</h4>
                <div className="flex items-start gap-5">
                  <MapPin size={18} className="text-black/30 mt-1" />
                  <div className="text-[#1a1a1a] text-lg font-light leading-relaxed">
                    Sector G-13<br />
                    Islamabad, 44000<br />
                    Pakistan
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-black/30 text-[10px] tracking-[0.4em] uppercase mb-8">Business Hours</h4>
                <div className="space-y-2 text-[#1a1a1a]/70 font-light">
                  <div className="flex justify-between w-full max-w-[200px]">
                    <span>Mon - Fri</span>
                    <span>10am - 6pm</span>
                  </div>
                  <div className="flex justify-between w-full max-w-[200px]">
                    <span>Sat</span>
                    <span>11am - 4pm</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── Pricing Section ── */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-black/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left: Heading */}
          <div className="lg:col-span-4 animate-on-scroll">
            <p className="text-black/35 text-[10px] tracking-[0.5em] uppercase mb-5 slide-up">Investment</p>
            <h2 className="text-6xl md:text-8xl text-[#1a1a1a] font-medium leading-[1.0] font-heading">
              <span className="reveal-clip block">
                <span className="font-body font-medium tracking-tight not-italic reveal-inner block line-1">Our</span>
              </span>
              <span className="reveal-clip block mt-2 pb-4">
                <span className="italic reveal-inner block line-2 pb-2">Pricing</span>
              </span>
            </h2>
          </div>

          {/* Right: Body + Buttons */}
          <div className="lg:col-span-8 flex flex-col gap-10 pt-0 lg:pt-24">
            <div className="space-y-4 max-w-2xl">
              <p className="text-black/65 text-base md:text-lg font-light leading-relaxed">
                Every project is different depending on space size, design requirements,
                materials, and scope of work.
              </p>
              <p className="text-black/50 text-base font-light leading-relaxed">
                We provide detailed quotations after consultation and site visit.
              </p>
            </div>

            {/* Three CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">

              {/* Request Quote */}
              <a
                href="mailto:contact@interraform.com?subject=Quote Request"
                className="inline-flex items-center gap-3 bg-[#1a1a1a] text-white text-[10px] tracking-[0.25em] uppercase px-8 py-4 rounded-full hover:bg-black/80 transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Request Quote
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/923000000000?text=Hi, I'd like to get a quote for my project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-black/25 text-[#1a1a1a] text-[10px] tracking-[0.25em] uppercase px-8 py-4 rounded-full hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>

              {/* Call Now */}
              <a
                href="tel:+923000000000"
                className="inline-flex items-center gap-3 border border-black/25 text-[#1a1a1a] text-[10px] tracking-[0.25em] uppercase px-8 py-4 rounded-full hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M13 9.5c0 .2-.04.39-.13.58a2.02 2.02 0 01-.36.57c-.22.24-.46.41-.74.52C11.49 11.23 11.25 11.28 11 11.28c-.36 0-.75-.08-1.16-.25-.41-.17-.82-.4-1.23-.69-.41-.3-.81-.62-1.19-1-.38-.38-.7-.78-1-1.19-.29-.41-.52-.82-.68-1.23C5.57 4.51 5.5 4.12 5.5 3.74c0-.24.04-.47.13-.69.09-.22.23-.42.44-.6.25-.21.52-.31.81-.31.11 0 .22.02.32.07.1.05.2.12.28.23L8.5 4.26c.08.11.14.21.18.3.04.09.06.18.06.26 0 .1-.03.2-.09.3-.06.1-.14.2-.24.3l-.33.34a.23.23 0 00-.07.17c0 .03 0 .06.02.1.04.1.13.24.27.42.14.18.3.37.47.55.18.18.36.34.55.48.18.14.32.22.42.26.03.01.06.02.1.02a.24.24 0 00.17-.07l.33-.34c.11-.11.21-.19.31-.24.1-.05.2-.08.31-.08.08 0 .17.02.26.06.09.04.19.1.3.19l1.63 1.04c.11.08.18.17.23.27.04.1.07.2.07.32z" stroke="currentColor" strokeWidth="1.1" strokeMiterlimit="10"/>
                </svg>
                Call Now
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer 
        ctaHeadline={["We don't just design interiors,", "we design environments"]} 
        ctaImage="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2400"
      />
    </main>
  )
}
