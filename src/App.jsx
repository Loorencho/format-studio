import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import PricingPage from './pages/PricingPage'
import CasesPage from './pages/CasesPage'
import ProcessPage from './pages/ProcessPage'
import ReviewsPage from './pages/ReviewsPage'
import FAQPage from './pages/FAQPage'
import ContactsPage from './pages/ContactsPage'
import AdminPage from './pages/AdminPage'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/o-nas" element={<AboutPage />} />
          <Route path="/uslugi" element={<ServicesPage />} />
          <Route path="/ceny" element={<PricingPage />} />
          <Route path="/keisy" element={<CasesPage />} />
          <Route path="/etapy" element={<ProcessPage />} />
          <Route path="/otzyvy" element={<ReviewsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/kontakty" element={<ContactsPage />} />
        </Route>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}
