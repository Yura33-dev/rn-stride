# STRIDE — Task Tracker & Time Management

> 📖 **Documentation:** [Deutsch](README.md) | [English](README.en.md)

---

**STRIDE** is a mobile app for planning and tracking everyday tasks. 📋 Set priorities, schedule deadlines, and organise recurring activities.

---

## About the Project

STRIDE helps you plan your day and week: tasks are linked to dates and times, recurring events (daily, weekdays, weekly, monthly, yearly) can be configured, and progress is visualised in a weekly overview with progress bars per day.

---

## Demonstration

### Video Overview
[🎬 Watch the Video Demo](https://github.com/user-attachments/assets/538492fc-ef4c-467a-9edf-20b6d1bb758c)

### Screenshots
<details>
  <summary>Click to view screenshots (16 images)</summary>
  <p align="center">
    <img src="assets/demo/screens/signup.PNG" width="24%" />
    <img src="assets/demo/screens/signin.PNG" width="24%" />
    <img src="assets/demo/screens/1.PNG" width="24%" />
    <img src="assets/demo/screens/2.PNG" width="24%" />
    <img src="assets/demo/screens/3.PNG" width="24%" />
    <img src="assets/demo/screens/4.PNG" width="24%" />
    <img src="assets/demo/screens/5.PNG" width="24%" />
    <img src="assets/demo/screens/6.PNG" width="24%" />
    <img src="assets/demo/screens/7.PNG" width="24%" />
    <img src="assets/demo/screens/8.PNG" width="24%" />
    <img src="assets/demo/screens/9.PNG" width="24%" />
    <img src="assets/demo/screens/10.PNG" width="24%" />
    <img src="assets/demo/screens/11.PNG" width="24%" />
    <img src="assets/demo/screens/12.PNG" width="24%" />
    <img src="assets/demo/screens/13.PNG" width="24%" />
    <img src="assets/demo/screens/14.PNG" width="24%" />
  </p>
</details>

---

## Features

- **Task management** — Create, edit, delete
- **Priorities** — High, medium, low
- **Scheduling** — Date, time, repeat options (daily, weekdays, weekly, monthly, yearly)
- **Weekly overview** — Day cards with progress (completed/total)
- **Day detail** — List of active and completed tasks with status toggle
- **Swipe actions** — Edit and delete via swipe gesture
- **Calendar** — Week selection and navigation
- **Authentication** — Firebase Auth (email/password)
- **Sync** — Data stored in Firebase Firestore
- **Multi-language** — German, English, Russian (i18n + locale detection)
- **Notifications** — Toast messages (sonner-native)

---

## Technology Stack

| Category                 | Technologies                                          |
| ------------------------ | ----------------------------------------------------- |
| **Framework**            | React Native + Expo (SDK 54)                          |
| **Navigation**           | Expo Router v6 (file-based routing)                   |
| **Language**             | TypeScript                                            |
| **Styling**              | NativeWind (Tailwind for React Native)                |
| **Backend**              | Firebase (Auth, Firestore)                            |
| **Server State**         | TanStack React Query v5                               |
| **Client State**         | Zustand                                               |
| **Forms & Validation**   | React Hook Form + Zod + @hookform/resolvers           |
| **Internationalisation** | i18next + react-i18next + expo-localization           |
| **Date/Time**            | date-fns                                              |
| **Animations**           | react-native-reanimated, react-native-gesture-handler |
| **UI Toasts**            | sonner-native                                         |
| **Calendar**             | react-native-calendars                                |

---

## Project Structure

```
to-do/
├── app/                          # Routes (Expo Router)
│   ├── _layout.tsx               # Root layout (providers, stack)
│   ├── authenticate.tsx          # Login/signup
│   └── (protected)/              # Protected routes
│       ├── _layout.tsx           # Auth check
│       └── (tabs)/               # Bottom tabs
│           ├── _layout.tsx       # Tabs: Tasks, Settings
│           ├── (tasks)/          # Tasks tab
│           │   ├── index.tsx     # Weekly overview (day cards)
│           │   ├── tasks/        # Day detail view
│           │   ├── modal-task.tsx    # Modal: create/edit task
│           │   └── modal-calendar.tsx # Modal: calendar
│           └── settings/         # Settings (logout)
├── api/                          # API & React Query
│   ├── query-client.ts
│   └── services/
│       └── task.service.ts       # Task CRUD (Firestore)
├── components/                   # UI components
│   ├── ui/                       # Base elements (buttons, inputs, checkbox)
│   ├── day-card.tsx              # Day card with progress
│   ├── daily-task-item.tsx       # Task item with swipe
│   ├── task-card.tsx
│   ├── header.tsx, subheader.tsx
│   └── ...
├── config/
│   └── firebaseConfig.ts         # Firebase setup
├── constants/                    # Constants (colors, priorities)
├── hooks/                        # Custom hooks
│   ├── useAuth.ts
│   ├── useLanguage.ts
│   ├── useDayCards.ts
│   ├── useRepeatOptions.ts
│   └── queryHooks/               # React Query mutations & queries
├── i18n/                         # Internationalisation
│   ├── i18n.config.ts
│   └── locales/                  # ru.json, en.json, de.json
├── schemas/                      # Zod validation schemas
├── store/                        # Zustand stores (weekStore)
├── types/                        # TypeScript types & interfaces
├── utilities/                    # Helper functions
└── assets/                       # Icons, splash
```

---

## Installation & Running

### Requirements

- Node.js 18+
- npm or yarn
- Expo CLI (via `npx expo`)

### Steps

1. Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd to-do
npm install
```

2. Create a `.env` file in the project root (template: `env.example`):

```
API_KEY=...
AUTH_DOMAIN=...
PROJECT_ID=...
STORAGE_BUCKET=...
MESSAGING_SENDER_ID=...
APP_ID=...
```

3. Start the project:

```bash
npm start        # Expo dev server
npm run android  # Android
npm run ios      # iOS
```

---

## Implementation Notes

- **New Architecture** — enabled for React Native
- **Typed Routes** — typed routes in Expo Router
- **Edge-to-Edge** — Android edge-to-edge mode enabled
- **Path Aliases** — `@/` for imports from project root
- **Week starts Monday** — Monday as first day of week
- **Validation** — Zod with translated error messages

---

## Scripts

| Command           | Description           |
| ----------------- | --------------------- |
| `npm start`       | Start Expo dev server |
| `npm run android` | Run on Android        |
| `npm run ios`     | Run on iOS            |

---

## License

Project is private.
