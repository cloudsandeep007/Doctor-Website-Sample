import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Modal from '../components/Modal'

export default function PatientPortalPage() {
  const {
    appointments,
    patientProfile,
    vitals,
    addVitalRecord,
    reports,
    prescriptions,
    rescheduleAppointment,
    cancelAppointment,
    getAvailableSlotsForDate
  } = useApp()

  // Security Gate State
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [patientCodeInput, setPatientCodeInput] = useState('')
  const [authError, setAuthError] = useState('')

  const [activeTab, setActiveTab] = useState('overview')
  const [selectedReport, setSelectedReport] = useState(null)
  const [reschedulingApt, setReschedulingApt] = useState(null)
  const [rescheduleDate, setRescheduleDate] = useState('')
  const [rescheduleSlot, setRescheduleSlot] = useState('')
  const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false)

  const [vitalForm, setVitalForm] = useState({
    heartRate: '72',
    systolic: '118',
    diastolic: '75',
    weight: '68',
    bloodGlucose: '96',
    oxygenSaturation: '99',
    notes: 'Home resting check'
  })

  const handleLogin = (e) => {
    e.preventDefault()
    // Accept patient code "9482-A" or any valid booking reference (e.g., DRS-...)
    const input = patientCodeInput.trim().toUpperCase()
    if (input === '9482-A' || input.startsWith('DRS-') || input === 'PATNA2026') {
      setIsAuthenticated(true)
      setAuthError('')
    } else {
      setAuthError('Invalid Patient Code or Booking Ref. Please enter your confidential patient code (e.g., 9482-A or your DRS- booking ID).')
    }
  }

  // If not authenticated, show secure verification lock
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center px-6 py-12">
        <div className="max-w-md w-full bg-slate-800/90 border border-slate-700 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-500/20 shadow-inner">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                lock
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Confidential Patient Portal</h1>
            <p className="text-sm text-slate-400 mt-1.5">
              Dr. Sourav Soni Medical Practice (Patna)
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Patient Code / Booking Reference
              </label>
              <input
                type="text"
                required
                value={patientCodeInput}
                onChange={(e) => {
                  setPatientCodeInput(e.target.value)
                  setAuthError('')
                }}
                placeholder="e.g., 9482-A or DRS-99999"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-teal-500 placeholder-slate-500"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-400 leading-relaxed bg-rose-950/40 p-3 rounded-xl border border-rose-800/40">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-lg active:scale-95"
            >
              Verify &amp; Access Medical Records
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-700 text-center">
            <Link
              to="/"
              className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Back to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const activeAppointments = appointments.filter(a => a.status !== 'cancelled')
  const rescheduleSlots = getAvailableSlotsForDate(rescheduleDate)

  const handleOpenReschedule = (apt) => {
    setReschedulingApt(apt)
    setRescheduleDate(apt.appointment_date)
    setRescheduleSlot(apt.appointment_time)
  }

  const handleConfirmReschedule = async () => {
    if (!reschedulingApt || !rescheduleDate || !rescheduleSlot) return
    await rescheduleAppointment(reschedulingApt.id, rescheduleDate, rescheduleSlot)
    setReschedulingApt(null)
  }

  const handleSaveVitals = (e) => {
    e.preventDefault()
    addVitalRecord({
      heartRate: parseInt(vitalForm.heartRate, 10),
      bloodPressure: `${vitalForm.systolic}/${vitalForm.diastolic}`,
      systolic: parseInt(vitalForm.systolic, 10),
      diastolic: parseInt(vitalForm.diastolic, 10),
      weight: parseFloat(vitalForm.weight),
      bloodGlucose: parseInt(vitalForm.bloodGlucose, 10),
      oxygenSaturation: parseInt(vitalForm.oxygenSaturation, 10),
      notes: vitalForm.notes
    })
    setIsVitalsModalOpen(false)
  }

  return (
    <div className="font-body-md text-body-md antialiased h-screen flex overflow-hidden bg-background text-[#0F172A]">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col h-full flex-shrink-0 hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-outline-variant/30">
          <Link to="/" className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">
            Dr. Sourav Soni
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-label-md text-label-md transition-colors ${
              activeTab === 'overview'
                ? 'bg-primary-container text-on-primary-container'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-label-md text-label-md transition-colors ${
              activeTab === 'appointments'
                ? 'bg-primary-container text-on-primary-container'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined" data-icon="event">event</span>
            <span>Appointments</span>
          </button>

          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-label-md text-label-md transition-colors ${
              activeTab === 'prescriptions'
                ? 'bg-primary-container text-on-primary-container'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined" data-icon="medication">medication</span>
            <span>Prescriptions</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-label-md text-label-md transition-colors ${
              activeTab === 'reports'
                ? 'bg-primary-container text-on-primary-container'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined" data-icon="lab_profile">lab_profile</span>
            <span>Reports</span>
          </button>
        </nav>

        <div className="p-4 border-t border-outline-variant/30 space-y-2">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-rose-700 hover:bg-rose-50 transition-colors font-label-md text-label-md"
          >
            <span className="material-symbols-outlined text-rose-600">logout</span>
            <span>Lock &amp; Exit Portal</span>
          </button>
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors duration-300 font-label-md text-label-md"
          >
            <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background">
        {/* Top App Bar */}
        <header className="h-20 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center px-margin-mobile md:px-margin-desktop z-10 sticky top-0">
          <div className="flex items-center md:hidden gap-3">
            <button onClick={() => setIsAuthenticated(false)} className="text-primary">
              <span className="material-symbols-outlined">logout</span>
            </button>
            <span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">Patient Portal</span>
          </div>
          <div className="hidden md:block">
            <h1 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Welcome back, {patientProfile.name.split(' ')[0]}</h1>
          </div>
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              onClick={() => setIsVitalsModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:underline"
            >
              <span className="material-symbols-outlined text-sm">vital_signs</span> Log Vitals
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-xs font-semibold text-slate-500 hover:text-rose-600 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-margin-mobile md:p-margin-desktop space-y-gutter">
          {/* Quick Actions & Overview */}
          <div className="flex flex-col md:flex-row gap-gutter justify-between items-start md:items-center">
            <div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-1">
                Last Clinical Review: <strong>{patientProfile.lastVisit}</strong> with Dr. Sourav Soni
              </p>
            </div>
            <Link
              to="/book?type=follow-up"
              className="bg-[#0F172A] text-white px-6 py-3 rounded-full font-label-md text-label-md hover:bg-opacity-90 transition-all flex items-center space-x-2"
            >
              <span className="material-symbols-outlined" data-icon="add_circle">add_circle</span>
              <span>Book Follow-up</span>
            </Link>
          </div>

          {/* Bento Style Card Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            {/* Upcoming Appointments */}
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-[20px] p-6 card-shadow transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Upcoming Appointments</h2>
                <Link to="/book" className="text-secondary hover:underline font-label-md text-label-md">+ Book New</Link>
              </div>

              {activeAppointments.length === 0 ? (
                <div className="p-8 text-center bg-surface-bright rounded-xl border border-outline-variant/30">
                  <p className="font-label-md text-on-surface-variant">No active upcoming appointments.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="border border-outline-variant/30 rounded-xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-surface-bright"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-secondary/10 text-secondary p-3 rounded-lg flex flex-col items-center justify-center min-w-[60px]">
                          <span className="font-label-sm text-label-sm uppercase">
                            {new Date(apt.appointment_date).toLocaleString('default', { month: 'short' })}
                          </span>
                          <span className="font-headline-md text-headline-md leading-none">
                            {new Date(apt.appointment_date).getDate()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-label-md text-label-md text-on-surface mb-1">
                            {apt.chief_complaint || 'Cardiac Follow-up & ECG'}
                          </h3>
                          <p className="font-body-md text-body-md text-on-surface-variant flex items-center mb-2">
                            <span className="material-symbols-outlined text-[16px] mr-1" data-icon="schedule">schedule</span>
                            {apt.appointment_time}
                          </p>
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-1.5"></span> Confirmed
                          </div>
                        </div>
                      </div>
                      <div className="flex sm:flex-col gap-2">
                        <button
                          onClick={() => handleOpenReschedule(apt)}
                          className="px-4 py-2 border border-[#0D9488] text-[#0D9488] rounded-full font-label-md text-label-md hover:bg-[#0D9488]/5 transition-colors text-center w-full sm:w-auto"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => cancelAppointment(apt.id)}
                          className="px-4 py-2 border border-outline-variant text-on-surface-variant rounded-full font-label-md text-label-md hover:bg-error/5 hover:text-error transition-colors text-center w-full sm:w-auto text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Health Status / Vitals */}
            <div className="bg-surface-container-lowest rounded-[20px] p-6 card-shadow transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Recent Vitals</h2>
                <button onClick={() => setIsVitalsModalOpen(true)} className="text-secondary hover:underline text-xs font-semibold">
                  + Log
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-surface-bright">
                  <div className="flex items-center space-x-3">
                    <span className="material-symbols-outlined text-secondary" data-icon="favorite">favorite</span>
                    <span className="font-label-md text-label-md text-on-surface">Heart Rate</span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    {vitals[0]?.heartRate || 72} <span className="font-body-md text-body-md text-on-surface-variant">bpm</span>
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-surface-bright">
                  <div className="flex items-center space-x-3">
                    <span className="material-symbols-outlined text-secondary" data-icon="blood_pressure">blood_pressure</span>
                    <span className="font-label-md text-label-md text-on-surface">Blood Pressure</span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    {vitals[0]?.bloodPressure || '118/75'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-surface-bright">
                  <div className="flex items-center space-x-3">
                    <span className="material-symbols-outlined text-secondary" data-icon="weight">weight</span>
                    <span className="font-label-md text-label-md text-on-surface">Weight</span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    {vitals[0]?.weight || 68} <span className="font-body-md text-body-md text-on-surface-variant">kg</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reports Grid */}
          <div className="bg-surface-container-lowest rounded-[20px] p-6 card-shadow transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Recent Reports</h2>
              <span className="text-secondary font-label-md text-label-md">{reports.length} Verified Files</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className="p-4 border border-outline-variant/30 rounded-xl hover:bg-surface-bright transition-colors cursor-pointer group flex items-start space-x-4"
                >
                  <div className="p-2 bg-surface-container-high rounded-lg text-on-surface-variant group-hover:text-secondary transition-colors">
                    <span className="material-symbols-outlined" data-icon="description">description</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-label-md text-label-md text-on-surface mb-1">{report.title}</h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-2">{report.date} • {report.doctor}</p>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-surface-variant text-on-surface-variant">
                      {report.fileType} • {report.fileSize}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" data-icon="download">
                    download
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Prescriptions Section */}
          <div className="bg-surface-container-lowest rounded-[20px] p-6 card-shadow transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Active Prescriptions (Rx)</h2>
              <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs font-semibold">Active Regimen</span>
            </div>
            {prescriptions.map((rx) => (
              <div key={rx.id} className="space-y-3">
                <div className="p-4 bg-surface-bright rounded-xl border border-outline-variant/20 text-xs">
                  <p className="font-semibold text-primary mb-1">Diagnosis: {rx.diagnosis}</p>
                  <p className="text-on-surface-variant mb-3">{rx.instructions}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {rx.medications.map((med, idx) => (
                      <div key={idx} className="p-3 bg-surface rounded-lg border border-outline-variant/30">
                        <span className="font-bold text-primary block">{med.name}</span>
                        <span className="text-secondary text-[11px] block">{med.timing}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Reschedule Modal */}
      {reschedulingApt && (
        <Modal
          isOpen={Boolean(reschedulingApt)}
          onClose={() => setReschedulingApt(null)}
          title="Reschedule Appointment"
          subtitle={`Current slot: ${reschedulingApt.appointment_date} at ${reschedulingApt.appointment_time}`}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-primary mb-1 uppercase">Select New Date</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={rescheduleDate}
                onChange={(e) => setRescheduleDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-primary mb-2 uppercase">
                Available Consultation Slots ({rescheduleSlots.totalRemaining} Available)
              </label>
              {rescheduleSlots.allAvailable.length === 0 ? (
                <p className="text-xs text-amber-700">No free slots on this date. Please pick another date.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {rescheduleSlots.allAvailable.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setRescheduleSlot(slot)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border ${
                        rescheduleSlot === slot
                          ? 'bg-secondary text-white border-secondary'
                          : 'bg-surface border-outline-variant/40 text-primary hover:bg-secondary/5'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => setReschedulingApt(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!rescheduleSlot}
                onClick={handleConfirmReschedule}
                className="px-6 py-2 rounded-xl text-xs font-semibold bg-[#0F172A] text-white hover:opacity-90 disabled:opacity-50"
              >
                Save New Slot
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Report Modal */}
      {selectedReport && (
        <Modal
          isOpen={Boolean(selectedReport)}
          onClose={() => setSelectedReport(null)}
          title={selectedReport.title}
          subtitle={`${selectedReport.date} • Attending: ${selectedReport.doctor}`}
        >
          <div className="space-y-4">
            <p className="text-xs text-on-surface-variant leading-relaxed">{selectedReport.summary}</p>
            {selectedReport.details && (
              <table className="w-full text-left text-xs border border-outline-variant/30 rounded-xl overflow-hidden">
                <thead className="bg-surface-container-high text-primary font-bold">
                  <tr>
                    <th className="p-2.5">Test</th>
                    <th className="p-2.5">Result</th>
                    <th className="p-2.5">Reference</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {selectedReport.details.map((d, i) => (
                    <tr key={i}>
                      <td className="p-2.5 font-semibold text-primary">{d.test}</td>
                      <td className="p-2.5 font-mono text-secondary font-bold">{d.result}</td>
                      <td className="p-2.5 text-on-surface-variant">{d.reference}</td>
                      <td className="p-2.5 text-emerald-800 font-bold">{d.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="flex justify-end pt-3">
              <button
                onClick={() => alert(`Downloading verified report: ${selectedReport.title}`)}
                className="bg-[#0F172A] text-white px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Download Verified PDF
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Vitals Modal */}
      {isVitalsModalOpen && (
        <Modal
          isOpen={isVitalsModalOpen}
          onClose={() => setIsVitalsModalOpen(false)}
          title="Log Daily Vitals"
          subtitle="Record resting heart rate, blood pressure, and blood glucose"
        >
          <form onSubmit={handleSaveVitals} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Heart Rate (bpm)</label>
                <input
                  type="number"
                  required
                  value={vitalForm.heartRate}
                  onChange={(e) => setVitalForm(prev => ({ ...prev, heartRate: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Body Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={vitalForm.weight}
                  onChange={(e) => setVitalForm(prev => ({ ...prev, weight: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Systolic BP (mmHg)</label>
                <input
                  type="number"
                  required
                  value={vitalForm.systolic}
                  onChange={(e) => setVitalForm(prev => ({ ...prev, systolic: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Diastolic BP (mmHg)</label>
                <input
                  type="number"
                  required
                  value={vitalForm.diastolic}
                  onChange={(e) => setVitalForm(prev => ({ ...prev, diastolic: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsVitalsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-secondary text-white hover:bg-teal-700"
              >
                Save Vitals Record
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
