import React, { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-2xl' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className={`bg-surface w-full ${maxWidth} rounded-3xl border border-outline-variant/40 shadow-2xl overflow-hidden my-8 transform transition-all animate-scale-up`}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-surface-container-lowest border-b border-outline-variant/30 flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm text-lg md:text-xl font-bold text-primary">{title}</h3>
            {subtitle && <p className="font-label-sm text-xs text-on-surface-variant mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-surface-variant text-on-surface-variant flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
