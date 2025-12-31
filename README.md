# SkillSnap

SkillSnap is a resume analysis web application that provides **automated feedback**, **ATS scoring**, and **actionable improvement tips** to help job seekers enhance their resumes for their dream roles.

---

## 🚀 Features

### 💼 Resume Feedback
Upload your resume along with a job description — SkillSnap evaluates it for:
- Content alignment with the job
- Keyword optimization
- Formatting and readability
- Grammar and tone
- Overall **ATS (Applicant Tracking System)** compatibility

### 🧾 Resume Management
- Securely upload, view, and track your past resume analyses
- Each resume stores company name, job title, and feedback summary
- Visual preview of uploaded resumes in PDF/image form

### 🔐 Authentication
- Simple **login and logout system** powered by Puter API
- Session-based authentication to protect user data

### 🧹 Data Wipe Utility
- Full control over stored data — delete all uploaded files and records instantly from the **WipeApp** page

---

## 🧩 Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | React + TypeScript + Remix |
| **UI Styling** | TailwindCSS with gradient theming |
| **Analysis Engine** | Puter SDK feedback endpoint |
| **Storage** | Puter File System (`fs` + `kv`) |
| **Routing** | React Router DOM |
| **PDF Processing** | Custom `convertPdfToImage` utility |

---

## ⚙️ How It Works

1. **Upload your resume (PDF)** along with job details.
2. The app converts your resume to an image preview.
3. The resume is evaluated and returns detailed structured feedback:
   - ATS score
   - Strengths and weaknesses
   - Keyword and formatting tips
4. You can view, review, or re-analyze your uploaded resumes anytime.

---

## 📸 App Pages Overview

| Page | Description |
|------|--------------|
| `/` | Dashboard showing uploaded resumes and feedback summaries |
| `/upload` | Upload and analyze a new resume |
| `/resume/:id` | View feedback and resume preview |
| `/auth` | Login and logout functionality |
| `/wipe` | Wipe all stored resume data |

---

## 🧠 Key Components

- **Navbar** – Top navigation with quick access links.
- **FileUploader** – Handles PDF uploads and drag-and-drop functionality.
- **Summary, ATS, and Details** – Display structured feedback.
- **WipeApp** – Full system data reset tool.
- **PuterStore** – Central store for authentication, storage, and feedback calls.

---

## 🪄 Scripts

| Command | Description |
|----------|--------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Start the built server |

---

## 🌈 Design Philosophy

SkillSnap uses a **modern gradient-driven UI** built with TailwindCSS:
- Purple-to-black gradient backgrounds
- Animated loading states (e.g., `resume-scan.gif`)
- Consistent rounded cards and glowing borders
- Mobile-friendly responsive layout

---
