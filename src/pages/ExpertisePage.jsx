import React from 'react'
import { Link } from 'react-router-dom'

export default function ExpertisePage() {
  return (
    <div className="antialiased min-h-screen flex flex-col pt-16 sm:pt-20 bg-slate-50/50 text-slate-900 pb-24 md:pb-0">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="w-full bg-white py-12 sm:py-20 lg:py-24 border-b border-slate-200/80">
          <div className="max-w-7xl xl:max-w-wide mx-auto px-4 sm:px-8 lg:px-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-teal-200">
                <span className="material-symbols-outlined text-teal-600 text-base">medical_services</span>
                <span>Specialized Medical Practice</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight">
                Expertise &amp; Clinical Treatments
              </h1>
              <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
                Comprehensive internal medicine tailored to your unique health profile by <strong>Dr. Sourav Soni</strong>. Combining advanced diagnostic tools with personalized, evidence-backed therapies in Ashok Rajpath, Patna.
              </p>
            </div>
          </div>
        </section>

        {/* Areas of Expertise Grid */}
        <section className="w-full bg-slate-50 py-12 sm:py-20 lg:py-28 border-b border-slate-200/80">
          <div className="max-w-7xl xl:max-w-wide mx-auto px-4 sm:px-8 lg:px-16">
            <div className="flex flex-col items-start mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mb-1 sm:mb-2">
                Clinical Focus Areas
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Select a specialty below to learn more or directly schedule a consultation in Patna.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Expertise Card 1 */}
              <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover-card transition-all duration-300 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-4 sm:mb-6 text-teal-700">
                    <span className="material-symbols-outlined text-2xl sm:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      favorite
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                    Cardiovascular Health
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6">
                    Advanced screening and management of heart conditions, hypertension, lipid profiles, and cardiovascular risk factor modification.
                  </p>
                </div>
                <Link
                  className="inline-flex items-center text-teal-700 font-bold text-xs sm:text-sm hover:underline"
                  to="/book?type=in-person&concern=Cardiovascular%20Health"
                >
                  <span>Book Consultation</span>
                  <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Expertise Card 2 */}
              <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover-card transition-all duration-300 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-4 sm:mb-6 text-blue-700">
                    <span className="material-symbols-outlined text-2xl sm:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      psychology
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                    Neurological Evaluations
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6">
                    Comprehensive evaluation and treatment of neurological disorders, chronic headaches, neuropathy, and secondary vascular evaluations.
                  </p>
                </div>
                <Link
                  className="inline-flex items-center text-teal-700 font-bold text-xs sm:text-sm hover:underline"
                  to="/book?type=in-person&concern=Neurological%20Care"
                >
                  <span>Book Consultation</span>
                  <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Expertise Card 3 */}
              <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover-card transition-all duration-300 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4 sm:mb-6 text-emerald-700">
                    <span className="material-symbols-outlined text-2xl sm:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      monitor_weight
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                    Diabetes &amp; Metabolic Care
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6">
                    Holistic management of metabolic conditions including Type 1 and Type 2 Diabetes, thyroid disorders, and lifestyle integration.
                  </p>
                </div>
                <Link
                  className="inline-flex items-center text-teal-700 font-bold text-xs sm:text-sm hover:underline"
                  to="/book?type=in-person&concern=Metabolic%20Disorders"
                >
                  <span>Book Consultation</span>
                  <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Expertise Card 4 */}
              <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover-card transition-all duration-300 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-4 sm:mb-6 text-teal-700">
                    <span className="material-symbols-outlined text-2xl sm:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      monitor_heart
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                    Internal Medicine &amp; Fevers
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6">
                    Expert diagnosis and treatment of complex, multi-system diseases in adults, seasonal fevers (dengue, typhoid), and chronic illnesses.
                  </p>
                </div>
                <Link
                  className="inline-flex items-center text-teal-700 font-bold text-xs sm:text-sm hover:underline"
                  to="/book?type=in-person&concern=Internal%20Medicine"
                >
                  <span>Book Consultation</span>
                  <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Expertise Card 5 */}
              <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover-card transition-all duration-300 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-4 sm:mb-6 text-amber-700">
                    <span className="material-symbols-outlined text-2xl sm:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      health_and_safety
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                    Preventive Health Screening
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6">
                    Proactive annual executive health checkups, adult vaccinations, hepatic screening, and personalized longevity plans.
                  </p>
                </div>
                <Link
                  className="inline-flex items-center text-teal-700 font-bold text-xs sm:text-sm hover:underline"
                  to="/book?type=in-person&concern=Preventive%20Health"
                >
                  <span>Book Consultation</span>
                  <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Expertise Card 6 */}
              <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover-card transition-all duration-300 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 sm:mb-6 text-slate-800">
                    <span className="material-symbols-outlined text-2xl sm:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      clinical_notes
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                    Clinical Diagnostics &amp; ECG
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6">
                    In-clinic 12-lead ECG, digital blood pressure tracking, comprehensive lab biochemistry, and post-discharge recovery review in Patna.
                  </p>
                </div>
                <Link
                  className="inline-flex items-center text-teal-700 font-bold text-xs sm:text-sm hover:underline"
                  to="/book?type=in-person&concern=Diagnostic%20Workup"
                >
                  <span>Book Consultation</span>
                  <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Bottom Action Bar on Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_25px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2.5 max-w-md mx-auto">
          <a
            href="tel:+919810123456"
            className="h-12 w-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center flex-shrink-0 shadow-sm active:scale-90 transition-transform"
            aria-label="Call Doctor"
          >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
          </a>
          <Link
            to="/book"
            className="flex-1 h-12 bg-slate-900 active:bg-teal-700 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">calendar_month</span>
            <span>Book Consultation</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
