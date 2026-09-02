import React from 'react'
import { Link } from 'react-router-dom'
import ClinicLocationMap from '../components/ClinicLocationMap'

export default function HomePage() {
  const heroImage = "/images/dr-sourav-soni-hero.jpg"
  const aboutImage = "/images/dr-sourav-soni-about.jpg"
  const consultImage = "/images/dr-sourav-soni-consultation.jpg"

  return (
    <div className="bg-slate-50/50 text-slate-900 font-body-md text-body-md antialiased overflow-x-hidden pb-24 md:pb-0">
      <main>
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-white via-slate-50 to-slate-100/60 pt-20 sm:pt-28 pb-12 sm:pb-16 lg:pt-36 lg:pb-24 border-b border-slate-200/80">
          <div className="max-w-7xl xl:max-w-wide mx-auto px-4 sm:px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              {/* Hero Text */}
              <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-6 z-10 text-center sm:text-left">
                {/* Clinical Badge */}
                <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full w-fit mx-auto sm:mx-0 shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse"></span>
                  <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                    Senior Consultant Physician
                  </span>
                </div>

                <h1 className="font-headline-md text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.2] sm:leading-[1.15]">
                  Trusted Medical Care, Backed by Experience.
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto sm:mx-0">
                  Led by <strong>Dr. Sourav Soni</strong>, providing evidence-based internal medicine, diabetes care, and preventive health at Ashok Rajpath, Patna.
                </p>

                {/* Stats / Quick Info Chips on Mobile & Desktop */}
                <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-4 sm:pt-6 border-t border-slate-200 text-center">
                  <div className="flex flex-col bg-white sm:bg-transparent p-2.5 sm:p-0 rounded-2xl sm:rounded-none border sm:border-0 border-slate-200/80 shadow-sm sm:shadow-none">
                    <span className="text-xl sm:text-3xl font-extrabold text-slate-900">15+</span>
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Years Exp.</span>
                  </div>
                  <div className="flex flex-col bg-white sm:bg-transparent p-2.5 sm:p-0 rounded-2xl sm:rounded-none border sm:border-0 border-slate-200/80 sm:border-x sm:border-slate-200 sm:px-4 shadow-sm sm:shadow-none">
                    <span className="text-xl sm:text-3xl font-extrabold text-teal-700">AIIMS</span>
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Patna Alumni</span>
                  </div>
                  <div className="flex flex-col bg-white sm:bg-transparent p-2.5 sm:p-0 rounded-2xl sm:rounded-none border sm:border-0 border-slate-200/80 shadow-sm sm:shadow-none">
                    <span className="text-xl sm:text-3xl font-extrabold text-slate-900">MD</span>
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Internal Med.</span>
                  </div>
                </div>

                {/* Desktop Action Buttons */}
                <div className="hidden sm:flex flex-wrap items-center gap-4 mt-2">
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
              <div className="lg:col-span-6 relative mt-2 sm:mt-4 lg:mt-0 flex justify-center">
                <div className="relative w-full max-w-sm sm:max-w-lg lg:max-w-none aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-slate-100 shadow-xl border border-slate-200">
                  <img
                    className="w-full h-full object-cover object-top"
                    src={heroImage}
                    alt="Dr. Sourav Soni - Senior Consultant Physician, Ashok Rajpath, Patna"
                  />
                  {/* Floating Badge */}
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 glass-panel bg-white/95 p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="material-symbols-outlined text-xl sm:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified_user
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Board Certified Specialist</p>
                      <p className="text-xs sm:text-base font-bold text-slate-900">Dr. Sourav Soni, MD</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Fast Quick-Action Grid (Touch Optimized) */}
              <div className="sm:hidden col-span-1 grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/book?type=in-person"
                  className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center active:scale-95 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-xl">stethoscope</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">In-Person Visit</span>
                  <span className="text-[10px] text-teal-700 font-semibold">Ashok Rajpath</span>
                </Link>

                <Link
                  to="/book?type=video"
                  className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center active:scale-95 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-xl">videocam</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">Video Consult</span>
                  <span className="text-[10px] text-blue-700 font-semibold">Online Booking</span>
                </Link>

                <a
                  href="#location"
                  className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center active:scale-95 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-xl">location_on</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">Clinic Map</span>
                  <span className="text-[10px] text-amber-700 font-semibold">Patna Directions</span>
                </a>

                <a
                  href="tel:+919810123456"
                  className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center active:scale-95 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-xl">call</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">Call Clinic</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">+91 98101 23456</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="w-full bg-white border-b border-slate-200/80 py-6 sm:py-10 shadow-sm">
          <div className="max-w-7xl xl:max-w-wide mx-auto px-4 sm:px-8 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-4 items-center">
              <div className="flex items-center gap-3.5 justify-start md:justify-center p-3 sm:p-0 bg-slate-50 sm:bg-transparent rounded-2xl sm:rounded-none border sm:border-0 border-slate-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0">
                  <span className="material-symbols-outlined text-xl sm:text-2xl">school</span>
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">MBBS, MD (Medicine)</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500">Top-tier Clinical Qualification</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 justify-start md:justify-center p-3 sm:p-0 bg-slate-50 sm:bg-transparent rounded-2xl sm:rounded-none border sm:border-0 border-slate-200 md:border-x md:border-slate-200 md:px-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0">
                  <span className="material-symbols-outlined text-xl sm:text-2xl">local_hospital</span>
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">Ex-AIIMS Patna</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500">Premier Tertiary Care Exp.</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 justify-start md:justify-center p-3 sm:p-0 bg-slate-50 sm:bg-transparent rounded-2xl sm:rounded-none border sm:border-0 border-slate-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0">
                  <span className="material-symbols-outlined text-xl sm:text-2xl">pin_drop</span>
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">Ashok Rajpath, Patna</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500">Central Clinic in Bihar</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="w-full bg-slate-50 py-16 sm:py-20 lg:py-28 border-b border-slate-200/80" id="about">
          <div className="max-w-7xl xl:max-w-wide mx-auto px-4 sm:px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Photo Collage */}
              <div className="lg:col-span-5 relative flex flex-col gap-4 sm:gap-5">
                <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md">
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
              <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-teal-200">
                    Clinical Background
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4 tracking-tight">
                    About Dr. Sourav Soni
                  </h2>
                  <p className="text-sm sm:text-lg text-slate-600 mb-3 sm:mb-4 leading-relaxed">
                    Dr. Sourav Soni is a Senior Consultant Physician practicing at Ashok Rajpath, Patna, Bihar. With extensive clinical training from AIIMS Patna, he is committed to providing meticulous, evidence-backed medical evaluations and compassionate healing for patients across Bihar.
                  </p>
                  <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
                    His clinical practice integrates state-of-the-art diagnostic protocols with proactive lifestyle interventions to help manage chronic diseases effectively.
                  </p>
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-5 sm:gap-6 relative pl-5 sm:pl-6 border-l-2 border-teal-500/30 ml-2">
                  <div className="relative">
                    <span className="absolute -left-[27px] sm:-left-[31px] top-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white border-4 border-teal-600"></span>
                    <h3 className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-0.5 sm:mb-1">Present</h3>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900">Senior Consultant Physician</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1">Medical Practice &amp; Consultation, Ashok Rajpath, Patna, Bihar</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[27px] sm:-left-[31px] top-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white border-4 border-teal-400"></span>
                    <h3 className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-0.5 sm:mb-1">Clinical Career</h3>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900">Consultant, Internal Medicine</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1">AIIMS Patna – Handled complex diagnostic cases, acute fevers, and ICU patient care.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[27px] sm:-left-[31px] top-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white border-4 border-slate-300"></span>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5 sm:mb-1">Education</h3>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900">MD (Medicine) &amp; MBBS</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1">Distinguished medical graduate with specialized research in adult internal medicine.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="w-full bg-white py-16 sm:py-20 lg:py-28 border-b border-slate-200/80" id="expertise">
          <div className="max-w-7xl xl:max-w-wide mx-auto px-4 sm:px-8 lg:px-16">
            <div className="flex flex-col items-center text-center mb-10 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-teal-200">
                Core Specialties
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-2 sm:mb-4 tracking-tight">
                Areas of Medical Expertise
              </h2>
              <p className="text-xs sm:text-lg text-slate-600 max-w-2xl">
                Comprehensive management of adult health conditions in Patna, focusing on accurate diagnosis and sustainable treatment plans.
              </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Card 1 */}
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 card-hover flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-4 sm:mb-6 text-teal-700">
                    <span className="material-symbols-outlined text-2xl sm:text-3xl" data-icon="monitor_heart">monitor_heart</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">Internal Medicine</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    Expert diagnosis and treatment of complex, multi-system adult diseases, seasonal fevers (dengue, typhoid), and chronic illnesses.
                  </p>
                </div>
                <Link to="/book?type=in-person&concern=Internal%20Medicine" className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1">
                  Book Slot <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 card-hover flex flex-col justify-between lg:col-span-2 relative overflow-hidden shadow-sm">
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-4 sm:mb-6 text-blue-700">
                    <span className="material-symbols-outlined text-2xl sm:text-3xl" data-icon="ecg">ecg</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">Cardiovascular Health &amp; Hypertension</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mb-4">
                    Specialized focus on hypertension, cholesterol management, and preventative cardiology to ensure long-term heart health and reduce cardiovascular risk.
                  </p>
                </div>
                <Link to="/book?type=in-person&concern=Cardiovascular%20Health" className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1">
                  Book Slot <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 card-hover flex flex-col justify-between lg:col-span-2 relative overflow-hidden shadow-sm">
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4 sm:mb-6 text-emerald-700">
                    <span className="material-symbols-outlined text-2xl sm:text-3xl" data-icon="bloodtype">bloodtype</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">Diabetes &amp; Metabolic Disorders</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mb-4">
                    Comprehensive management of Type 1 and Type 2 Diabetes, thyroid disorders, and metabolic syndrome through lifestyle interventions and advanced therapeutics.
                  </p>
                </div>
                <Link to="/book?type=in-person&concern=Diabetes%20Care" className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1">
                  Book Slot <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Card 4 */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-900 card-hover flex flex-col justify-between shadow-lg">
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4 sm:mb-6 text-teal-400">
                    <span className="material-symbols-outlined text-2xl sm:text-3xl" data-icon="health_and_safety">health_and_safety</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Preventive Care</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    Proactive health screenings, adult immunizations, and personalized wellness plans to prevent illness before it starts.
                  </p>
                </div>
                <Link to="/book?type=in-person&concern=Preventive%20Health" className="text-xs font-bold text-teal-400 hover:underline inline-flex items-center gap-1">
                  Book Slot <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Clinic Location & Google Maps Section */}
        <ClinicLocationMap />
      </main>

      {/* Ergonomic Floating Bottom Action Bar for Mobile Thumb-Zone */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_25px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2.5 max-w-md mx-auto">
          {/* Direct WhatsApp / Phone Dialer */}
          <a
            href="tel:+919810123456"
            className="h-12 w-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center flex-shrink-0 shadow-sm active:scale-90 transition-transform"
            aria-label="Call Doctor Directly"
          >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
          </a>

          {/* Primary High-Converting Book Consultation CTA */}
          <Link
            to="/book"
            className="flex-1 h-12 bg-slate-900 active:bg-teal-700 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">calendar_month</span>
            <span>Book Appointment</span>
            <span className="text-[11px] font-normal bg-white/20 px-2 py-0.5 rounded-full ml-1">₹1,000</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
