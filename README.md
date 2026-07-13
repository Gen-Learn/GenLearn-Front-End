# GenLearn Front-End

> AI-powered learning platform that transforms PDF documents into structured, interactive online courses.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-proprietary-red)](#license)
[![Deployed](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://vercel.com)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Routing](#routing)
- [Architecture](#architecture)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

**GenLearn** is an AI-powered learning platform that transforms PDF documents into structured, interactive courses. Users upload a PDF, the backend processes it using AI to extract content, generate lectures, quizzes, and course structure, and the frontend presents the result as a fully-featured online course with video, transcript, notes, and quiz functionality.

### Core Workflow

```
Upload PDF → Backend AI Processing → Real-Time Progress via Socket → Course Created → Learn & Take Quizzes
```

### Live Demo

- **Frontend:** [https://genlearn.vercel.app](https://genlearn.vercel.app)
- **Backend:** Azure-hosted API

---

## Features

| Feature | Description |
|---------|-------------|
| **PDF Course Generation** | Drag-and-drop PDF upload with real-time Socket.io progress tracking through Extracting → Structuring → Creating → Finalizing stages |
| **Course Player** | Video.js-powered player with transcript tabs, lecture notes, and MCQ quizzes |
| **AI Chatbot** | Floating context-aware chatbot that answers questions about course content |
| **Gamified Profile** | XP system, level progression, daily streaks, achievement badges, and weekly activity charts |
| **Authentication** | Cookie-based auth with httpOnly tokens, automatic refresh, email verification, and password reset |
| **Onboarding Wizard** | Multi-step conditional questionnaire that adapts based on user responses |
| **Notifications** | Real-time in-app notification system for course generation completion |
| **Lecture Notes** | Create, update, and delete personal notes for each lecture |
| **Contact & Feedback** | Contact form submission and feedback listing |
| **Account Management** | Profile editing, security settings, and account deletion |

---

## Tech Stack

### Core

| Technology | Version | Purpose |
|------------|---------|---------|
| React | ^19.2.0 | UI framework with concurrent features |
| TypeScript | ^5.9.3 | Type safety with strict mode |
| Vite | ^7.2.2 | Build tool with instant HMR |

### Routing & State

| Technology | Version | Purpose |
|------------|---------|---------|
| React Router | ^7.13.0 | Client-side routing with lazy loading |
| TanStack React Query | ^5.101.2 | Server state management and caching |
| React Context | - | Global auth and notification state |

### Styling & UI

| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | ^4.2.1 | Utility-first CSS with custom theme |
| Lucide React | ^0.562.0 | Primary icon library |
| React Icons | ^5.5.0 | Supplementary icons |
| Video.js | ^8.23.7 | HTML5 video player |
| Animate.css | ^4.1.1 | CSS animations |
| AOS | ^2.3.4 | Scroll-triggered animations |

### Networking

| Technology | Version | Purpose |
|------------|---------|---------|
| Axios | ^1.13.6 | HTTP client with interceptors |
| Socket.io Client | ^4.8.3 | Real-time communication |
| React Markdown | ^10.1.0 | Markdown rendering for AI responses |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or yarn/pnpm)
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/Gen-Learn/GenLearn-Front-End.git
cd GenLearn-Front-End

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://genlearn-backend-egehcshjhabscsgu.francecentral-01.azurewebsites.net
```

### Development

```bash
npm run dev        # Start dev server on http://localhost:3001
npm run build      # Production build to dist/
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## Project Structure

```
src/
├── App.tsx                         # Root: BrowserRouter, Routes, ProtectedRoute
├── main.tsx                        # Entry: QueryClientProvider > AuthProvider > NotificationProvider > App
├── index.css                       # Tailwind v4 + custom CSS utilities
├── ScrollToTop.tsx                 # Scroll reset on route change
│
├── assets/                         # Static images, fonts, and videos
│
├── contexts/                       # React Context providers
│   ├── AuthContext.tsx             # Auth state, login/logout/register
│   └── NotificationContext.tsx     # In-app notification management
│
├── services/                       # API service layer (plain TypeScript)
│   ├── axios.ts                   # Axios instance + 401 interceptor + refresh queue
│   ├── authService.ts             # Auth endpoints (register/login/logout/refresh)
│   ├── userService.ts             # User CRUD + profile image
│   ├── courcesService.ts          # Courses list
│   ├── singleCourceService.ts     # Single course details
│   ├── lectureService.ts          # Lecture fetch + state update
│   ├── quizService.ts             # Quiz get/submit/attempts
│   ├── generateService.ts         # PDF upload + job status
│   ├── chatbotService.ts          # AI chatbot messaging
│   ├── onboardingService.ts       # Onboarding questions + submit
│   ├── statisticsService.ts       # Homepage statistics
│   ├── analyticsService.ts        # User analytics (streak, activity)
│   ├── lectureNoteService.ts      # Lecture notes CRUD
│   ├── contactService.ts          # Contact form + feedback
│   └── socket.ts                  # Socket.io singleton for generation
│
├── hooks/                          # Custom React hooks
│   ├── mutations/                  # React Query mutations
│   │   ├── useCreateContact.ts
│   │   ├── useCreateLectureNote.ts
│   │   ├── useDeleteLectureNote.ts
│   │   ├── useDeleteUser.ts
│   │   ├── useGenerationSocket.ts # Socket.io lifecycle hook
│   │   ├── useSubmitQuiz.ts
│   │   ├── useUpdateLectureNote.ts
│   │   ├── useUpdateLectureState.ts
│   │   └── useUpdateUser.ts
│   ├── queries/                    # React Query queries
│   │   ├── useGetAllCources.ts
│   │   ├── useGetAnalytics.ts
│   │   ├── useGetAttemps.ts
│   │   ├── useGetCoursesImages.ts
│   │   ├── useGetFeedback.ts
│   │   ├── useGetLecture.ts
│   │   ├── useGetLectureNotes.ts
│   │   ├── useGetOnboarding.ts
│   │   ├── useGetQuiz.ts
│   │   ├── useGetRecentCourses.ts
│   │   ├── useGetSingleCource.ts
│   │   ├── useGetStatistics.ts
│   │   ├── useGetUser.ts
│   │   └── useQuizAttempts.ts
│   └── session/                    # Session-level hooks
│       ├── useOnboardingRedirect.ts
│       └── useQuizSession.ts
│
├── types/                          # TypeScript interfaces & types
│   ├── authModel.ts
│   ├── userModel.ts
│   ├── coursesModel.ts
│   ├── quizModel.ts
│   ├── generation.ts
│   ├── onboardingModel.ts
│   ├── chatbotModel.ts
│   ├── analyticsModel.ts
│   ├── statisticsModel.ts
│   ├── notesModel.ts
│   ├── contactModel.ts
│   └── feedbackModel.ts
│
├── layout/                         # App layout components
│   ├── mainHeader.tsx             # Main nav (auth-aware, notifications, mobile drawer)
│   ├── Header.tsx                 # Simpler internal header
│   ├── Footer.tsx                 # Site footer
│   └── components/
│       └── AppIcon.tsx            # Dynamic Lucide icon renderer
│
├── components/                     # Shared/reusable components
│   ├── ProtectedRoute.tsx         # Auth guard (redirects to /login)
│   ├── AIChat/
│   │   └── Chat.tsx               # Floating AI chatbot widget
│   ├── alert/
│   │   └── alert.tsx              # Notification dropdown
│   ├── loading/
│   │   ├── LoadingStates.tsx      # Skeleton, FullPageLoader, InlineLoader
│   │   └── index.ts
│   ├── empty-states/
│   │   └── EmptyState.tsx         # Empty state illustration
│   └── ui/                         # Design system
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── Accordion.tsx
│       ├── Progress.tsx           # CircularProgress, LinearProgress
│       └── index.ts
│
├── features/                       # Feature-based page organization
│   ├── auth/
│   │   ├── SignUp.tsx
│   │   ├── LogIn.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── ResetPassword.tsx
│   │   └── VerifyEmail.tsx
│   ├── course/
│   │   ├── CoursesPage.tsx        # Course listing with search/filter/sort
│   │   ├── CourseDetailsPage.tsx  # Course overview with accordion sections
│   │   ├── main.tsx              # Course player (video, quiz, tabs)
│   │   └── components/           # 10+ sub-components
│   ├── generate/
│   │   ├── Generate.tsx          # PDF upload & generation
│   │   └── components/           # OnIdle, StageTimeline, OnComplete, OnFailed
│   ├── home/
│   │   ├── Home.tsx              # Landing page
│   │   └── components/           # Hero, Features, HowItWorks, FAQ, Testimonials
│   ├── onboarding/
│   │   └── Onboarding.tsx        # Multi-step wizard
│   └── user/
│       ├── profile.tsx           # Gamified profile with XP, streaks, badges
│       ├── ManageAccount.tsx     # Account settings
│       └── components/           # GeneralInfo, Security, DeleteAccount sections
│
└── shared/
    └── pages/                     # Static informational pages
        ├── AboutPage.tsx
        ├── ContactPage.tsx
        ├── PrivacyPage.tsx
        ├── TermsPage.tsx
        └── NotFoundPage.tsx
```

---

## Routing

| Route | Component | Protected | Description |
|-------|-----------|-----------|-------------|
| `/` | Home | No | Landing page |
| `/login` | LogIn | No | User login |
| `/signup` | SignUp | No | User registration |
| `/forgot-password` | ForgotPassword | No | Password reset request |
| `/reset-password` | ResetPassword | No | Password reset form |
| `/verify-email` | VerifyEmail | No | Email verification |
| `/about` | AboutPage | No | About GenLearn |
| `/contact` | ContactPage | No | Contact form |
| `/privacy` | PrivacyPage | No | Privacy policy |
| `/terms` | TermsPage | No | Terms of service |
| `/courses` | CoursesPage | Yes | Course listing |
| `/course-details/:id` | CourseDetailsPage | Yes | Course overview |
| `/course/:courseId/section/:sectionId/lecture/:lectureId` | CourseContent | Yes | Course player |
| `/profile` | Profile | Yes | User profile |
| `/generate` | Generate | Yes | PDF course generation |
| `/onboarding` | Onboarding | Yes | Onboarding wizard |
| `/manage-account` | ManageAccount | Yes | Account settings |

All page components are **lazy-loaded** via `React.lazy()` for code splitting.

---

## Architecture

### Design Patterns

| Pattern | Implementation |
|---------|---------------|
| **Service Layer** | All API calls abstracted into `src/services/` — testable independently of React |
| **Custom Hooks** | Data fetching, socket management, and complex state extracted into `src/hooks/` |
| **Context + Provider** | Only 2 contexts (Auth, Notifications) — no over-engineering |
| **React Query** | Server state managed via TanStack Query with cache invalidation |
| **Singleton Socket** | Module-level variables prevent duplicate Socket.io connections |
| **Compound Components** | Complex pages decomposed into focused sub-components |
| **Barrel Exports** | `index.ts` files for clean imports |
| **Protected Routes** | Auth guard wrapping protected pages with loading skeleton |

### Provider Hierarchy

```
<QueryClientProvider>        # React Query
  <AuthProvider>             # Authentication
    <NotificationProvider>    # Notifications
      <App />                # Router + Routes
    </NotificationProvider>
  </AuthProvider>
</QueryClientProvider>
```

### Data Flow

```
Component → Custom Hook → Service → Axios Instance → Backend API
                                      ↓
                              401 Interceptor → Token Refresh → Retry
```

---

## API Reference

All API calls go through a centralized Axios instance with `withCredentials: true` for cookie-based auth.

### Authentication

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/auth/register` | POST | Create account |
| `/api/v1/auth/login` | POST | Sign in |
| `/api/v1/auth/logout` | POST | Sign out |
| `/api/v1/auth/refresh` | POST | Rotate tokens |
| `/api/v1/auth/forgot-password` | POST | Request password reset |
| `/api/v1/auth/reset-password` | POST | Execute password reset |
| `/api/v1/auth/verify-email` | POST | Verify email address |
| `/api/v1/auth/resend-verification-email` | POST | Resend verification |

### Users

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/users/me` | GET | Fetch current user |
| `/api/v1/users/me` | PUT | Update profile |
| `/api/v1/users/me` | DELETE | Delete account |
| `/api/v1/users/me/profile-image` | PUT/GET/DELETE | Profile image CRUD |
| `/api/v1/users/me/analytics` | GET | User analytics (streak, activity) |

### Courses

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/courses` | GET | List all courses |
| `/api/v1/courses/:id` | GET | Get course details |
| `/api/v1/lectures/:id` | GET | Get lecture details |
| `/api/v1/lectures/analytics/:id/updatelecturestate` | PATCH | Update lecture progress |

### Quizzes

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/quizzes/:id` | GET | Get quiz questions |
| `/api/v1/quizzes/:id/submit` | POST | Submit answers |
| `/api/v1/quizzes/:id/attempts` | GET | Get attempt history |

### Generation

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/generate/test` | POST | Upload PDF |
| `/api/v1/generate/:jobId` | GET | Check generation status |
| `/api/v1/files/:filename` | GET | Download generated file |

### Other Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/chatbot/response` | POST | Send message to AI |
| `/api/v1/onboarding/questions` | GET | Get onboarding questions |
| `/api/v1/onboarding` | POST | Submit onboarding answers |
| `/api/v1/lecture-notes/:lectureId` | GET | Get lecture notes |
| `/api/v1/lecture-notes` | POST | Create lecture note |
| `/api/v1/lecture-notes/:id` | PATCH/DELETE | Update/delete lecture note |
| `/api/v1/home/statistics` | GET | Homepage statistics |
| `/api/v1/contact` | POST | Submit contact form |
| `/api/v1/contact/feedbacks` | GET | Get feedback list |

### Socket.io Events

| Namespace | Event | Direction | Purpose |
|-----------|-------|-----------|---------|
| `/generation` | `joinJob` | Client → Server | Subscribe to job |
| `/generation` | `joinedJob` | Server → Client | Subscription confirmed |
| `/generation` | `jobStatusUpdated` | Server → Client | Progress update |
| `/generation` | `jobCompleted` | Server → Client | Job complete |
| `/generation` | `jobFailed` | Server → Client | Job failed |

---

## Deployment

### Vercel (Primary)

The project is configured for Vercel deployment with SPA rewrite rules:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Build

```bash
npm run build    # Output: dist/
```

The frontend is a pure static SPA that connects to the Azure-hosted backend API.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- **TypeScript** — Strict mode enabled, all types must be defined
- **ESLint** — Run `npm run lint` before committing
- **Components** — Use functional components with hooks
- **File naming** — PascalCase for components, camelCase for utilities/hooks
- **Imports** — Use the `@/` path alias for absolute imports

---

## License

This project is proprietary software. All rights reserved.

---

> **Last Updated:** July 2026  
> **Maintainer:** [Gen-Learn](https://github.com/Gen-Learn)
