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
          isScrolled ? 'shadow-md py-0' : 'shadow-sm py-0.5'
        }`}
      >
        <div className="max-w-7xl xl:max-w-wide mx-auto px-4 sm:px-8 lg:px-16 h-16 sm:h-20 flex justify-between items-center">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3.5 group focus:outline-none"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 border border-teal-200/80 group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-xl sm:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                health_and_safety
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-base sm:text-xl font-bold text-slate-900 tracking-tight block">
                  Dr. Sourav Soni
                </span>
                <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <span className="text-[11px] sm:text-xs text-slate-500 font-medium block -mt-0.5 sm:-mt-0.5">
                Senior Consultant Physician • Patna
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

          {/* Trailing Action - Desktop */}
          <div className="hidden sm:flex items-center gap-3">
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

          {/* Mobile Fast Action Buttons */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="tel:+919810123456"
              className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 active:scale-90 transition-transform"
              aria-label="Call Doctor"
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center border border-slate-200 focus:outline-none active:scale-90 transition-transform"
              aria-label="Toggle navigation menu"
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
        <div className="fixed inset-0 z-40 md:hidden bg-slate-950/60 backdrop-blur-sm transition-opacity">
          <div className="fixed top-16 right-0 w-full max-w-xs h-[calc(100vh-4rem)] bg-white border-l border-slate-200 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              {/* Doctor Mini Card */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                <img
                  src="/images/dr-sourav-soni-hero.jpg"
                  alt="Dr. Sourav Soni"
                  className="w-12 h-12 rounded-xl object-cover object-top border border-slate-200 shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Dr. Sourav Soni, MD</h4>
                  <p className="text-[11px] text-teal-700 font-medium">Ex-AIIMS Patna • Physician</p>
                  <p className="text-[10px] text-slate-500">Ashok Rajpath, Patna</p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1.5 pt-2">
                <Link
                  to="/"
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-teal-600 text-lg">home</span>
                  <span>Home</span>
                </Link>
                <Link
                  to="/expertise"
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-teal-600 text-lg">medical_services</span>
                  <span>Expertise &amp; Treatments</span>
                </Link>
                <Link
                  to="/blog"
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-teal-600 text-lg">article</span>
                  <span>Health Blog &amp; Guides</span>
                </Link>
                <button
                  onClick={() => handleNavClick('/#about')}
                  className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-slate-100 transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-teal-600 text-lg">person</span>
                  <span>About Dr. Sourav Soni</span>
                </button>
                <button
                  onClick={() => handleNavClick('/#location')}
                  className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-slate-100 transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-teal-600 text-lg">location_on</span>
                  <span>Clinic Directions (Patna)</span>
                </button>
              </nav>
            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="pt-4 border-t border-slate-200 space-y-2.5">
              <Link
                to="/book"
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white rounded-xl py-3 font-bold text-sm shadow-md active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-lg">calendar_month</span>
                <span>Book Appointment</span>
              </Link>
              <a
                href="tel:+919810123456"
                className="w-full flex items-center justify-center gap-2 border border-teal-600 text-teal-800 bg-teal-50/50 rounded-xl py-2.5 font-bold text-xs active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-base">call</span>
                <span>Call Clinic: +91 98101 23456</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
