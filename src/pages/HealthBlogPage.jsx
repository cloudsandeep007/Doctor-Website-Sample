import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function HealthBlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const articles = [
    {
      id: 'art-1',
      title: 'Understanding Blood Pressure: The Silent Stress on Cardiovascular Longevity',
      slug: 'understanding-blood-pressure',
      excerpt: 'Why asymptomatic hypertension damages micro-vessels over time, how to calibrate home BP monitors, and evidence-backed lifestyle protocols for arterial flexibility.',
      category: 'Cardiovascular',
      readTime: '4 min read',
      date: 'Oct 24, 2024',
      author: 'Dr. Sourav Soni, MD'
    },
    {
      id: 'art-2',
      title: 'Essential Preventive Screenings for Adults in Their 30s, 40s & 50s',
      slug: 'essential-preventive-screenings',
      excerpt: 'Moving beyond basic checkups: why coronary calcium scoring, advanced lipid sub-fractions, and fasting insulin levels provide a true window into biological health.',
      category: 'Preventive Care',
      readTime: '6 min read',
      date: 'Oct 15, 2024',
      author: 'Dr. Sourav Soni, MD'
    },
    {
      id: 'art-3',
      title: 'Decoding Metabolic Syndrome, Insulin Sensitivity and NAFLD',
      slug: 'decoding-metabolic-syndrome',
      excerpt: 'How visceral fat drives hepatic steatosis, practical nutritional strategies to lower fasting triglycerides, and how to interpret continuous glucose monitoring curves.',
      category: 'Diabetes & Metabolism',
      readTime: '5 min read',
      date: 'Sep 29, 2024',
      author: 'Dr. Sourav Soni, MD'
    },
    {
      id: 'art-4',
      title: 'Thyroid Axis Dysregulation: Subclinical Hypothyroidism vs Chronic Fatigue',
      slug: 'thyroid-axis-dysregulation',
      excerpt: 'Clinical nuances in interpreting borderline TSH levels, anti-TPO antibody significance, and when replacement therapy is genuinely indicated.',
      category: 'Endocrinology',
      readTime: '5 min read',
      date: 'Sep 10, 2024',
      author: 'Dr. Sourav Soni, MD'
    }
  ]

  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="pt-20 sm:pt-28 lg:pt-36 pb-24 md:pb-24 min-h-screen bg-slate-50/50">
      <div className="max-w-7xl xl:max-w-wide mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-teal-200">
            <span className="material-symbols-outlined text-teal-600 text-base">article</span>
            <span>Physician Perspectives</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-2 sm:mb-4 tracking-tight">
            Health Blog &amp; Patient Guides
          </h1>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
            Evidence-based medical guides and preventive health advice authored by <strong>Dr. Sourav Soni</strong> to help patients in Patna and Bihar make informed decisions about their well-being.
          </p>
        </div>

        {/* Search & Horizontal Category Scroll Chips */}
        <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-between items-stretch sm:items-center pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-slate-200">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xl">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search health topics (BP, Diabetes, Thyroid)..."
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-full bg-white border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-teal-600 shadow-sm"
            />
          </div>

          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1 sm:pb-0">
            {['all', 'Cardiovascular', 'Preventive Care', 'Diabetes & Metabolism', 'Endocrinology'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat === 'all' ? 'All Topics' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 card-hover flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80 px-2.5 py-0.5 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500">{article.readTime}</span>
                </div>

                <h2 className="text-base sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 leading-snug">
                  {article.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3.5 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span className="font-bold text-slate-900">{article.author}</span>
                  <span>• {article.date}</span>
                </div>

                <Link
                  to={`/book?type=in-person&concern=${encodeURIComponent(article.title)}`}
                  className="text-teal-700 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Consult</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

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
            <span>Book Appointment</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
