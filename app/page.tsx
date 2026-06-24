import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import Branding from '@/components/Branding'
import DesignSection from '@/components/DesignSection'
import ManufacturingSection from '@/components/ManufacturingSection'
import ProcessSection from '@/components/ProcessSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] relative">
      <Navbar />
      <HeroSection />

      {/* Give sections below hero a higher z-index so they slide over the sticky hero */}
      <div className="relative z-10 bg-[#0a0a0a]">
        <Branding />
        <DesignSection />
        <ManufacturingSection />
        <ProcessSection />
        <Footer />
      </div>
    </main>
  )
}
