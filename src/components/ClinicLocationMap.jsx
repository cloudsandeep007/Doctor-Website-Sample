import React from 'react'
import { Link } from 'react-router-dom'

export default function ClinicLocationMap() {
  const googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=Ashok+Rajpath+Patna+Bihar+800004"
  const mapEmbedSrc = "https://maps.google.com/maps?q=Ashok+Rajpath,+Patna,+Bihar,+India&t=&z=15&ie=UTF8&iwloc=&output=embed"

  return (
    <section id="location" className="w-full bg-slate-50 py-16 sm:py-20 lg:py-28 border-b border-slate-200/80 scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl xl:max-w-wide mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-teal-200">
            <span className="material-symbols-outlined text-teal-600 text-base">location_on</span>
            <span>Practice Location &amp; Directions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-2 sm:mb-3 tracking-tight">
            Visit Dr. Sourav Soni's Clinic in Patna
          </h2>
          <p className="text-xs sm:text-lg text-slate-600 max-w-2xl">
            Centrally situated on Ashok Rajpath in Patna, Bihar, with modern in-house diagnostic facilities, easy road connectivity, and prompt clinical attention.
          </p>
        </div>

        {/* Map & Info Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Interactive Google Map */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-md flex flex-col min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] relative">
            {/* Map Header Bar */}
            <div className="bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  Ashok Rajpath, Patna, Bihar
                </span>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:underline flex-shrink-0 ml-2"
              >
                <span>Maps App</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>

            {/* Embedded Google Map Iframe */}
            <div className="relative flex-1 w-full h-full min-h-[260px] sm:min-h-[320px]">
              <iframe
                title="Dr. Sourav Soni Clinic Location Map - Ashok Rajpath, Patna"
                src={mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full absolute inset-0"
              ></iframe>
            </div>

            {/* Quick Map Action Footer */}
            <div className="bg-white p-3.5 sm:p-5 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <span className="material-symbols-outlined text-teal-600 text-base">directions_bus</span>
                <span className="truncate">Ashok Rajpath Main Road Corridor</span>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 hover:bg-teal-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl sm:rounded-full inline-flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all text-center"
              >
                <span className="material-symbols-outlined text-sm">navigation</span>
                <span>Get Turn-by-Turn GPS Directions</span>
              </a>
            </div>
          </div>

          {/* Right Column: Detailed Location & Appointment Access Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-5 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-teal-600 text-xl sm:text-2xl">apartment</span>
                  <span>Clinic Address &amp; Access</span>
                </h3>

                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-teal-600 text-lg sm:text-xl mt-0.5">pin_drop</span>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">Dr. Sourav Soni Medical Clinic</p>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-0.5">
                        Ashok Rajpath, Patna, Bihar – 800004
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3.5 sm:pt-4 border-t border-slate-100">
                    <span className="material-symbols-outlined text-teal-600 text-lg sm:text-xl mt-0.5">schedule</span>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">Consultation Timings</p>
                      <div className="text-xs sm:text-sm text-slate-600 space-y-1 mt-1">
                        <p><strong>Monday – Saturday:</strong></p>
                        <p>• Morning Session: 09:00 AM – 01:00 PM</p>
                        <p>• Evening Session: 04:00 PM – 08:00 PM</p>
                        <p className="text-[11px] sm:text-xs text-amber-700 font-semibold mt-1">Sunday: Prior Appointment / Urgent Care</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3.5 sm:pt-4 border-t border-slate-100">
                    <span className="material-symbols-outlined text-teal-600 text-lg sm:text-xl mt-0.5">local_hospital</span>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">Facilities Available</p>
                      <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                        Comprehensive clinical consultation, 12-Lead ECG, Blood Sugar profiling, Blood Pressure monitoring, and digital prescriptions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call & Direct Booking Actions */}
              <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link
                  to="/book?type=in-person"
                  className="flex-1 bg-teal-700 hover:bg-teal-800 text-white text-center py-3.5 px-4 rounded-xl sm:rounded-full text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-2 active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">calendar_month</span>
                  <span>Book Patna Visit</span>
                </Link>

                <a
                  href="tel:+919810123456"
                  className="flex-1 border border-slate-300 hover:bg-slate-50 text-slate-800 text-center py-3.5 px-4 rounded-xl sm:rounded-full text-xs font-bold transition-colors flex items-center justify-center gap-2 active:scale-95"
                >
                  <span className="material-symbols-outlined text-base text-teal-600">call</span>
                  <span>+91 98101 23456</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
