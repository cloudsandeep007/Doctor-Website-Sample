import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('your-project-id')
)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const DOCTOR_ID = 'd0c70000-0000-0000-0000-000000000001'

// Helper to fetch appointments from Supabase
export async function getAppointmentsService() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true })

      if (!error && data) {
        localStorage.setItem('dr_soni_appointments', JSON.stringify(data))
        return data
      } else if (error) {
        console.error('Supabase query error:', error.message)
      }
    } catch (err) {
      console.warn('Supabase fetch exception:', err)
    }
  }

  // Fallback to local storage cache
  const stored = localStorage.getItem('dr_soni_appointments')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Error parsing stored appointments', e)
    }
  }

  return []
}

// Helper to insert a new appointment into Supabase
export async function createAppointmentService(appointmentData) {
  const bookingRef = appointmentData.booking_reference || `DRS-${Math.floor(10000 + Math.random() * 90000)}`

  // Exact matching schema payload for Supabase PostgreSQL
  const payload = {
    booking_reference: bookingRef,
    doctor_id: DOCTOR_ID,
    patient_name: appointmentData.patient_name || 'Patient',
    patient_email: appointmentData.patient_email || 'patient@example.com',
    patient_phone: appointmentData.patient_phone || '+91 98101 23456',
    patient_age: appointmentData.patient_age ? parseInt(appointmentData.patient_age, 10) : null,
    patient_gender: appointmentData.patient_gender || 'Other',
    consultation_type: appointmentData.consultation_type || 'in-person',
    appointment_date: appointmentData.appointment_date,
    appointment_time: appointmentData.appointment_time,
    status: 'confirmed',
    chief_complaint: appointmentData.chief_complaint || 'General Consultation',
    medical_notes: appointmentData.medical_notes || '',
    payment_status: 'paid'
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([payload])
        .select()

      if (!error && data && data.length > 0) {
        console.log('✅ Successfully inserted appointment into Supabase:', data[0])
        return { success: true, data: data[0] }
      } else if (error) {
        console.error('❌ Supabase insert error:', error.message, error.details)
        return { success: false, error: error.message }
      }
    } catch (err) {
      console.error('❌ Supabase insert exception:', err)
      return { success: false, error: err.message }
    }
  }

  // Fallback if Supabase not configured
  const localRecord = {
    ...payload,
    id: `apt-${Date.now()}`,
    created_at: new Date().toISOString()
  }
  return { success: true, data: localRecord }
}

// Helper to update/reschedule appointment in Supabase
export async function updateAppointmentService(id, updates) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()

      if (!error && data && data.length > 0) {
        return { success: true, data: data[0] }
      }
    } catch (err) {
      console.error('Supabase update error:', err)
    }
  }

  return { success: true }
}
