# Savage Worlds VTT Companion (Demo Sample - Unofficial Fan Product)

> A modern, full-stack companion web app for *Savage Worlds* (Adventure Edition) — built as a solo portfolio project.  
> Roll dice, resolve combat with all the “catch-all” modifiers, browse Edges/Hindrances/Powers, manage characters, and eventually play online with friends.

**Live Demo**: [https://savage-companion.vercel.app/](https://savage-companion.vercel.app/)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B67F?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

## Project Context 
 
This project was created as part of my effort to build full-stack applications using Next.js and relational databases. 
 
It focuses on implementing a structured data model using Prisma and building intuitive multi-entity management interfaces that allow for a robust Virtual Tabletop Environment experience across multiple platforms for multiple users.

## ✨ Current Status (March 2026)

This is a pet project — an **early but strengthening foundation**. I’m building the entire thing alone, one major feature at a time, while keeping the architecture clean, concise, and scalable.

**Note**: The project is **mostly backend-focused right now**. The majority of the current functionality (rules data, seeding, and engine testing) lives on the `/reference/edges` page.

### ✅ Completed / Working Draft (~50% of core game mechanics)
- **Database layer** – Full Prisma schema + models for characters, edges, hindrances, powers, races, gear, etc.
- **Seed data** – Complete JSON-based ruleset import (core rules/entities + Test Drive) with automatic seeding.
- **Authentication** – NextAuth v5 with Google + Credentials providers.
- **Theme system** – Fully selectable setting-specific themes with light/dark alternatives.
- **API foundation** – Next.js 15 App Router routes (most are basic for now; one file already supports query params).
- **Proxy / middleware layer** – Draft implementation for future real-time and third-party integrations.
- **Rules engine draft** – Roll & combat evaluator that handles the full “catch-all” modifier system (trait rolls, damage, etc.).
- **Minimal UI** – Header/footer layout + a functional **Edge Browser** (the first interactive rules viewer).

### 🚧 Still To Do (the fun part)
- Full character creator / sheet editor
- Homebrew content system (custom edges, powers, gear, settings)
- Friends list + social features
- Real-time VTT elements (shared tables, initiative tracker, map tokens)
- Dice roller UI with 3D visuals and SWADE-specific animations (Bennies, exploding die, wounded, incapacitated, etc.)
- Campaign / session management
- Mobile-responsive polish + accessibility
- Polished live demo

I’m updating this README as major milestones are hit — expect it to evolve quickly!

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router + React Server Components)
- **Language**: TypeScript
- **Database**: Prisma ORM + MySQL (easily swappable)
- **Auth**: NextAuth v5 (Google + Credentials)
- **Styling**: Tailwind CSS + custom Savage Worlds theme system
- **State**: React hooks + server actions (Zustand planned for complex client state)
- **Rules Engine**: Pure TypeScript with full Savage Worlds modifier logic
- **Deployment**: Vercel (demo sample live at [savage-companion.vercel.app](https://savage-companion.vercel.app/))

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MySQL (or any Prisma-supported DB)
- Git

### 1. Clone & install
```bash
git clone https://github.com/YOUR-USERNAME/savage-worlds-vtt-companion.git
cd savage-worlds-vtt-companion
npm install
```

### 2. Environment variables

Copy the example and fill in your keys:
```bash
cp .env.example .env.local
```

Required variables (see .env.example):
- DATABASE_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL
- Google OAuth credentials (optional but recommended)


### 3. Database
```bash
npx prisma generate
npx prisma db push          # or prisma migrate dev
npx prisma db seed          # loads Savage Worlds core entities
```

### 4. Run it
```bash
npm run dev
```

Open http://localhost:3000/reference/edges - this is currently the most complete page in the app

## 📸 Screenshots / Demo (coming soon)
![Edge Browser Example Screenshot](screenshots/edge-browser.png)
(More GIFs and screenshots of the app will be added as soon as the UI gets its first proper coat of paint and more pages are added.)

## 🗺 Roadmap & Milestones
| Milestone  | Status | Target |
| ------------- | ------------- | ------------- |
| Core rules engine + combat resolver  | Done  | Q1 2026  |
| Character sheet editor  | In progress  | Q2 2026  |
| Homebrew & content creation  | Planned  | Q2 2026  |
| Friends & real-time sessions  | Planned  | Q3 2026  |
| Polished VTT experience  | Planned  | Q4 2026  |
| Public beta / live demo  | Planned  | Start of 2027  |

## 🙌 Why This Project?
This is my capstone portfolio piece. It showcases:
  - Full-stack TypeScript architecture
  - Complex domain modeling (tabletop RPG rules)
  - Modern Next.js 15 patterns
  - Database design at scale
  - Auth + theming + real-time foundations

## 📜 License
Fan License Note: This is a free, non-commercial unofficial Savage Worlds companion. It references the Savage Worlds rules system but does not reproduce any copyrighted material from the rulebook (no copy-paste of official text). See Pinnacle Entertainment Group’s Fan License for full details: https://peginc.com/licensing/
