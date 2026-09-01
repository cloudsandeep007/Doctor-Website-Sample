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
      patient_name: formData.fullName || 'Sarah Jenkins',
      patient_email: formData.email || 'patient@example.com',
      patient_phone: formData.phone || '+91 98101 23456',
      patient_age: parseInt(formData.age, 10) || 35,
      patient_gender: formData.gender || 'Female',
      consultation_type: formData.consultationType,
      appointment_date: formData.date,
      appointment_time: formData.timeSlot,
      chief_complaint: formData.chiefComplaint || 'Consultation with Dr. Sourav Soni',
      medical_notes: formData.medicalHistory || '',
      clinic_room: 'Main Consultation Chamber, Ashok Rajpath',
      doctor_name: doctor.name
    }

    const result = await bookAppointment(newBooking)
    setIsSubmitting(false)

    if (result.success) {
      setConfirmedBooking(result.data)
      setStep(4)
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
    <div className="antialiased min-h-screen flex flex-col pt-20 bg-background text-on-background">
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Column: Form Steps */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          <div className="mb-2">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">
              Book an Appointment
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Please follow the steps below to schedule your consultation with Dr. Sourav Soni. Only active available slots are shown.
            </p>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-surface-variant z-0"></div>
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-secondary z-0 transition-all duration-300"
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
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-label-md font-bold ring-4 ring-background ${
                  step >= 1 ? 'bg-secondary text-on-secondary' : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                1
              </div>
              <span className={`mt-2 font-label-sm text-label-sm hidden md:block ${step >= 1 ? 'text-secondary' : 'text-on-surface-variant'}`}>
                Type
              </span>
            </div>

            {/* Step 2 Indicator */}
            <div
              onClick={() => step > 2 && setStep(2)}
              className="relative z-10 flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-label-md font-bold ring-4 ring-background ${
                  step >= 2 ? 'bg-secondary text-on-secondary' : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                2
              </div>
              <span className={`mt-2 font-label-sm text-label-sm hidden md:block ${step >= 2 ? 'text-secondary' : 'text-on-surface-variant'}`}>
                Date &amp; Time
              </span>
            </div>

            {/* Step 3 Indicator */}
            <div
              onClick={() => step > 3 && setStep(3)}
              className="relative z-10 flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-label-md font-bold ring-4 ring-background ${
                  step >= 3 ? 'bg-secondary text-on-secondary' : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                3
              </div>
              <span className={`mt-2 font-label-sm text-label-sm hidden md:block ${step >= 3 ? 'text-secondary' : 'text-on-surface-variant'}`}>
                Details
              </span>
            </div>

            {/* Step 4 Indicator */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-label-md font-bold ring-4 ring-background ${
                  step === 4 ? 'bg-secondary text-on-secondary' : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                4
              </div>
              <span className={`mt-2 font-label-sm text-label-sm hidden md:block ${step === 4 ? 'text-secondary' : 'text-on-surface-variant'}`}>
                Review
              </span>
            </div>
          </div>

          {/* STEP 1: SELECT CONSULTATION TYPE */}
          {step === 1 && (
            <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-8 shadow-sm">
              <h2 className="font-headline-md text-headline-md text-primary mb-6">
                Select Consultation Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <div className={`h-full border-2 rounded-2xl p-6 transition-all text-center flex flex-col items-center gap-4 ${
                    formData.consultationType === 'in-person'
                      ? 'border-secondary bg-secondary/5'
                      : 'border-outline-variant/50 hover:border-secondary/50'
                  }`}>
                    <span className={`material-symbols-outlined text-[32px] ${
                      formData.consultationType === 'in-person' ? 'text-secondary' : 'text-on-surface-variant group-hover:text-secondary'
                    }`}>
                      stethoscope
                    </span>
                    <div>
                      <h3 className="font-label-md text-label-md text-primary mb-1">In-Person Clinic</h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Ashok Rajpath (₹1,000)</p>
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
                  <div className={`h-full border-2 rounded-2xl p-6 transition-all text-center flex flex-col items-center gap-4 ${
                    formData.consultationType === 'video'
                      ? 'border-secondary bg-secondary/5'
                      : 'border-outline-variant/50 hover:border-secondary/50'
                  }`}>
                    <span className={`material-symbols-outlined text-[32px] ${
                      formData.consultationType === 'video' ? 'text-secondary' : 'text-on-surface-variant group-hover:text-secondary'
                    }`}>
                      videocam
                    </span>
                    <div>
                      <h3 className="font-label-md text-label-md text-primary mb-1">Video Consult</h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Secure Tele-Meeting (₹800)</p>
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
                  <div className={`h-full border-2 rounded-2xl p-6 transition-all text-center flex flex-col items-center gap-4 ${
                    formData.consultationType === 'follow-up'
                      ? 'border-secondary bg-secondary/5'
                      : 'border-outline-variant/50 hover:border-secondary/50'
                  }`}>
                    <span className={`material-symbols-outlined text-[32px] ${
                      formData.consultationType === 'follow-up' ? 'text-secondary' : 'text-on-surface-variant group-hover:text-secondary'
                    }`}>
                      history
                    </span>
                    <div>
                      <h3 className="font-label-md text-label-md text-primary mb-1">Follow-up</h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Within 30 Days (₹500)</p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-primary text-on-primary font-label-md text-label-md py-3 px-8 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Continue to Date
                </button>
              </div>
            </section>
          )}

          {/* STEP 2: SELECT DATE & ONLY AVAILABLE SLOTS */}
          {step === 2 && (
            <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h2 className="font-headline-md text-headline-md text-primary">
                    Select Date &amp; Available Slot
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                    Showing only active, vacant consultation slots for the chosen date.
                  </p>
                </div>
                <span className="font-label-sm text-xs font-semibold px-3 py-1 rounded-full bg-secondary/10 text-secondary w-fit">
                  {slotData.totalRemaining} Available Slots
                </span>
              </div>

              {/* Date Input */}
              <div className="mb-8 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
                <label className="block font-label-md text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  Appointment Date
                </label>
                <input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full sm:max-w-xs px-4 py-3 rounded-lg bg-surface border border-outline-variant/50 text-sm font-semibold text-primary focus:outline-none focus:border-secondary"
                />
              </div>

              {/* Slots Section */}
              <div className="space-y-6">
                {/* Morning Slots */}
                <div>
                  <h3 className="font-label-md text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-base">wb_sunny</span>
                    Morning Session (09:00 AM – 01:00 PM)
                  </h3>
                  {slotData.morning.length === 0 ? (
                    <p className="text-xs text-on-surface-variant p-3 bg-surface-container-high/40 rounded-lg">
                      No morning slots available on this date.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {slotData.morning.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, timeSlot: slot }))}
                          className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border text-center transition-all ${
                            formData.timeSlot === slot
                              ? 'bg-secondary text-white border-secondary shadow-md'
                              : 'bg-surface border-outline-variant/50 text-primary hover:border-secondary hover:bg-secondary/5'
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
                  <h3 className="font-label-md text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-base">nights_stay</span>
                    Evening Session (04:00 PM – 08:00 PM)
                  </h3>
                  {slotData.evening.length === 0 ? (
                    <p className="text-xs text-on-surface-variant p-3 bg-surface-container-high/40 rounded-lg">
                      No evening slots available on this date.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {slotData.evening.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, timeSlot: slot }))}
                          className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border text-center transition-all ${
                            formData.timeSlot === slot
                              ? 'bg-secondary text-white border-secondary shadow-md'
                              : 'bg-surface border-outline-variant/50 text-primary hover:border-secondary hover:bg-secondary/5'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center pt-6 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-on-surface-variant hover:text-primary font-label-md text-label-md flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span> Back
                </button>
                <button
                  type="button"
                  disabled={!formData.timeSlot}
                  onClick={() => setStep(3)}
                  className={`font-label-md text-label-md py-3 px-8 rounded-full transition-colors shadow-sm ${
                    formData.timeSlot
                      ? 'bg-primary text-on-primary hover:bg-primary/90'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Continue to Details
                </button>
              </div>
            </section>
          )}

          {/* STEP 3: PATIENT PARTICULARS */}
          {step === 3 && (
            <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-8 shadow-sm">
              <h2 className="font-headline-md text-headline-md text-primary mb-6">
                Patient Particulars &amp; Clinical Notes
              </h2>

              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-md text-label-md text-primary mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Ramesh Kumar"
                      className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-sm focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-primary mb-1">
                      Mobile Number (For WhatsApp Reminders) *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98101 23456"
                      className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-sm focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-label-md text-label-md text-primary mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="patient@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-sm focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-primary mb-1">
                      Age *
                    </label>
                    <input
                      type="number"
                      required
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="42"
                      className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-sm focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-primary mb-1">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-sm focus:outline-none focus:border-secondary"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-primary mb-1">
                    Reason for Consultation / Symptoms *
                  </label>
                  <textarea
                    rows="3"
                    required
                    name="chiefComplaint"
                    value={formData.chiefComplaint}
                    onChange={handleInputChange}
                    placeholder="Describe main symptoms, duration, or previous lab findings..."
                    className="w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-sm focus:outline-none focus:border-secondary"
                  ></textarea>
                </div>

                <div className="mt-8 flex justify-between items-center pt-6 border-t border-outline-variant/30">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-on-surface-variant hover:text-primary font-label-md text-label-md flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span> Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-on-primary font-label-md text-label-md py-3 px-8 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    {isSubmitting ? 'Reserving Slot...' : 'Confirm & Reserve'}
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* STEP 4: REVIEW & CONFIRMATION */}
          {step === 4 && confirmedBooking && (
            <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-8 shadow-sm">
              <div className="text-center pb-6 border-b border-outline-variant/20">
                <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-primary mb-1">
                  Appointment Confirmed!
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Your consultation has been scheduled with Dr. Sourav Soni.
                </p>
              </div>

              <div className="my-6 p-6 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
                  <span className="text-on-surface-variant">Booking Reference</span>
                  <span className="font-mono font-bold text-secondary">{confirmedBooking.booking_reference}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Patient Name</span>
                  <span className="font-semibold text-primary">{confirmedBooking.patient_name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Date &amp; Time</span>
                  <span className="font-semibold text-primary">{confirmedBooking.appointment_date} at {confirmedBooking.appointment_time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Consultation Mode</span>
                  <span className="font-semibold text-primary capitalize">{confirmedBooking.consultation_type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Venue</span>
                  <span className="font-semibold text-primary">{doctor.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-on-primary font-label-md text-label-md py-3 px-6 rounded-full inline-flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-lg">event</span>
                  Add to Calendar
                </a>

                <Link
                  to="/"
                  className="border border-secondary text-secondary font-label-md text-label-md py-3 px-6 rounded-full inline-flex items-center gap-2 hover:bg-secondary/5 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">home</span>
                  Back to Home
                </Link>
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Sticky Summary Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-[104px] bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
            <h3 className="font-headline-sm text-headline-sm text-primary border-b border-outline-variant/30 pb-4 mb-4">
              Booking Summary
            </h3>
            <div className="flex flex-col gap-4">
              {/* Practitioner Info */}
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-variant">
                  <img
                    className="w-full h-full object-cover object-top"
                    src={doctor.image}
                    alt={doctor.name}
                  />
                </div>
                <div>
                  <div className="font-label-md text-label-md text-primary font-bold">{doctor.name}</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">{doctor.qualification}</div>
                </div>
              </div>

              <div className="flex justify-between items-start py-2 border-b border-surface-variant">
                <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">medical_services</span> Type
                </div>
                <div className="font-label-md text-label-md text-primary text-right font-medium">
                  {getConsultationTypeLabel(formData.consultationType)}
                </div>
              </div>

              <div className={`flex justify-between items-start py-2 border-b border-surface-variant ${formData.date ? '' : 'opacity-50'}`}>
                <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span> Date
                </div>
                <div className="font-label-md text-label-md text-primary text-right font-medium">
                  {formData.date || 'Pending'}
                </div>
              </div>

              <div className={`flex justify-between items-start py-2 border-b border-surface-variant ${formData.timeSlot ? '' : 'opacity-50'}`}>
                <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">schedule</span> Time
                </div>
                <div className="font-label-md text-label-md text-primary text-right font-medium">
                  {formData.timeSlot || 'Pending'}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-4 border-t border-outline-variant/30">
                <div className="flex items-center gap-2 text-secondary mb-2">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  <span className="font-label-sm text-label-sm font-semibold">Secure Booking</span>
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Your personal information is encrypted and securely stored following strict medical privacy guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
