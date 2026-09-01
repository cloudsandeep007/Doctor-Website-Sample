import React from 'react'
import { Link } from 'react-router-dom'

export default function ExpertisePage() {
  return (
    <div className="antialiased min-h-screen flex flex-col pt-20 bg-background text-on-background">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="w-full bg-surface py-16 lg:py-24 border-b border-outline-variant/20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-secondary-container/30 px-4 py-2 rounded-full mb-4">
                <span className="material-symbols-outlined text-secondary text-lg">medical_services</span>
                <span className="font-label-sm text-label-sm text-on-secondary-container font-semibold uppercase tracking-wider">
                  Specialized Medical Practice
                </span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">
                Expertise &amp; Treatments
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Comprehensive medical care tailored to your unique health needs by <strong>Dr. Sourav Soni</strong>. We combine advanced diagnostic technology with a deep understanding of human physiology to deliver precise, effective treatments in Ashok Rajpath, Patna.
              </p>
            </div>
          </div>
        </section>

        {/* Areas of Expertise Grid */}
        <section className="w-full bg-surface-container-low py-20 lg:py-28 border-b border-outline-variant/20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col items-start mb-12">
              <h2 className="font-headline-md text-headline-md text-primary mb-2">
                Clinical Disciplines &amp; Focus Areas
              </h2>
              <p className="font-body-md text-on-surface-variant">
                Select a specialty below to learn more or directly schedule a consultation in Patna.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Expertise Card 1 */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-8 hover-card transition-all duration-300 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-secondary-fixed-dim/30 flex items-center justify-center mb-6 text-secondary">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      favorite
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-xl font-bold text-primary mb-3">
                    Cardiovascular Health
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    Advanced screening and management of heart conditions, hypertension, lipid profiles, and cardiovascular risk factor modification.
                  </p>
                </div>
                <Link
                  className="inline-flex items-center text-secondary font-label-md text-label-md font-semibold hover:underline"
                  to="/book?type=in-person&concern=Cardiovascular%20Health"
                >
                  Book Consultation <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Expertise Card 2 */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-8 hover-card transition-all duration-300 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed-dim/30 flex items-center justify-center mb-6 text-tertiary-container">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      psychology
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-xl font-bold text-primary mb-3">
                    Neurological Care
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    Comprehensive evaluation and treatment of neurological disorders, chronic headaches, neuropathy, and secondary vascular evaluations.
                  </p>
                </div>
                <Link
                  className="inline-flex items-center text-tertiary-container font-label-md text-label-md font-semibold hover:underline"
                  to="/book?type=in-person&concern=Neurological%20Care"
                >
                  Book Consultation <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Expertise Card 3 */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-8 hover-card transition-all duration-300 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-primary-fixed/60 flex items-center justify-center mb-6 text-primary-container">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      monitor_weight
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-xl font-bold text-primary mb-3">
                    Metabolic Disorders &amp; Diabetes
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    Holistic management of metabolic conditions including Type 1 and Type 2 Diabetes, thyroid disorders, and lifestyle integration.
                  </p>
                </div>
                <Link
                  className="inline-flex items-center text-primary-container font-label-md text-label-md font-semibold hover:underline"
                  to="/book?type=in-person&concern=Metabolic%20Disorders"
                >
                  Book Consultation <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Expertise Card 4 - Internal Medicine */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-8 hover-card transition-all duration-300 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-secondary-container/40 flex items-center justify-center mb-6 text-secondary">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      monitor_heart
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-xl font-bold text-primary mb-3">
                    Internal Medicine &amp; Fevers
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    Expert diagnosis and treatment of complex, multi-system diseases in adults, seasonal fevers (dengue, typhoid), and chronic illnesses.
                  </p>
                </div>
                <Link
                  className="inline-flex items-center text-secondary font-label-md text-label-md font-semibold hover:underline"
                  to="/book?type=in-person&concern=Internal%20Medicine"
                >
                  Book Consultation <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Expertise Card 5 - Preventive Health */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-8 hover-card transition-all duration-300 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 text-emerald-800">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      health_and_safety
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-xl font-bold text-primary mb-3">
                    Preventive Health Screening
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    Proactive annual executive health checkups, adult vaccinations, hepatic screening, and personalized longevity plans.
                  </p>
                </div>
                <Link
                  className="inline-flex items-center text-secondary font-label-md text-label-md font-semibold hover:underline"
                  to="/book?type=in-person&concern=Preventive%20Health"
                >
                  Book Consultation <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Expertise Card 6 - Diagnostic Workup */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-8 hover-card transition-all duration-300 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center mb-6 text-primary-container">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      clinical_notes
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-xl font-bold text-primary mb-3">
                    Clinical Diagnostics &amp; ECG
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    In-clinic 12-lead ECG, digital blood pressure tracking, comprehensive lab biochemistry, and post-discharge recovery review in Patna.
                  </p>
                </div>
                <Link
                  className="inline-flex items-center text-primary-container font-label-md text-label-md font-semibold hover:underline"
                  to="/book?type=in-person&concern=Diagnostic%20Workup"
                >
                  Book Consultation <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
