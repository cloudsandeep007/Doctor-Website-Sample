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
    <div className="pt-28 lg:pt-36 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary-container/30 px-4 py-2 rounded-full mb-3">
            <span className="material-symbols-outlined text-secondary text-lg">article</span>
            <span className="font-label-sm text-label-sm text-on-secondary-container font-semibold uppercase tracking-wider">
              Physician Perspectives
            </span>
          </div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
            Health Blog &amp; Resources
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Evidence-based medical guides and preventive health advice authored by <strong>Dr. Sourav Soni</strong> to help patients in Patna and Bihar make informed decisions about their well-being.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center pb-8 mb-8 border-b border-outline-variant/30">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2 text-xl">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search medical topics (e.g., Blood Pressure, Diabetes)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface-container-low border border-outline-variant/40 text-sm focus:outline-none focus:border-secondary"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {['all', 'Cardiovascular', 'Preventive Care', 'Diabetes & Metabolism', 'Endocrinology'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {cat === 'all' ? 'All Topics' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 card-hover flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{article.readTime}</span>
                </div>

                <h2 className="font-headline-sm text-xl font-bold text-primary mb-3 leading-snug">
                  {article.title}
                </h2>

                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between font-label-sm text-label-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">{article.author}</span>
                  <span className="text-on-surface-variant">• {article.date}</span>
                </div>

                <Link
                  to={`/book?type=in-person&concern=${encodeURIComponent(article.title)}`}
                  className="text-secondary font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Consult Physician</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
