import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  const handleNavClick = (href) => {
    if (href.startsWith('/#')) {
      const sectionId = href.replace('/#', '')
      if (location.pathname !== '/') {
        navigate(`/#${sectionId}`)
      } else {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setMobileMenuOpen(false)
  }

  if (location.pathname.startsWith('/portal')) {
    return null
  }

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 transition-all duration-300 ${
          isScrolled ? 'shadow-md py-0' : 'shadow-sm py-1'
        }`}
      >
        <div className="max-w-7xl xl:max-w-wide mx-auto px-6 sm:px-10 lg:px-16 h-20 flex justify-between items-center">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-3.5 group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 border border-teal-200 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                health_and_safety
              </span>
            </div>
            <div>
              <span className="font-headline-sm text-xl font-bold text-slate-900 tracking-tight block">
                Dr. Sourav Soni
              </span>
              <span className="text-xs text-slate-500 font-medium block -mt-0.5">
                Senior Consultant Physician • Ashok Rajpath, Patna
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors duration-200 ${
                isActive('/')
                  ? 'text-slate-950 font-bold border-b-2 border-teal-600 pb-1'
                  : 'text-slate-600 hover:text-teal-700'
              }`}
            >
              Home
            </Link>

            <Link
              to="/expertise"
              className={`text-sm font-semibold transition-colors duration-200 ${
                isActive('/expertise')
                  ? 'text-slate-950 font-bold border-b-2 border-teal-600 pb-1'
                  : 'text-slate-600 hover:text-teal-700'
              }`}
            >
              Expertise &amp; Treatments
            </Link>

            <Link
              to="/blog"
              className={`text-sm font-semibold transition-colors duration-200 ${
                isActive('/blog')
                  ? 'text-slate-950 font-bold border-b-2 border-teal-600 pb-1'
                  : 'text-slate-600 hover:text-teal-700'
              }`}
            >
              Health Blog
            </Link>

            <button
              onClick={() => handleNavClick('/#about')}
              className="text-sm font-semibold text-slate-600 hover:text-teal-700 transition-colors duration-200"
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('/#location')}
              className="text-sm font-semibold text-slate-600 hover:text-teal-700 transition-colors duration-200 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base text-teal-600">location_on</span>
              <span>Clinic Location</span>
            </button>
          </nav>

          {/* Trailing Action */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:+919810123456"
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors border border-slate-200"
              title="Call Clinic: +91 98101 23456"
            >
              <span className="material-symbols-outlined text-base text-teal-600">call</span>
              <span>+91 98101 23456</span>
            </a>

            <Link
              to="/book"
              className="bg-slate-900 text-white font-semibold text-sm rounded-full px-6 py-2.5 hover:bg-teal-700 transition-all shadow-sm active:scale-95"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/book"
              className="bg-slate-900 text-white text-xs px-3.5 py-1.5 rounded-full font-bold"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-900 p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-slate-900/50 backdrop-blur-sm">
          <div className="fixed top-20 right-0 w-full max-w-xs h-[calc(100vh-5rem)] bg-white border-l border-slate-200 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <nav className="space-y-3">
              <Link
                to="/"
                className="block py-2.5 px-3 rounded-lg font-semibold text-sm text-slate-900 hover:bg-slate-50"
              >
                Home
              </Link>
              <Link
                to="/expertise"
                className="block py-2.5 px-3 rounded-lg font-semibold text-sm text-slate-900 hover:bg-slate-50"
              >
                Expertise &amp; Treatments
              </Link>
              <Link
                to="/blog"
                className="block py-2.5 px-3 rounded-lg font-semibold text-sm text-slate-900 hover:bg-slate-50"
              >
                Health Blog
              </Link>
              <button
                onClick={() => handleNavClick('/#about')}
                className="w-full text-left py-2.5 px-3 rounded-lg font-semibold text-sm text-slate-900 hover:bg-slate-50"
              >
                About Dr. Sourav Soni
              </button>
              <button
                onClick={() => handleNavClick('/#location')}
                className="w-full text-left py-2.5 px-3 rounded-lg font-semibold text-sm text-slate-900 hover:bg-slate-50"
              >
                Clinic Location (Ashok Rajpath)
              </button>
            </nav>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <Link
                to="/book"
                className="block w-full text-center bg-slate-900 text-white rounded-full py-3 font-semibold text-sm"
              >
                Book Appointment
              </Link>
              <a
                href="tel:+919810123456"
                className="block w-full text-center border border-teal-600 text-teal-700 rounded-full py-2.5 font-semibold text-sm"
              >
                Call Clinic: +91 98101 23456
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
