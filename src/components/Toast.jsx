import React from 'react'
import { useApp } from '../context/AppContext'

export default function Toast() {
  const { toast } = useApp()

  if (!toast) return null

  const isError = toast.type === 'error'
  const isInfo = toast.type === 'info'

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
      <div
        className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border backdrop-blur-md transition-all ${
          isError
            ? 'bg-error-container/95 text-on-error-container border-error/30'
            : isInfo
            ? 'bg-surface-container-high/95 text-primary border-outline-variant/40'
            : 'bg-brand-navy/95 text-white border-white/10'
        }`}
      >
        <span className="material-symbols-outlined text-xl">
          {isError ? 'error' : isInfo ? 'info' : 'check_circle'}
        </span>
        <span className="font-label-md text-sm tracking-wide">{toast.message}</span>
      </div>
    </div>
  )
}
