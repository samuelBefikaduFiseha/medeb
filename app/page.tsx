import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import FeatureGrid from '@/components/landing/FeatureGrid'
import WorkflowSection from '@/components/landing/WorkflowSection'
import RolesSection from '@/components/landing/RolesSection'
import BenefitsSection from '@/components/landing/BenefitsSection'
import ContactSection from '@/components/landing/ContactSection'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureGrid />
        <WorkflowSection />
        <RolesSection />
        <BenefitsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
