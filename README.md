# ⚗️ The Data Alchemist

> **AI-powered data management learning platform** — 7 modules, 5 weeks, one file.  
> Built by [Raja Shahnawaz Soni](https://www.linkedin.com/in/raja-shahnawaz/) · MDM Practitioner & AI-Powered Data Management

[![Live App](https://img.shields.io/badge/🌐%20Live%20App-rajamdm.github.io%2Fdata--alchemist-0284C7?style=for-the-badge)](https://rajamdm.github.io/data-alchemist)
[![License](https://img.shields.io/badge/license-Personal%20Use-6D28D9?style=for-the-badge)]()
[![Built With](https://img.shields.io/badge/Built%20With-React%20%2B%20Claude%20AI-E11D48?style=for-the-badge)]()
[![Modules](https://img.shields.io/badge/Modules-7-D97706?style=for-the-badge)]()
[![Cost Per Student](https://img.shields.io/badge/Cost%20Per%20Student-~%240.33-059669?style=for-the-badge)]()

---

## 🚀 What Is This?

The Data Alchemist is a **fully interactive, AI-powered learning platform** for data management professionals. It covers the complete data journey — from raw sources to governed, published golden records — with an AI tutor (ALCH) embedded at every step.

No backend. No database. No server costs. One HTML file. Deployed free on GitHub Pages.

---

## 🗺️ The Full Journey

```
🗄️ Data Sources  →  ⚙️ ETL/ELT  →  🔬 Data Quality  →  🏆 MDM  →  📡 Publication  →  ⚖️ Governance  →  🤖 AI-Native Future
     ✅ Done            ✅ Done          ▶ Active
```

---

## ✨ Features

### 7 Complete Modules
| # | Module | Topics |
|---|--------|--------|
| 1 | 🗄️ **Foundations of Data & Sources** | Data types, SoE/SoR/SoRef, Data Contracts, Modern Sources |
| 2 | ⚙️ **Data Integration & ETL/ELT** | ETL vs ELT vs Streaming, CDC, Error Handling, Observability |
| 3 | 🔬 **Data Quality** | 6 DQ Dimensions, Profiling, Rules, Scorecards, Cleansing |
| 4 | 🏆 **Master Data Management** | Golden Record, Survivorship, Matching, Xref Tables, Hierarchies |
| 5 | 📡 **Publication** | Channels, Batch vs Real-Time, Data Contracts, Event-Driven |
| 6 | ⚖️ **Data Governance** | Ownership, Policies, Business Glossary, Lineage, RACI |
| 7 | 🤖 **AI-Native Data Management** | Autonomous Platforms, Human-in-the-Loop, Career Evolution |

### 🤖 AI Features (powered by Claude)
- **AI Tutor** — Full conversational chat per module with real-world analogies
- **Quiz Forge** — Scenario-based questions (not boring MCQs)
- **Teach It Back** — Student explains, ALCH grades /10
- **Confession Booth** — Zero-judgment space for honest questions
- **🔍 Live Probe Session** — Deep Sonnet-powered probe scoring Honesty / Knowledge / Willingness
- **⚡ Quick Ask** — Floating AI button, always accessible, 2-sentence answers
- **Topic Deep Dives** — Click any topic for instant AI explanation inline

### 📊 Trainer Features
- Login tracking → Google Sheets (via Apps Script webhook)
- Logs: name, email, org, session ID, timezone, browser, API key hint
- No backend required — Google Sheet is your database

---

## 🏗️ Architecture

```
Student Browser
      │
      ├── index.html (entire app — React + Babel, ~450KB)
      │         │
      │         ├── Lock Screen (API key validation)
      │         ├── Journey Map (6-step pipeline visualisation)
      │         ├── Module Cards (7 expandable modules)
      │         ├── AI Chat Modals → api.anthropic.com
      │         ├── Probe Session → api.anthropic.com (Sonnet)
      │         └── Login Tracker → Google Apps Script → Google Sheets
      │
      └── GitHub Pages (free hosting, permanent URL)
```

**AI Models used:**
- `claude-haiku-4-5-20251001` — all learning features (Tutor, Quiz, Explain, Confess, Quick Ask, Topic Deep Dives)
- `claude-sonnet-4-20250514` — Probe Session only (deeper reasoning, H/K/W scoring)

**Estimated cost per student:** ~$0.33 for the full 5-week course

---

## 🎓 5-Week Training Schedule

| Week | Topic | Sunday (2–3 hrs) | Mon–Thu (1 hr each) |
|------|-------|-----------------|---------------------|
| 1 | Data Quality | DQ Dimensions + Profiling + Scorecards | Rules → Cleansing → Pipeline DQ → Reflection |
| 2 | MDM Part 1 | MDM Intro + Trust + Match/Merge | Survivorship → Validation → Hub Types → Reflection |
| 3 | MDM Part 2 | Hierarchies + Relationships + Domains | Golden Record → Xref Tables → Reflection |
| 4 | Publication | Channels + Batch vs Real-Time | Subscriptions → Lineage → Contracts → Reflection |
| 5 | Data Governance | Ownership + Policies + Glossary | Lineage → Compliance → Maturity → Final Reflection |

---

## 🛠️ Teaching Methods Baked In

| Method | What It Does |
|--------|-------------|
| 🗺️ **Wayground** | Collaborative visual journey maps |
| 🎤 **Teach It Back** | Student explains, AI grades live |
| 💥 **Chaos Dataset** | Messy data drop — no instructions |
| 🎭 **Debate Rounds** | Structured argument, no right answer |
| 🟥 **Red Card Rule** | Anyone can stop the session — rewarded |
| 🎪 **Confession Booth** | Anonymous Padlet + ALCH version |
| 📹 **Loom Record** | 2-min explanation video per student |
| ⚡ **Kahoot Blitz** | 5-question rapid fire every session |
| 🔍 **ALCH Probe** | AI-powered scenario probe (Sonnet) |

---

## 🚀 Deploy Your Own

> This is a single HTML file — no build tools, no npm, no Node.js required.

**1. Fork or download `index.html`**

**2. Edit the two required lines near the top:**
```javascript
// Your Google Apps Script tracker URL (optional — leave "" to disable)
const TRACKER_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
```

**3. Replace the avatar:**
```javascript
// Find this line and replace with your own base64 image
window.__AVATAR__ = 'data:image/png;base64,YOUR_IMAGE_HERE';
```

**4. Deploy to GitHub Pages:**
- Create a public repo → upload `index.html` → Settings → Pages → Deploy from main branch
- Done. Your URL: `https://YOUR_USERNAME.github.io/YOUR_REPO`

**5. Set up login tracking (optional):**
- Create a Google Sheet → Extensions → Apps Script → paste the tracker script → Deploy as Web App → copy URL into `TRACKER_URL`

---

## 💡 How Students Use It

1. Trainer shares the GitHub Pages URL
2. Student creates a free [Anthropic account](https://console.anthropic.com) and generates an API key (~$2–5 credit covers the full course)
3. Student enters their name, email, org, and API key on the lock screen
4. They're in — AI tutor, quizzes, probe sessions, all modules, all features

---

## 🔒 Privacy & API Keys

- API keys are **never stored** — used only in-session in the browser, never sent anywhere except directly to `api.anthropic.com`
- Login tracking only captures: name, email, org, session ID, timezone, browser, last 6 chars of key
- No passwords, no accounts, no cookies

---

## 📬 Contact

**Raja Shahnawaz Soni**  
MDM Practitioner · AI-Powered Data Management  
📧 [raja.cloudmdm@gmail.com](mailto:raja.cloudmdm@gmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/raja-shahnawaz/)  
🌐 [rajamdm.github.io](https://rajamdm.github.io)

---

*"Data is not just an asset — it's a skill. This platform exists to make that skill accessible, engaging, and actually fun to learn."*

---

⚗️ **The Data Alchemist** · © 2026 Raja Shahnawaz Soni · All Rights Reserved
