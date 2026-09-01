import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl xl:max-w-wide mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Practice Info */}
          <div className="md:col-span-1 flex flex-col gap-3">
            <Link to="/" className="text-xl font-bold text-white flex items-center gap-2.5">
              <span className="material-symbols-outlined text-teal-400 text-2xl">health_and_safety</span>
              <span>Dr. Sourav Soni</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Senior Consultant Physician<br />
              MBBS, MD (Medicine), Ex-AIIMS Patna<br />
              Ashok Rajpath, Patna, Bihar – 800004
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-wrap justify-start md:justify-end gap-x-8 md:gap-x-12 gap-y-4 items-center">
            <Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/expertise" className="text-sm text-slate-400 hover:text-white transition-colors">
              Expertise &amp; Treatments
            </Link>
            <Link to="/blog" className="text-sm text-slate-400 hover:text-white transition-colors">
              Health Blog
            </Link>
            <Link to="/#location" className="text-sm text-slate-400 hover:text-white transition-colors">
              Clinic Location
            </Link>
            <Link to="/book" className="text-sm text-teal-400 font-bold hover:underline transition-all">
              Book Appointment
            </Link>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 leading-relaxed">
          <p className="max-w-4xl mx-auto">
            © {new Date().getFullYear()} Dr. Sourav Soni Medical Practice. All rights reserved. Medical Disclaimer: The information provided on this website is for educational and consultation scheduling purposes only and does not substitute professional in-person medical diagnosis.
          </p>
        </div>
      </div>
    </footer>
  )
}
