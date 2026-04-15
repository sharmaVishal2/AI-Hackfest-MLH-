# 🚀 AI Hackfest MLH

An AI-powered **Smart Career Assistant** that helps users generate tailored resumes, cover letters, and skill insights based on job descriptions — built for hackathons and real-world impact.

---

## 🧠 Problem Statement

Job seekers often struggle to:

* Tailor resumes for specific job roles
* Identify missing skills
* Write professional cover letters

This leads to poor ATS scores and missed opportunities.

---

## 💡 Solution

**Smart Career Assistant** solves this using AI:

👉 Input a job description + your skills
👉 Get:

* ✅ Resume Summary
* ✅ ATS-optimized Skills
* ✅ Project Descriptions
* ✅ Cover Letter

All generated instantly using AI.

---

## 🏗️ Tech Stack

### ⚙️ Backend

* Java + Spring Boot
* REST APIs
* AI Integration via Groq (LLaMA 3)

### 🎨 Frontend

* React
* Tailwind CSS

### 🗄️ Database

* MongoDB Atlas

### 🔐 Authentication

* Auth0

---

## ⚡ Features

* 🧠 AI Resume Generator
* ✉️ Cover Letter Generation
* 📊 Skill Gap Analysis
* 📜 History Tracking
* 🔐 Secure Authentication
* ⚡ Fast AI responses (Groq powered)
* 📋 Copy to Clipboard
* 📥 Download Ready Content

---

## 🧩 How It Works

1. User logs in
2. Enters job description + skills
3. Backend sends prompt to Groq API
4. AI generates structured response
5. Data stored in MongoDB
6. Results displayed in UI

---

## 📂 Project Structure

```
/backend  → Spring Boot API  
/frontend → React App  

## 🧠 AI Prompt Used

```
Act as a professional resume writer.

Given the job description:
{jobDescription}

And candidate skills:
{skills}

Generate:
1. Resume Summary
2. ATS optimized skills list
3. 2 strong project descriptions
4. A professional cover letter
```

---

## 🚀 Future Improvements

* 📄 PDF Export
* 📊 Resume Scoring System
* 🧠 AI Interview Questions Generator
* 🌐 Multi-language Support

---

## 🏆 Built For

💻 MLH Hackathon
🚀 Developers aiming to build AI-first products
