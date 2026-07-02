import Header from '../components/Header'
import Hero from '../components/Hero'
import Trust from '../components/Trust'
import Services from '../components/Services'
import Pricing from '../components/Pricing'
import Projects from '../components/Projects'
import BeforeAfter from '../components/BeforeAfter'
import Process from '../components/Process'
import Materials from '../components/Materials'
import Reviews from '../components/Reviews'
import FAQ from '../components/FAQ'
import LeadForm from '../components/LeadForm'
import ContactsInfo from '../components/ContactsInfo'
import Footer from '../components/Footer'
import { ContentProvider } from '../context/ContentProvider'

export default function ClientPage() {
  return (
    <ContentProvider>
      <Header />
      <main>
        <Hero />
        <Trust />
        <Services />
        <Pricing />
        <Projects />
        <BeforeAfter />
        <Process />
        <Materials />
        <Reviews />
        <FAQ />
        <LeadForm />
        <ContactsInfo />
      </main>
      <Footer />
    </ContentProvider>
  )
}
