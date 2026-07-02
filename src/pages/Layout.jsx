import Header from '../components/Header'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import { ContentProvider } from '../context/ContentProvider'
import './Layout.css'

export default function Layout() {
  return (
    <ContentProvider>
      <Header />
      <main className="page-main">
        <PageTransition />
      </main>
      <Footer />
    </ContentProvider>
  )
}
