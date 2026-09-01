-- ==============================================================================
-- SUPABASE POSTGRESQL SCHEMA FOR DR. SOURAV SONI DIGITAL PRACTICE (PATNA)
-- ==============================================================================

-- 1. DOCTORS TABLE
CREATE TABLE IF NOT EXISTS public.doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    qualification TEXT NOT NULL,
    specialty TEXT NOT NULL,
    bio TEXT,
    years_experience INT DEFAULT 15,
    alumni TEXT DEFAULT 'AIIMS Patna',
    avatar_url TEXT,
    consultation_fee_in_person NUMERIC(10,2) DEFAULT 1000.00,
    consultation_fee_video NUMERIC(10,2) DEFAULT 800.00,
    consultation_fee_followup NUMERIC(10,2) DEFAULT 500.00,
    clinic_address TEXT DEFAULT 'Ashok Rajpath, Patna, Bihar – 800004',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. PATIENTS TABLE
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    patient_code TEXT UNIQUE NOT NULL, -- e.g., 'ID: 9482-A'
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    age INT,
    gender TEXT,
    blood_group TEXT,
    address TEXT,
    emergency_contact TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference TEXT UNIQUE NOT NULL, -- e.g., 'DRS-89412'
    doctor_id UUID REFERENCES public.doctors(id) ON DELETE RESTRICT,
    patient_id UUID REFERENCES public.patients(id) ON DELETE SET NULL,
    patient_name TEXT NOT NULL,
    patient_email TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    patient_age INT,
    patient_gender TEXT,
    consultation_type TEXT NOT NULL CHECK (consultation_type IN ('in-person', 'video', 'follow-up')),
    appointment_date DATE NOT NULL,
    appointment_time TEXT NOT NULL, -- e.g., '10:00 AM'
    status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'rescheduled', 'completed', 'cancelled')),
    chief_complaint TEXT,
    medical_notes TEXT,
    payment_status TEXT NOT NULL DEFAULT 'paid' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Prevent double-booking for the same active slot via a PostgreSQL Partial Unique Index
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_active_slot 
ON public.appointments (doctor_id, appointment_date, appointment_time) 
WHERE (status != 'cancelled');

-- Index for speedy slot availability lookups
CREATE INDEX IF NOT EXISTS idx_appointments_date_time ON public.appointments(appointment_date, appointment_time, status);

-- 4. PATIENT VITALS TABLE
CREATE TABLE IF NOT EXISTS public.patient_vitals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    recorded_at TIMESTAMPTZ DEFAULT now(),
    heart_rate INT, -- bpm
    systolic_bp INT, -- mmHg
    diastolic_bp INT, -- mmHg
    weight_kg NUMERIC(5,2), -- kg
    blood_glucose_mg_dl INT, -- mg/dL
    oxygen_saturation INT, -- %
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. MEDICAL REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.medical_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Blood Panel', 'Cardiology', 'Radiology', 'Pathology'
    report_date DATE NOT NULL,
    doctor_name TEXT DEFAULT 'Dr. Sourav Soni',
    facility TEXT DEFAULT 'Ashok Rajpath Diagnostic Lab & Clinic',
    file_name TEXT,
    file_size TEXT,
    file_url TEXT,
    summary_findings TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. PRESCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
    doctor_name TEXT DEFAULT 'Dr. Sourav Soni',
    prescribed_date DATE DEFAULT CURRENT_DATE,
    diagnosis TEXT NOT NULL,
    medications JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of {name, dosage, timing, duration}
    general_advice TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. HEALTH BLOG ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.health_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    read_time TEXT DEFAULT '5 min read',
    published_at DATE DEFAULT CURRENT_DATE,
    author_name TEXT DEFAULT 'Dr. Sourav Soni'
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_articles ENABLE ROW LEVEL SECURITY;

-- Public can read doctors & health articles
CREATE POLICY "Public read doctors" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Public read articles" ON public.health_articles FOR SELECT USING (true);

-- Public can insert appointments (e.g. patients booking online)
CREATE POLICY "Public create appointment" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read booked slots" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Public update own appointment" ON public.appointments FOR UPDATE USING (true);

-- Patients policies
CREATE POLICY "Allow patient access" ON public.patients FOR ALL USING (true);
CREATE POLICY "Allow patient vitals access" ON public.patient_vitals FOR ALL USING (true);
CREATE POLICY "Allow patient reports access" ON public.medical_reports FOR ALL USING (true);
CREATE POLICY "Allow patient prescriptions access" ON public.prescriptions FOR ALL USING (true);

-- ==============================================================================
-- SEED DATA
-- ==============================================================================

-- Insert Doctor
INSERT INTO public.doctors (id, full_name, qualification, specialty, bio, years_experience, alumni, avatar_url, clinic_address)
VALUES (
    'd0c70000-0000-0000-0000-000000000001',
    'Dr. Sourav Soni',
    'MBBS, MD (Internal Medicine)',
    'Senior Consultant Physician',
    'With extensive clinical training at AIIMS Patna and years of consulting practice, Dr. Sourav Soni provides evidence-based patient-centered medical care at Ashok Rajpath, Patna.',
    15,
    'AIIMS Patna Alumni',
    '/images/dr-sourav-soni-hero.jpg',
    'Ashok Rajpath, Patna, Bihar – 800004'
) ON CONFLICT (id) DO NOTHING;

-- Insert Demo Patient: Sarah Jenkins
INSERT INTO public.patients (id, patient_code, full_name, email, phone, age, gender, blood_group, address)
VALUES (
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    '9482-A',
    'Sarah Jenkins',
    'sarah.jenkins@example.com',
    '+91 98101 23456',
    38,
    'Female',
    'O+',
    'Patna, Bihar'
) ON CONFLICT (id) DO NOTHING;

-- Insert Existing Appointment
INSERT INTO public.appointments (
    booking_reference, doctor_id, patient_id, patient_name, patient_email, patient_phone,
    patient_age, patient_gender, consultation_type, appointment_date, appointment_time, status, chief_complaint
) VALUES (
    'DRS-74912',
    'd0c70000-0000-0000-0000-000000000001',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Sarah Jenkins',
    'sarah.jenkins@example.com',
    '+91 98101 23456',
    38,
    'Female',
    'in-person',
    CURRENT_DATE + INTERVAL '1 day',
    '10:00 AM',
    'confirmed',
    'Cardiac Follow-up & Routine 12-Lead ECG Review'
) ON CONFLICT (booking_reference) DO NOTHING;

-- Insert Recent Vitals
INSERT INTO public.patient_vitals (patient_id, heart_rate, systolic_bp, diastolic_bp, weight_kg, blood_glucose_mg_dl, oxygen_saturation, notes)
VALUES 
    ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 72, 118, 75, 68.0, 96, 99, 'Optimal resting vitals during clinic checkup'),
    ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 75, 122, 78, 68.4, 102, 98, 'Routine follow-up vitals');

-- Insert Medical Reports
INSERT INTO public.medical_reports (patient_id, title, category, report_date, file_name, file_size, summary_findings)
VALUES 
    ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Comprehensive Metabolic Panel (CMP)', 'Blood Panel', CURRENT_DATE - INTERVAL '15 days', 'CMP_Report.pdf', '1.8 MB', 'Normal fasting glucose and renal markers (eGFR > 90).'),
    ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Advanced Lipid Sub-fraction Profile', 'Cardiology', CURRENT_DATE - INTERVAL '30 days', 'Lipid_Panel.pdf', '1.2 MB', 'Normal ApoB and protective HDL levels; low cardiovascular atherogenic risk.');
