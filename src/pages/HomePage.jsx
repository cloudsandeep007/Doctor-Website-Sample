import React from 'react'
import { Link } from 'react-router-dom'
import ClinicLocationMap from '../components/ClinicLocationMap'

export default function HomePage() {
  const heroImage = "/images/dr-sourav-soni-hero.jpg"
  const aboutImage = "/images/dr-sourav-soni-about.jpg"
  const consultImage = "/images/dr-sourav-soni-consultation.jpg"

  return (
    <div className="bg-slate-50/50 text-slate-900 font-body-md text-body-md antialiased overflow-x-hidden">
      <main>
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-white via-slate-50 to-slate-100/60 pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-slate-200/80">
          <div className="max-w-7xl xl:max-w-wide mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Hero Text */}
              <div className="lg:col-span-6 flex flex-col gap-6 z-10">
                <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200/80 px-4 py-2 rounded-full w-fit shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse"></span>
                  <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                    Senior Consultant Physician
                  </span>
                </div>
                <h1 className="font-headline-md sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                  Trusted Medical Care, Backed by Experience.
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  Led by <strong>Dr. Sourav Soni</strong>, providing comprehensive, evidence-based internal medicine with a focus on preventive care, diabetes management, and complex adult illnesses at Ashok Rajpath, Patna.
                </p>

                {/* Stats / Quick Info */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                  <div className="flex flex-col">
                    <span className="text-3xl font-extrabold text-slate-900">15+</span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Years Exp.</span>
                  </div>
                  <div className="flex flex-col border-x border-slate-200 px-4">
                    <span className="text-3xl font-extrabold text-teal-700">AIIMS</span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Patna Alumni</span>
                  </div>
                  <div className="flex flex-col pl-2">
                    <span className="text-3xl font-extrabold text-slate-900">MD</span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Internal Med.</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <Link
                    to="/book"
                    className="bg-slate-900 hover:bg-teal-700 text-white rounded-full px-8 py-4 font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 inline-block text-center"
                  >
                    Book Consultation
                  </Link>
                  <Link
                    to="/expertise"
                    className="border-2 border-teal-700 text-teal-800 hover:bg-teal-50 rounded-full px-8 py-4 font-bold text-sm transition-all inline-block text-center"
                  >
                    View Specialties
                  </Link>
                </div>
              </div>

              {/* Hero Image */}
              <div className="lg:col-span-6 relative mt-4 lg:mt-0 flex justify-center">
                <div className="relative w-full max-w-lg lg:max-w-none aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[28px] overflow-hidden bg-slate-100 shadow-xl border border-slate-200">
                  <img
                    className="w-full h-full object-cover object-top"
                    src={heroImage}
                    alt="Dr. Sourav Soni - Senior Consultant Physician, Ashok Rajpath, Patna"
                  />
                  {/* Floating Badge */}
                  <div className="absolute bottom-6 left-6 right-6 sm:right-auto glass-panel bg-white/95 p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified_user
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Board Certified Specialist</p>
                      <p className="text-base font-bold text-slate-900">Dr. Sourav Soni, MD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="w-full bg-white border-b border-slate-200/80 py-10 shadow-sm">
          <div className="max-w-7xl xl:max-w-wide mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
              <div className="flex items-center gap-4 justify-start md:justify-center">
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0">
                  <span className="material-symbols-outlined text-2xl">school</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">MBBS, MD (Medicine)</h4>
                  <p className="text-xs text-slate-500">Top-tier Clinical Qualification</p>
                </div>
              </div>
              <div className="flex items-center gap-4 justify-start md:justify-center md:border-x border-slate-200 md:px-6">
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0">
                  <span className="material-symbols-outlined text-2xl">local_hospital</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Ex-AIIMS Patna</h4>
                  <p className="text-xs text-slate-500">Premier Tertiary Care Exp.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 justify-start md:justify-center">
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0">
                  <span className="material-symbols-outlined text-2xl">pin_drop</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Ashok Rajpath, Patna</h4>
                  <p className="text-xs text-slate-500">Central Clinic in Bihar</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="w-full bg-slate-50 py-20 lg:py-28 border-b border-slate-200/80" id="about">
          <div className="max-w-7xl xl:max-w-wide mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Photo Collage */}
              <div className="lg:col-span-5 relative flex flex-col gap-5">
                <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md">
                  <img
                    className="w-full h-full object-cover object-top"
                    src={aboutImage}
                    alt="Dr. Sourav Soni reviewing diagnostic reports"
                  />
                </div>
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-md">
                  <img
                    className="w-full h-full object-cover object-top"
                    src={consultImage}
                    alt="Dr. Sourav Soni conducting patient examination"
                  />
                </div>
              </div>

              {/* Bio & Career Timeline */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-teal-200">
                    Clinical Background
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    About Dr. Sourav Soni
                  </h2>
                  <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                    Dr. Sourav Soni is a Senior Consultant Physician practicing at Ashok Rajpath, Patna, Bihar. With extensive clinical training from AIIMS Patna, he is committed to providing meticulous, evidence-backed medical evaluations and compassionate healing for patients across Bihar.
                  </p>
                  <p className="text-base text-slate-600 leading-relaxed">
                    His clinical practice integrates state-of-the-art diagnostic protocols with proactive lifestyle interventions to help manage chronic diseases effectively.
                  </p>
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-6 relative pl-6 border-l-2 border-teal-500/30 ml-2">
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-4 border-teal-600"></span>
                    <h3 className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">Present</h3>
                    <h4 className="text-lg font-bold text-slate-900">Senior Consultant Physician</h4>
                    <p className="text-sm text-slate-600 mt-1">Medical Practice &amp; Consultation, Ashok Rajpath, Patna, Bihar</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-4 border-teal-400"></span>
                    <h3 className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">Clinical Career</h3>
                    <h4 className="text-lg font-bold text-slate-900">Consultant, Internal Medicine</h4>
                    <p className="text-sm text-slate-600 mt-1">AIIMS Patna – Handled complex diagnostic cases, acute fevers, and ICU patient care.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-4 border-slate-300"></span>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Education</h3>
                    <h4 className="text-lg font-bold text-slate-900">MD (Medicine) &amp; MBBS</h4>
                    <p className="text-sm text-slate-600 mt-1">Distinguished medical graduate with specialized research in adult internal medicine.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="w-full bg-white py-20 lg:py-28 border-b border-slate-200/80" id="expertise">
          <div className="max-w-7xl xl:max-w-wide mx-auto px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col items-center text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-teal-200">
                Core Specialties
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Areas of Medical Expertise
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl">
                Comprehensive management of adult health conditions in Patna, focusing on accurate diagnosis and sustainable treatment plans.
              </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1 */}
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 card-hover flex flex-col h-full shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-6 text-teal-700">
                  <span className="material-symbols-outlined text-3xl" data-icon="monitor_heart">monitor_heart</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Internal Medicine</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                  Expert diagnosis and treatment of complex, multi-system adult diseases, seasonal fevers (dengue, typhoid), and chronic illnesses.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 card-hover flex flex-col h-full lg:col-span-2 relative overflow-hidden shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 text-blue-700">
                  <span className="material-symbols-outlined text-3xl" data-icon="ecg">ecg</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Cardiovascular Health &amp; Hypertension</h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
                  Specialized focus on hypertension, cholesterol management, and preventative cardiology to ensure long-term heart health and reduce cardiovascular risk.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 card-hover flex flex-col h-full lg:col-span-2 relative overflow-hidden shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 text-emerald-700">
                  <span className="material-symbols-outlined text-3xl" data-icon="bloodtype">bloodtype</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Diabetes &amp; Metabolic Disorders</h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
                  Comprehensive management of Type 1 and Type 2 Diabetes, thyroid disorders, and metabolic syndrome through lifestyle interventions and advanced therapeutics.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-900 card-hover flex flex-col h-full shadow-lg">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-teal-400">
                  <span className="material-symbols-outlined text-3xl" data-icon="health_and_safety">health_and_safety</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Preventive Care</h3>
                <p className="text-sm text-slate-300 leading-relaxed flex-grow">
                  Proactive health screenings, adult immunizations, and personalized wellness plans to prevent illness before it starts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Clinic Location & Google Maps Section */}
        <ClinicLocationMap />
      </main>

      {/* Sticky Mobile Action Bar matching mobile design */}
      <div className="md:hidden fixed bottom-0 left-0 w-full glass-panel bg-white/95 border-t border-slate-200 p-4 flex gap-3 z-50 items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <Link
          to="/book"
          className="bg-slate-900 text-white font-bold text-sm rounded-full py-3 px-6 flex-1 text-center shadow-md active:scale-95 transition-transform"
        >
          Book Appointment
        </Link>
        <a
          href="tel:+919810123456"
          className="bg-teal-50 text-teal-700 rounded-full p-3 flex items-center justify-center border border-teal-200 active:scale-95 transition-transform shadow-sm h-12 w-12"
          aria-label="Call Clinic"
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
        </a>
      </div>
    </div>
  )
}
