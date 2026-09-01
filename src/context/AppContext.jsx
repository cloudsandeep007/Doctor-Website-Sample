import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  getAppointmentsService,
  createAppointmentService,
  updateAppointmentService,
  isSupabaseConfigured
} from '../lib/supabase'

const AppContext = createContext(null)

const INITIAL_APPOINTMENTS = [
  {
    id: 'd0c70000-0000-0000-0000-000000000001',
    booking_reference: 'DRS-74912',
    patient_name: 'Sarah Jenkins',
    patient_email: 'sarah.jenkins@example.com',
    patient_phone: '+91 98101 23456',
    patient_age: 38,
    patient_gender: 'Female',
    consultation_type: 'in-person',
    appointment_date: '2026-09-03',
    appointment_time: '10:00 AM',
    chief_complaint: 'Cardiac Follow-up & Routine 12-Lead ECG Review',
    status: 'confirmed',
    doctor_name: 'Dr. Sourav Soni'
  }
]

const ALL_TIME_SLOTS = {
  morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'],
  evening: ['04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM']
}

export function AppProvider({ children }) {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS)
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true)

  const [patientProfile, setPatientProfile] = useState({
    id: 'pat-9482',
    name: 'Sarah Jenkins',
    code: '9482-A',
    email: 'sarah.jenkins@example.com',
    phone: '+91 98101 23456',
    age: 38,
    bloodGroup: 'O+',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    lastVisit: 'October 12, 2024'
  })

  const [vitals, setVitals] = useState([
    {
      id: 'vit-1',
      recordedAt: '2024-10-12 10:30 AM',
      heartRate: 72,
      bloodPressure: '118/75',
      systolic: 118,
      diastolic: 75,
      weight: 68,
      bloodGlucose: 96,
      oxygenSaturation: 99,
      notes: 'Normal resting sinus rhythm during in-clinic visit.'
    }
  ])

  const [reports, setReports] = useState([
    {
      id: 'rep-001',
      title: 'Comprehensive Metabolic Panel (CMP)',
      date: 'Oct 12, 2024',
      fileType: 'PDF Document',
      fileSize: '1.8 MB',
      doctor: 'Dr. Sourav Soni',
      summary: 'Electrolytes, Kidney Function (eGFR: 104), and Liver Enzymes all well within healthy reference parameters.',
      details: [
        { test: 'Fasting Blood Sugar', result: '92 mg/dL', reference: '70 - 99 mg/dL', status: 'Optimal' },
        { test: 'HbA1c', result: '5.3%', reference: '< 5.7%', status: 'Normal' },
        { test: 'Serum Creatinine', result: '0.8 mg/dL', reference: '0.6 - 1.1 mg/dL', status: 'Normal' },
        { test: 'eGFR', result: '> 90 mL/min', reference: '> 60 mL/min', status: 'Optimal' }
      ]
    },
    {
      id: 'rep-002',
      title: 'Advanced Lipid Sub-fraction Profile',
      date: 'Aug 20, 2024',
      fileType: 'PDF Document',
      fileSize: '1.2 MB',
      doctor: 'Dr. Sourav Soni',
      summary: 'ApoB and Triglyceride to HDL ratios indicate low cardiovascular atherogenic risk profile.',
      details: [
        { test: 'Total Cholesterol', result: '178 mg/dL', reference: '< 200 mg/dL', status: 'Optimal' },
        { test: 'HDL Cholesterol', result: '58 mg/dL', reference: '> 50 mg/dL', status: 'Protective' },
        { test: 'LDL Cholesterol', result: '98 mg/dL', reference: '< 100 mg/dL', status: 'Optimal' },
        { test: 'Triglycerides', result: '110 mg/dL', reference: '< 150 mg/dL', status: 'Normal' }
      ]
    },
    {
      id: 'rep-003',
      title: '12-Lead Rest ECG Trace & Interpretation',
      date: 'Aug 20, 2024',
      fileType: 'PDF Document',
      fileSize: '2.4 MB',
      doctor: 'Dr. Sourav Soni',
      summary: 'Normal Sinus Rhythm at 72 bpm. No ST-T segment elevation or conduction anomalies observed.',
      details: [
        { test: 'Resting Heart Rate', result: '72 bpm', reference: '60 - 100 bpm', status: 'Normal' },
        { test: 'PR Interval', result: '152 ms', reference: '120 - 200 ms', status: 'Normal' },
        { test: 'QRS Duration', result: '88 ms', reference: '80 - 120 ms', status: 'Normal' },
        { test: 'QTc Interval', result: '412 ms', reference: '< 450 ms', status: 'Normal' }
      ]
    }
  ])

  const [prescriptions, setPrescriptions] = useState([
    {
      id: 'rx-001',
      date: 'Oct 12, 2024',
      doctor: 'Dr. Sourav Soni, MD',
      diagnosis: 'Routine Health Optimization & Mild Vitamin D Deficiency',
      medications: [
        { name: 'Cholecalciferol (Vitamin D3) 60,000 IU', dosage: '1 Capsule', timing: 'Once weekly on Sundays (with milk)', duration: '8 Weeks' },
        { name: 'Methylcobalamin + Alpha Lipoic Acid', dosage: '1 Tablet', timing: 'Once daily after breakfast', duration: '30 Days' }
      ],
      instructions: 'Maintain 30-40 minutes of morning sun exposure. Keep daily hydration above 2.5 liters. Repeat lipid panel in 6 months.'
    }
  ])

  const [toastMessage, setToastMessage] = useState(null)

  // Load appointments from live Supabase on mount
  useEffect(() => {
    async function loadLiveAppointments() {
      try {
        const liveData = await getAppointmentsService()
        if (liveData && liveData.length > 0) {
          setAppointments(liveData)
        }
      } catch (err) {
        console.warn('Could not load live appointments:', err)
      } finally {
        setIsLoadingAppointments(false)
      }
    }
    loadLiveAppointments()
  }, [])

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() })
  }

  const hideToast = () => {
    setToastMessage(null)
  }

  const getAvailableSlotsForDate = (dateStr) => {
    if (!dateStr) return { morning: [], evening: [], allAvailable: [], totalRemaining: 0 }

    const bookedSlotsForDate = appointments
      .filter((apt) => apt.appointment_date === dateStr && apt.status !== 'cancelled')
      .map((apt) => apt.appointment_time)

    const availableMorning = ALL_TIME_SLOTS.morning.filter((slot) => !bookedSlotsForDate.includes(slot))
    const availableEvening = ALL_TIME_SLOTS.evening.filter((slot) => !bookedSlotsForDate.includes(slot))
    const allAvailable = [...availableMorning, ...availableEvening]

    return {
      morning: availableMorning,
      evening: availableEvening,
      allAvailable,
      totalRemaining: allAvailable.length
    }
  }

  const bookAppointment = async (bookingData) => {
    const currentBooked = appointments.some(
      (a) =>
        a.appointment_date === bookingData.appointment_date &&
        a.appointment_time === bookingData.appointment_time &&
        a.status !== 'cancelled'
    )

    if (currentBooked) {
      showToast('That slot has just been reserved. Please select another slot.', 'error')
      return { success: false, error: 'Slot already reserved' }
    }

    // Call Supabase service to write to database
    const result = await createAppointmentService(bookingData)

    if (result.success && result.data) {
      const confirmedRecord = result.data
      setAppointments((prev) => [confirmedRecord, ...prev])
      showToast(`Appointment saved to database! Ref: ${confirmedRecord.booking_reference}`, 'success')
      return { success: true, data: confirmedRecord }
    } else {
      showToast(result.error || 'Failed to book appointment', 'error')
      return { success: false, error: result.error }
    }
  }

  const rescheduleAppointment = async (appointmentId, newDate, newTime) => {
    await updateAppointmentService(appointmentId, {
      appointment_date: newDate,
      appointment_time: newTime,
      status: 'confirmed'
    })

    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === appointmentId) {
          return {
            ...apt,
            appointment_date: newDate,
            appointment_time: newTime,
            status: 'confirmed'
          }
        }
        return apt
      })
    )
    showToast(`Appointment successfully rescheduled to ${newDate} at ${newTime}`, 'success')
    return { success: true }
  }

  const cancelAppointment = async (appointmentId) => {
    await updateAppointmentService(appointmentId, {
      status: 'cancelled'
    })

    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === appointmentId) {
          return { ...apt, status: 'cancelled' }
        }
        return apt
      })
    )
    showToast('Appointment cancelled successfully in database.', 'info')
    return { success: true }
  }

  const addVitalRecord = (vitalData) => {
    const newRecord = {
      id: 'vit-' + Date.now(),
      recordedAt: new Date().toLocaleString(),
      ...vitalData
    }
    setVitals((prev) => [newRecord, ...prev])
    showToast('Vitals recorded successfully!', 'success')
  }

  return (
    <AppContext.Provider
      value={{
        appointments,
        isLoadingAppointments,
        patientProfile,
        setPatientProfile,
        vitals,
        addVitalRecord,
        reports,
        prescriptions,
        getAvailableSlotsForDate,
        bookAppointment,
        rescheduleAppointment,
        cancelAppointment,
        toastMessage,
        showToast,
        hideToast
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
