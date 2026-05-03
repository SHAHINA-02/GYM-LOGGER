# GYM LOGGER — Personal Workout Tracking Application

![Status](https://img.shields.io/badge/Status-Production-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Deployed](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)

### Track Every Rep. Measure Every Gain. Built for Consistency.

**LIVE DEMO:** https://gym-logger-six.vercel.app

SCREENSHOTS
<img width="1905" height="872" alt="Screenshot 2026-05-01 134234" src="https://github.com/user-attachments/assets/682d4bde-8737-40a1-a697-7657d586ee08" />
<img width="1894" height="869" alt="Screenshot 2026-05-01 134211" src="https://github.com/user-attachments/assets/f9c4b1a4-c5d6-4784-8417-0b8d27378bc2" />
<img width="1894" height="869" alt="Screenshot 2026-05-01 134211" src="https://github.com/user-attachments/assets/c8ac7786-c6d1-4f8c-b03b-69ed58a370a1" />








---

## ABOUT

Gym Logger is a mobile-first workout tracking application that allows users to log workouts, track volume progression, browse an exercise library by muscle group, and monitor performance stats over time — all from a clean, app-like interface optimised for in-gym use.

---

## HOW IT WORKS

```
Dashboard (Stats Overview)
        ↓
Log Workout → Select Date + Duration + Exercises
        ↓
Exercise Library → Filter by Muscle Group
        ↓
Dashboard Updates → Volume Progression Chart + Recent Activity
```

---

## FEATURES

**Dashboard**
- Total Workouts, Volume (kg), Sets, Time (min) — live counters
- Volume Progression chart — updates after each logged session
- Recent Activity feed

**Log Workout**
- Date picker and duration input (minutes)
- Exercise selector with dropdown
- Add multiple exercises per session
- Finish Workout CTA to save the session

**Exercise Library**
- Search exercises by name
- Filter by muscle group: All, Chest, Back, Legs, Shoulders, Arms, Core, Cardio, Full Body
- Clean card layout per exercise

**Navigation**
- Mobile bottom navigation bar: Dashboard, Log (centre CTA), Exercises
- App-style layout optimised for phone use

---

## TECH STACK

| Layer          | Technology              |
|----------------|-------------------------|
| Framework      | Next.js 15 (App Router) |
| Language       | TypeScript              |
| Styling        | Tailwind CSS            |
| State          | React useState / Context|
| Deployment     | Vercel                  |

---

## INSTALLATION

**Prerequisites:** Node.js 18+

```bash
git clone https://github.com/YOUR_USERNAME/gym-logger.git
cd gym-logger
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## ROADMAP

- [ ] User authentication and personal profiles
- [ ] Backend persistence (workout history saved to database)
- [ ] Weekly and monthly progress charts
- [ ] Rest timer between sets
- [ ] AI-powered workout plan suggestions

---

## AUTHOR

**SHAHINA S** — Full Stack Developer & AI Engineer, UAE

- Portfolio: https://yoursite.com
- LinkedIn: https://linkedin.com/in/yourhandle
- Email: you@email.com

---

*MIT License. Open source. Built for fitness consistency.*
