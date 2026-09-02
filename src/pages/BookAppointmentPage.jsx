import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function BookAppointmentPage() {
  const [searchParams] = useSearchParams()
  const { bookAppointment, getAvailableSlotsForDate, appointments } = useApp()

  const doctor = {
    name: 'Dr. Sourav Soni',
    qualification: 'Internal Medicine, Ex-AIIMS Patna',
    image: '/images/dr-sourav-soni-hero.jpg',
    location: 'Dr. Sourav Soni Clinic, Ashok Rajpath, Patna, Bihar – 800004'
  }

  const [step, setStep] = useState(1)
  const initialType = searchParams.get('type') || 'in-person'
  const initialConcern = searchParams.get('concern') || ''

  const [formData, setFormData] = useState({
    consultationType: initialType,
    date: getNextDateString(1),
    timeSlot: '',
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: 'Female',
    chiefComplaint: initialConcern,
    medicalHistory: ''
  })

  const [confirmedBooking, setConfirmedBooking] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const slotData = getAvailableSlotsForDate(formData.date)

  useEffect(() => {
    if (slotData.allAvailable.length > 0 && !slotData.allAvailable.includes(formData.timeSlot)) {
      setFormData(prev => ({ ...prev, timeSlot: slotData.allAvailable[0] }))
    } else if (slotData.allAvailable.length === 0) {
      setFormData(prev => ({ ...prev, timeSlot: '' }))
    }
  }, [formData.date, appointments])

  function getNextDateString(daysAhead = 1) {
    const d = new Date()
    d.setDate(d.getDate() + daysAhead)
    return d.toISOString().split('T')[0]
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault()
    if (!formData.timeSlot) {
      alert('Please select an available consultation slot.')
      return
    }

    setIsSubmitting(true)
    const newBooking = {
      patient_name: formData.fullName || 'Patient',
      patient_email: formData.email || '',
      patient_phone: formData.phone || '+91 98101 23456',
      patient_age: parseInt(formData.age, 10) || 35,
      patient_gender: formData.gender || 'Female',
      consultation_type: formData.consultationType,
      appointment_date: formData.date,
      appointment_time: formData.timeSlot,
      chief_complaint: formData.chiefComplaint || 'Consultation with Dr. Sourav Soni',
      medical_notes: formData.medicalHistory || '',
      doctor_name: doctor.name
    }

    const result = await bookAppointment(newBooking)
    setIsSubmitting(false)

    if (result.success) {
      setConfirmedBooking(result.data)
      setStep(4)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const getGoogleCalendarUrl = () => {
    if (!confirmedBooking) return '#'
    const title = encodeURIComponent(`Consultation with ${doctor.name}`)
    const details = encodeURIComponent(
      `Appointment Ref: ${confirmedBooking.booking_reference}\nType: ${confirmedBooking.consultation_type}\nReason: ${confirmedBooking.chief_complaint}`
    )
    const locationStr = encodeURIComponent(doctor.location)
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${locationStr}`
  }

  const getConsultationTypeLabel = (type) => {
    if (type === 'video') return 'Video Consult'
    if (type === 'follow-up') return 'Follow-up'
    return 'In-Person (Patna)'
  }

  return (
    <div className="antialiased min-h-screen flex flex-col pt-16 sm:pt-20 bg-slate-50/50 text-slate-900 pb-16">
      <main className="flex-grow w-full max-w-7xl xl:max-w-wide mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-12 flex flex-col lg:flex-row gap-6 lg:gap-12">
        {/* Left Column: Form Steps */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6 sm:gap-8">
          <div className="mb-1 sm:mb-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Book an Appointment
            </h1>
            <p className="text-xs sm:text-base text-slate-600">
              Schedule your consultation with Dr. Sourav Soni. Only live available slots are shown.
            </p>
          </div>

          {/* Stepper with mobile responsiveness */}
          <div className="flex items-center justify-between mb-4 sm:mb-8 relative px-2">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-slate-200 z-0"></div>
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-teal-600 z-0 transition-all duration-300"
              style={{
                width: step === 1 ? '12%' : step === 2 ? '38%' : step === 3 ? '68%' : '100%'
              }}
            ></div>

            {/* Step 1 Indicator */}
            <div
              onClick={() => step > 1 && setStep(1)}
              className="relative z-10 flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ring-4 ring-white shadow-sm transition-all ${
                  step >= 1 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                1
              </div>
              <span className={`mt-1.5 text-[10px] sm:text-xs font-semibold ${step >= 1 ? 'text-teal-700 font-bold' : 'text-slate-500'}`}>
                Type
              </span>
            </div>

            {/* Step 2 Indicator */}
            <div
              onClick={() => step > 2 && setStep(2)}
              className="relative z-10 flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ring-4 ring-white shadow-sm transition-all ${
                  step >= 2 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                2
              </div>
              <span className={`mt-1.5 text-[10px] sm:text-xs font-semibold ${step >= 2 ? 'text-teal-700 font-bold' : 'text-slate-500'}`}>
                Date &amp; Time
              </span>
            </div>

            {/* Step 3 Indicator */}
            <div
              onClick={() => step > 3 && setStep(3)}
              className="relative z-10 flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ring-4 ring-white shadow-sm transition-all ${
                  step >= 3 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                3
              </div>
              <span className={`mt-1.5 text-[10px] sm:text-xs font-semibold ${step >= 3 ? 'text-teal-700 font-bold' : 'text-slate-500'}`}>
                Details
              </span>
            </div>

            {/* Step 4 Indicator */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ring-4 ring-white shadow-sm transition-all ${
                  step === 4 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                4
              </div>
              <span className={`mt-1.5 text-[10px] sm:text-xs font-semibold ${step === 4 ? 'text-teal-700 font-bold' : 'text-slate-500'}`}>
                Confirm
              </span>
            </div>
          </div>

          {/* STEP 1: SELECT CONSULTATION TYPE */}
          {step === 1 && (
            <section className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm">
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
                Select Consultation Type
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {/* In-Person */}
                <label
                  onClick={() => setFormData(p => ({ ...p, consultationType: 'in-person' }))}
                  className="cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="consultation_type"
                    value="in-person"
                    checked={formData.consultationType === 'in-person'}
                    onChange={() => {}}
                    className="peer sr-only"
                  />
                  <div className={`h-full border-2 rounded-2xl p-4 sm:p-6 transition-all text-center flex sm:flex-col items-center gap-3 sm:gap-4 ${
                    formData.consultationType === 'in-person'
                      ? 'border-teal-600 bg-teal-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-teal-400 bg-slate-50/50'
                  }`}>
                    <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-2xl">stethoscope</span>
                    </div>
                    <div className="text-left sm:text-center flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-0.5">In-Person Clinic</h3>
                      <p className="text-xs text-slate-500">Ashok Rajpath, Patna</p>
                      <span className="inline-block mt-1 text-xs font-bold text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded-full">
                        ₹1,000 Fee
                      </span>
                    </div>
                  </div>
                </label>

                {/* Video Consult */}
                <label
                  onClick={() => setFormData(p => ({ ...p, consultationType: 'video' }))}
                  className="cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="consultation_type"
                    value="video"
                    checked={formData.consultationType === 'video'}
                    onChange={() => {}}
                    className="peer sr-only"
                  />
                  <div className={`h-full border-2 rounded-2xl p-4 sm:p-6 transition-all text-center flex sm:flex-col items-center gap-3 sm:gap-4 ${
                    formData.consultationType === 'video'
                      ? 'border-teal-600 bg-teal-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-teal-400 bg-slate-50/50'
                  }`}>
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-2xl">videocam</span>
                    </div>
                    <div className="text-left sm:text-center flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-0.5">Video Consult</h3>
                      <p className="text-xs text-slate-500">Secure Online Meeting</p>
                      <span className="inline-block mt-1 text-xs font-bold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded-full">
                        ₹800 Fee
                      </span>
                    </div>
                  </div>
                </label>

                {/* Follow-up */}
                <label
                  onClick={() => setFormData(p => ({ ...p, consultationType: 'follow-up' }))}
                  className="cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="consultation_type"
                    value="follow-up"
                    checked={formData.consultationType === 'follow-up'}
                    onChange={() => {}}
                    className="peer sr-only"
                  />
                  <div className={`h-full border-2 rounded-2xl p-4 sm:p-6 transition-all text-center flex sm:flex-col items-center gap-3 sm:gap-4 ${
                    formData.consultationType === 'follow-up'
                      ? 'border-teal-600 bg-teal-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-teal-400 bg-slate-50/50'
                  }`}>
                    <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-2xl">history</span>
                    </div>
                    <div className="text-left sm:text-center flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-0.5">Follow-up</h3>
                      <p className="text-xs text-slate-500">Within 30 Days of Visit</p>
                      <span className="inline-block mt-1 text-xs font-bold text-purple-700 bg-purple-100/60 px-2 py-0.5 rounded-full">
                        ₹500 Fee
                      </span>
                    </div>
                  </div>
                </label>
              </div>

              <div className="mt-6 sm:mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setStep(2)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-teal-700 text-white font-bold text-sm py-3.5 px-8 rounded-full transition-all shadow-md active:scale-95"
                >
                  Continue to Date &amp; Slot →
                </button>
              </div>
            </section>
          )}

          {/* STEP 2: SELECT DATE & TIME SLOTS */}
          {step === 2 && (
            <section className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
                    Select Date &amp; Available Slot
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Only active, unoccupied slots are shown.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800 w-fit">
                  {slotData.totalRemaining} Slots Available
                </span>
              </div>

              {/* Date Input Box */}
              <div className="mb-6 p-3.5 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Choose Appointment Date
                </label>
                <input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full sm:max-w-xs px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:border-teal-600 shadow-sm"
                />
              </div>

              {/* Slots Layout */}
              <div className="space-y-5">
                {/* Morning Slots */}
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-amber-600 text-lg">wb_sunny</span>
                    <span>Morning Session (09:00 AM – 01:00 PM)</span>
                  </h3>
                  {slotData.morning.length === 0 ? (
                    <p className="text-xs text-slate-500 p-3 bg-slate-100 rounded-xl">
                      No morning slots remaining on this date.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {slotData.morning.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, timeSlot: slot }))}
                          className={`min-h-[48px] py-3 px-3 rounded-xl text-xs sm:text-sm font-bold border text-center transition-all active:scale-95 ${
                            formData.timeSlot === slot
                              ? 'bg-teal-700 text-white border-teal-700 shadow-md ring-2 ring-teal-600/30'
                              : 'bg-white border-slate-200 text-slate-800 hover:border-teal-500 hover:bg-teal-50/50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Evening Slots */}
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-indigo-600 text-lg">nights_stay</span>
                    <span>Evening Session (04:00 PM – 08:00 PM)</span>
                  </h3>
                  {slotData.evening.length === 0 ? (
                    <p className="text-xs text-slate-500 p-3 bg-slate-100 rounded-xl">
                      No evening slots remaining on this date.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {slotData.evening.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, timeSlot: slot }))}
                          className={`min-h-[48px] py-3 px-3 rounded-xl text-xs sm:text-sm font-bold border text-center transition-all active:scale-95 ${
                            formData.timeSlot === slot
                              ? 'bg-teal-700 text-white border-teal-700 shadow-md ring-2 ring-teal-600/30'
                              : 'bg-white border-slate-200 text-slate-800 hover:border-teal-500 hover:bg-teal-50/50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 sm:mt-8 flex justify-between items-center pt-5 border-t border-slate-200 gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-slate-600 hover:text-slate-900 text-xs sm:text-sm font-bold flex items-center gap-1 py-2 px-3"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  disabled={!formData.timeSlot}
                  onClick={() => {
                    setStep(3)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className={`font-bold text-sm py-3.5 px-7 rounded-full transition-all shadow-sm ${
                    formData.timeSlot
                      ? 'bg-slate-900 hover:bg-teal-700 text-white active:scale-95 shadow-md'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Patient Details →
                </button>
              </div>
            </section>
          )}

          {/* STEP 3: PATIENT PARTICULARS */}
          {step === 3 && (
            <section className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm">
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
                Patient Details
              </h2>

              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g., Rajesh Kumar"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:border-teal-600 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      inputMode="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98101 23456"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:border-teal-600 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      inputMode="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="patient@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Age *
                    </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      required
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="38"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:border-teal-600 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:border-teal-600 font-semibold"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Symptoms / Chief Medical Complaint *
                  </label>
                  <textarea
                    rows="3"
                    required
                    name="chiefComplaint"
                    value={formData.chiefComplaint}
                    onChange={handleInputChange}
                    placeholder="Describe main symptoms, fever, chest pain, diabetes review..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:border-teal-600"
                  ></textarea>
                </div>

                <div className="mt-6 sm:mt-8 flex justify-between items-center pt-5 border-t border-slate-200 gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-slate-600 hover:text-slate-900 text-xs sm:text-sm font-bold flex items-center gap-1 py-2 px-3"
                  >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-slate-900 hover:bg-teal-700 text-white font-bold text-sm py-3.5 px-8 rounded-full transition-all shadow-md active:scale-95"
                  >
                    {isSubmitting ? 'Reserving Live Slot...' : 'Confirm & Schedule Booking'}
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* STEP 4: CONFIRMATION */}
          {step === 4 && confirmedBooking && (
            <section className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-md">
              <div className="text-center pb-6 border-b border-slate-200">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                  Appointment Confirmed!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Your appointment is confirmed with Dr. Sourav Soni and registered in the clinic schedule.
                </p>
              </div>

              <div className="my-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                  <span className="text-slate-500">Booking Reference</span>
                  <span className="font-mono font-extrabold text-teal-700 text-base">{confirmedBooking.booking_reference}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Patient Name</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.patient_name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Date &amp; Time</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.appointment_date} at {confirmedBooking.appointment_time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Consultation Mode</span>
                  <span className="font-bold text-teal-700 capitalize">{confirmedBooking.consultation_type}</span>
                </div>
                <div className="flex justify-between items-start pt-1">
                  <span className="text-slate-500">Clinic Venue</span>
                  <span className="font-semibold text-slate-900 text-right max-w-[200px]">{doctor.location}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-full inline-flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all text-center"
                >
                  <span className="material-symbols-outlined text-lg">event</span>
                  <span>Add to Calendar</span>
                </a>

                <Link
                  to="/"
                  className="border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-xs sm:text-sm py-3.5 px-6 rounded-full inline-flex items-center justify-center gap-2 transition-colors active:scale-95 text-center"
                >
                  <span className="material-symbols-outlined text-lg">home</span>
                  <span>Back to Home</span>
                </Link>
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Sticky Summary Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-24 bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3 mb-4 flex items-center justify-between">
              <span>Appointment Summary</span>
              <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">Live Slot</span>
            </h3>

            <div className="flex flex-col gap-3.5">
              {/* Doctor Quick Badge */}
              <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200/80">
                <img
                  className="w-11 h-11 rounded-lg object-cover object-top border border-slate-200"
                  src={doctor.image}
                  alt={doctor.name}
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">{doctor.name}</div>
                  <div className="text-[11px] text-slate-500">{doctor.qualification}</div>
                </div>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-100 text-xs">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-teal-600">medical_services</span>
                  <span>Type</span>
                </span>
                <span className="font-bold text-slate-900">
                  {getConsultationTypeLabel(formData.consultationType)}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-100 text-xs">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-teal-600">calendar_today</span>
                  <span>Date</span>
                </span>
                <span className="font-bold text-slate-900">
                  {formData.date || 'Pending'}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-100 text-xs">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-teal-600">schedule</span>
                  <span>Slot</span>
                </span>
                <span className="font-bold text-teal-700 font-mono">
                  {formData.timeSlot || 'Pending'}
                </span>
              </div>

              {/* Trust Indicators */}
              <div className="mt-2 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-1.5 text-teal-700 text-xs font-bold mb-1">
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  <span>Direct Clinic Booking</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Your appointment slot is immediately held and confirmed in Dr. Sourav Soni's clinical schedule in Patna.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
