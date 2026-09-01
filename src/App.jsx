import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'

// Pages
import HomePage from './pages/HomePage'
import ExpertisePage from './pages/ExpertisePage'
import BookAppointmentPage from './pages/BookAppointmentPage'
import PatientPortalPage from './pages/PatientPortalPage'
import HealthBlogPage from './pages/HealthBlogPage'

// Automatically scroll to top on route navigation
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function MainLayout() {
  const location = useLocation()
  const isPortal = location.pathname.startsWith('/portal')

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/expertise" element={<ExpertisePage />} />
          <Route path="/book" element={<BookAppointmentPage />} />
          <Route path="/portal" element={<PatientPortalPage />} />
          <Route path="/blog" element={<HealthBlogPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {!isPortal && <Footer />}
      <Toast />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <MainLayout />
      </BrowserRouter>
    </AppProvider>
  )
}
