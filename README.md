# Dr. Sourav Soni Medical Practice Website

A modern, responsive web application for **Dr. Sourav Soni** (MBBS, MD Medicine, Ex-AIIMS Patna), Senior Consultant Physician practicing at Ashok Rajpath, Patna, Bihar.

---

## 🌟 Key Features

- 🏥 **High-End Physician Portfolio**: Responsive hero, clinical background, AIIMS Patna credentials, and bento specialties.
- 📅 **Dynamic Appointment Booking**: Real-time slot availability filtering (Morning & Evening sessions) with direct Supabase PostgreSQL integration.
- 🚫 **Double-Booking Prevention**: Partial unique index database constraint ensuring no two patients can claim the same slot.
- 🗺️ **Interactive Google Maps**: Integrated clinic locator and turn-by-turn navigation for Ashok Rajpath, Patna.
- 📱 **Multi-Device Responsive**: Optimized for Mobile, Tablet, Desktop, and Ultrawide displays.
- 🛡️ **Protected Patient Records**: Confidential medical reports and vitals management with security access gate.

---

## 🚀 Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS
- **Routing**: React Router DOM (v6)
- **Backend & Database**: Supabase (PostgreSQL with Row Level Security)
- **Icons & Typography**: Google Fonts (Manrope, Inter) & Google Material Symbols

---

## 🛠️ Quick Start Setup

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd "dr-sourav-soni-practice"
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Run the Database Schema
In your Supabase SQL Editor, execute the SQL script in [`supabase/schema.sql`](supabase/schema.sql).

### 4. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

---

## 📄 License
© 2026 Dr. Sourav Soni Medical Practice. All rights reserved.
