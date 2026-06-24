'use client'

import { motion } from 'framer-motion'
import { ArrowDownLeft } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { projects } from '@/lib/projects'

type Project = (typeof projects)[number]

export default function ProjectDetail({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <main className="bg-[#f5f2ed] min-h-screen relative overflow-x-hidden">
      <Navbar theme="light" />

      <div className="flex flex-col lg:flex-row pt-32 px-6 lg:px-12 pb-24 gap-12 lg:gap-20 max-w-[2000px] mx-auto">

        {/* Left Side: Image container */}
        <div className="w-full lg:w-[48%] h-[70vh] lg:h-[88vh] relative overflow-hidden">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full cursor-crosshair"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Before Image (base) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.imageBefore}
              alt={`${project.name} before`}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* After Image — fades out on hover */}
            <motion.div
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="border border-white/70 bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/80 font-medium">
                  {isHovered ? 'Before' : 'Hover for before'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side: Text & Details */}
        <div className="w-full lg:w-[52%] flex flex-col justify-center lg:pr-12">

          <div className="reveal-clip mb-8 overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl font-heading text-[#1a1a1a] font-medium leading-[1.1] uppercase"
            >
              {project.name}
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-16">
            <motion.p
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-black/50 text-base md:text-lg leading-relaxed max-w-lg font-light"
            >
              {project.description}
            </motion.p>
          </div>

          <div className="w-full h-px bg-black/10 mb-12" />

          <div className="grid grid-cols-2 gap-y-12 gap-x-8 mb-24 max-w-lg">
            <DetailItem delay={0.6}  title="Category"        value={project.category} />
            <DetailItem delay={0.65} title="Area Size"       value={project.areaSize} />
            <DetailItem delay={0.7}  title="Completion Time" value={project.completionTime} />
            <DetailItem delay={0.75} title="Scope of Work"   value={project.scopeOfWork} />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link href="/projects" className="group flex items-center gap-4 w-fit">
              <ArrowDownLeft
                size={32}
                strokeWidth={1}
                className="group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-500 text-[#1a1a1a]"
              />
              <span className="text-3xl md:text-5xl font-heading text-[#1a1a1a] tracking-tight group-hover:opacity-70 transition-opacity">
                BACK
              </span>
            </Link>
          </motion.div>
        </div>

      </div>

      <Footer
        ctaImage="https://images.unsplash.com/photo-1497215175997-c81b9ecf80bb?auto=format&fit=crop&q=80&w=2400"
        ctaHeadline={['Environment influences focus,', 'movement, collaboration,', 'and productivity.']}
      />
    </main>
  )
}

function DetailItem({ title, value, delay }: { title: string; value: string; delay: number }) {
  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <motion.p
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className="text-[9px] tracking-[0.3em] text-black/40 uppercase"
      >
        {title}
      </motion.p>
      <motion.p
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-[13px] tracking-wide text-black/80 font-light"
      >
        {value}
      </motion.p>
    </div>
  )
}
