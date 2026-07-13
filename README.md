# GenLearn Front-End — Project Book

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack & Rationale](#2-technology-stack--rationale)
3. [Project Structure](#3-project-structure)
4. [Features in Depth](#4-features-in-depth)
   - 4.1 [Authentication (Cookie-Based)](#41-authentication-cookie-based)
   - 4.2 [Real-Time Socket.io](#42-real-time-socketio)
   - 4.3 [AI Chatbot](#43-ai-chatbot)
   - 4.4 [PDF Course Generation](#44-pdf-course-generation)
   - 4.5 [Course Management System](#45-course-management-system)
   - 4.6 [Gamified User Profile](#46-gamified-user-profile)
   - 4.7 [Notifications System](#47-notifications-system)
   - 4.8 [Onboarding Wizard](#48-onboarding-wizard)
   - 4.9 [Email Verification](#49-email-verification)
5. [Architecture & Design Patterns](#5-architecture--design-patterns)
6. [Pros & Cons](#6-pros--cons)
7. [Security Considerations](#7-security-considerations)
8. [Deployment & DevOps](#8-deployment--devops)
9. [API Reference](#9-api-reference)

---

## 1. Project Overview

**GenLearn** is an AI-powered learning platform that transforms PDF documents into structured, interactive courses. Users upload a PDF, the backend processes it using AI (LLM) to extract content, generate lectures, quizzes, and course structure, and the frontend presents the result as a fully-featured online course with video, transcript, notes, and quiz functionality.

### Core Workflow

```
Upload PDF → Backend AI Processing → Real-Time Progress via Socket → Course Created → Learn & Take Quizzes
```

The platform includes full authentication (register, login, email verification, password reset), a gamified profile system (XP, streaks, badges), an AI chatbot for answering questions about course content, and a notification system.

---

## 2. Technology Stack & Rationale

### Core Framework

| Technology | Version | Why It Was Chosen |
|---|---|---|
| **React** | ^19.2.0 | Latest React with improved concurrent features, server components support, and the new compiler. Industry standard with massive ecosystem. |
| **TypeScript** | ^5.9.3 | Type safety, better IDE support, self-documenting code, catch bugs at compile time. Strict mode enabled. |
| **Vite** | ^7.2.2 | Fastest build tool. Instant HMR (Hot Module Replacement), fast cold starts, native ESM. Replaced Create React App. |

### Routing

| Technology | Why |
|---|---|
| **React Router v7** | Standard routing library. Supports loaders/actions, nested routes, and layout routes. Chosen for maturity and familiarity. |

### UI & Styling

| Technology | Version | Why It Was Chosen |
|---|---|---|
| **Tailwind CSS** | ^4.2.1 | Utility-first CSS. Fast prototyping, consistent design system, small bundle with purging. v4 has the new CSS-first configuration. |
| **Lucide React** | ^0.562.0 | Lightweight, consistent icon set. Tree-shakeable. |
| **React Icons** | ^5.5.0 | Backup icon library for icons not available in Lucide. |
| **Video.js** | ^8.23.7 | Battle-tested HTML5 video player with plugin ecosystem, custom skins, and accessibility support. |
| **Animate.css** | ^4.1.1 | Ready-made CSS animations for landing page elements. |
| **AOS (Animate On Scroll)** | ^2.3.4 | Scroll-triggered animations for the landing page. |

### Networking & Real-Time

| Technology | Version | Why It Was Chosen |
|---|---|---|
| **Axios** | ^1.13.6 | Promise-based HTTP client with interceptors (critical for token refresh), request/response transformation, and wide browser support. |
| **Socket.io Client** | ^4.8.3 | Real-time, bidirectional communication for course generation progress. Handles reconnection, rooms, and fallback to long-polling automatically. |

### AI & Content Rendering

| Technology | Why |
|---|---|
| **React Markdown** | Renders AI chatbot responses as formatted Markdown (code blocks, lists, headings). |
| **Remark GFM** | GitHub Flavored Markdown extension for tables, task lists, strikethrough, etc. |

### Development Tooling

| Technology | Why |
|---|---|
| **ESLint** | Code quality and consistency enforcement. |
| **PostCSS / Autoprefixer** | CSS processing and vendor prefix automation. |

---

## 3. Project Structure

```
├── .env                          # Backend API URL (Azure)
├── .gitignore
├── eslint.config.js              # ESLint flat config
├── index.html                    # Vite entry HTML
├── package.json
├── tailwind.config.js            # Tailwind theme (colors, animations, fonts)
├── tsconfig.json                 # TypeScript config (strict, path aliases)
├── tsconfig.node.json            # TS config for vite.config.ts
├── vercel.json                   # Vercel SPA rewrite rules
├── vite.config.ts                # Vite config (React, Tailwind, port 3001, @ alias)
│
├── public/                       # Static assets (served as-is)
│
├── src/
│   ├── App.tsx                   # Root: BrowserRouter, Routes, Layout, AIChatbot
│   ├── main.tsx                  # Entry: AuthProvider > NotificationProvider > App
│   ├── index.css                 # Global styles (Tailwind, custom utilities)
│   ├── ScrollToTop.tsx           # Scroll reset on route change
│   │
│   ├── assets/                   # Static images & videos
│   │
│   ├── contexts/                 # React Context providers
│   │   ├── AuthContext.tsx       # Auth state & actions (user, login, register, logout)
│   │   └── NotificationContext.tsx # In-app notifications
│   │
│   ├── hooks/                    # Custom React hooks (data fetching, UI, socket)
│   │   ├── useGenerationSocket.ts # Socket.io hook for generation progress
│   │   ├── useGetAllCources.ts   # Fetch all courses
│   │   ├── useGetSingleCource.ts # Fetch single course
│   │   ├── useGetLecture.ts      # Fetch single lecture
│   │   ├── useGetQuiz.ts         # Fetch quiz + manage session state
│   │   ├── useSubmitQuiz.ts      # Submit quiz answers
│   │   ├── useGetAttemps.ts      # Fetch quiz attempts
│   │   ├── useGetUser.ts         # Fetch user data independently
│   │   ├── useUpdateUser.ts      # Update user profile
│   │   ├── useDeleteUser.ts      # Delete account
│   │   ├── useGetCoursesImages.ts # Fetch course images as blobs
│   │   ├── useOnboarding.ts      # Fetch onboarding questions
│   │   ├── useOnboardingRedirect.ts # Redirect if onboarding pending
│   │
│   ├── services/                 # API service layer
│   │   ├── axios.ts              # Axios instance with interceptors & refresh queue
│   │   ├── authService.ts        # Auth endpoints
│   │   ├── userService.ts        # User CRUD & profile image
│   │   ├── courcesService.ts     # Courses list
│   │   ├── singleCourceService.ts # Single course
│   │   ├── lectureService.ts     # Lectures
│   │   ├── quizService.ts        # Quiz & attempts
│   │   ├── generateService.ts    # PDF upload & job status
│   │   ├── chatbotService.ts     # AI chatbot
│   │   ├── onboardingService.ts  # Onboarding questions & submit
│   │   └── socket.ts             # Socket.io client singleton
│   │
│   ├── types/                    # TypeScript interfaces & types
│   │   ├── authModel.ts
│   │   ├── userModel.ts
│   │   ├── coursesModel.ts
│   │   ├── quizModel.ts
│   │   ├── generation.ts
│   │   ├── onboardingModel.ts
│   │   └── chatbotModel.ts
│   │
│   ├── layout/                   # App layout components
│   │   ├── mainHeader.tsx        # Main nav header (auth-aware, notifications)
│   │   ├── Header.tsx            # Simpler internal header
│   │   ├── Footer.tsx            # Site footer
│   │   └── components/
│   │       └── AppIcon.tsx       # Dynamic Lucide icon renderer
│   │
│   ├── pages/                    # Route page components
│   │   ├── Home/                 # Landing page (Hero, Features, FAQ, etc.)
│   │   ├── SignUp/               # Registration
│   │   ├── LogIn/                # Login
│   │   ├── ForgotPassword/       # Forgot password
│   │   ├── ResetPassword/        # Reset password
│   │   ├── VerifyEmail/          # Email verification
│   │   ├── Onboarding/           # Multi-step onboarding wizard
│   │   ├── Courses/              # Course listing
│   │   ├── CourseDetails/        # Course overview
│   │   ├── CourseContent/        # Course player (video, quiz, transcript)
│   │   ├── Generate/             # PDF upload & generation
│   │   ├── profile/              # Gamified user profile
│   │   └── ManageAccount/        # Account settings
│   │
│   ├── static/                   # Static informational pages
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── PrivacyPage.tsx
│   │   ├── TermsPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   └── components/               # Shared/reusable components
│       ├── AIChat/               # AI chatbot widget
│       ├── alert/                # Notification dropdown
│       ├── Button/               # (Legacy) Button
│       ├── EmailInput/           # Reusable email input with validation
│       ├── Input/                # Generic input component
│       ├── ui/                   # Design system (Button, Card, Badge, Accordion, Progress)
│       ├── loading/              # Loading skeletons
│       └── empty-states/         # Empty state illustrations
```

### Structure Philosophy

- **Feature-based page organization** — Each page is a folder with its own `components/`, `utils/`, and sometimes `style.css`.
- **Service layer isolation** — All API calls live in `services/`, independent of React.
- **Custom hooks for stateful logic** — Data fetching, socket management, and complex state are extracted into hooks.
- **Shared UI components** — The `components/ui/` folder forms a mini design system.
- **Barrel exports** — `index.ts` files clean up imports throughout the project.

---

## 4. Features in Depth

### 4.1 Authentication (Cookie-Based)

**Why cookies instead of localStorage?** Security. httpOnly cookies cannot be accessed by JavaScript, making them immune to XSS attacks that could steal tokens from `localStorage`. This is the industry best practice for web authentication.

#### How It Works

1. **Login/Register** — User submits credentials. Backend responds with `Set-Cookie` headers containing `accessToken` and `refreshToken` as httpOnly cookies.
2. **Session Rehydration** — On app mount, `AuthContext` calls `GET /api/v1/users/me`. The browser automatically sends the httpOnly cookie with the request (because `withCredentials: true` is set on the Axios instance). If the user is logged in, the backend returns user data.
3. **Automatic Token Refresh** — The Axios response interceptor catches 401 errors:
   - It queues the failed request.
   - It calls `POST /api/v1/auth/refresh` (only once, even if multiple requests fail simultaneously).
   - Once refreshed, all queued requests are retried with the new cookie.
4. **Logout** — Calls `POST /api/v1/auth/logout` to clear cookies server-side, then clears local state.

```typescript
// src/services/axios.ts — Key concept: request queue for refresh
let isRefreshing = false;
let failedQueue: QueueEntry[] = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request while another refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }
      isRefreshing = true;
      originalRequest._retry = true;
      await authService.refresh(); // Rotates cookies
      isRefreshing = false;
      // Retry all queued requests
      failedQueue.forEach(({ resolve, config }) => resolve(api(config)));
      failedQueue = [];
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
```

**Security features:**
- Zero token storage in `localStorage` or `sessionStorage`.
- Public page awareness — no redirect to login on auth pages during refresh failure.
- `withCredentials: true` on all requests.

### 4.2 Real-Time Socket.io

Used exclusively for the PDF course generation pipeline. When a user uploads a PDF, the backend processes it (AI extraction, structuring, content generation) — this takes time. Socket.io provides real-time progress updates.

#### Architecture

```typescript
// src/services/socket.ts — Singleton pattern
let socket: Socket | null = null;

export const connectSocket = (token?: string) => {
  socket = io(`${API_BASE_URL}/generation`, {
    path: "/socket.io",
    transports: ["websocket", "polling"],
  });
};

export const joinJob = (jobId: string, callbacks) => {
  socket?.emit("joinJob", { jobId });
  socket?.on("jobStatusUpdated", callbacks.onStatus);
  socket?.on("jobCompleted", callbacks.onComplete);
  socket?.on("jobFailed", callbacks.onFailed);
};
```

**Events:**
| Event | Direction | Purpose |
|---|---|---|
| `joinJob` | Client → Server | Subscribe to a specific job's updates |
| `joinedJob` | Server → Client | Confirms subscription |
| `jobStatusUpdated` | Server → Client | Progress through pipeline stages |
| `jobCompleted` | Server → Client | Job finished, contains course data |
| `jobFailed` | Server → Client | Error occurred |

**Why Socket.io instead of polling?**
- No constant HTTP polling overhead.
- Instant updates when stages complete.
- Built-in reconnection handling.
- Room-based scoping (each user only gets their own job updates).

### 4.3 AI Chatbot

A floating chat widget (bottom-left corner) available on course pages.

**Features:**
- Sends full conversation history to the backend for context-aware responses.
- Supports quick-action prompts: "Explain this concept", "Summarize lecture", "Give me a quiz question".
- Course-aware: sends `courseId` so the AI responds in context.
- Markdown rendering: code blocks, lists, headings in responses.

```typescript
// Architecture
const [messages, setMessages] = useState<ChatbotMessage[]>([]);

const sendMessage = async (text: string) => {
  const response = await chatbotService.sendMessage({
    messages: [...messages, { role: "user", content: text }],
    courseId: currentCourseId,
  });
  setMessages([...messages, userMsg, response.answer]);
};
```

### 4.4 PDF Course Generation

The core feature that sets GenLearn apart.

**Flow:**
1. User drags-and-drops a PDF onto the upload area (`OnIdle` component).
2. The file is sent as `FormData` to `POST /api/v1/generate/test`.
3. The backend returns a `jobId` immediately.
4. The frontend connects to Socket.io and emits `joinJob` with the job ID.
5. The `StageTimeline` component visualizes progress through stages:
   ```
   Extracting → Structuring → Creating → Finalizing → Completed
   ```
6. On completion, an in-app notification is triggered.
7. User clicks "Start Course" to navigate to the generated course.

**StageTimeline Component:**
- Each stage has an icon, label, and status indicator.
- Current stage pulses, completed stages show checkmarks, pending stages are dimmed.
- Animated transitions between stages.

### 4.5 Course Management System

#### Course Listing (`/courses`)
- Grid/List toggle views.
- Search by title.
- Filter by status: All, Not Started, In Progress, Completed.
- Sort by: Recently Updated, Title, Progress, Duration.
- Course cards show title, description, progress bar, and image.

#### Course Details (`/course-details/:id`)
- Hero card with course title, description, and metadata.
- Accordion-based section browser — expand sections to see lectures.
- Direct access to any lecture or quiz.

#### Course Player (`/course/:courseId/section/:sectionId/lecture/:lectureId`)
The most complex page in the app:

```
┌──────────────────────────────────────────┐
│  CourseSidebar (collapsible)             │
│  ┌──────────────────┐ ┌────────────────┐│
│  │ Section 1        │ │ ContentPlayerArea││
│  │  ├─ Lecture 1    │ │ ┌──────────────┐││
│  │  ├─ Lecture 2    │ │ │ Video (video.js)││
│  │  └─ Quiz 1       │ │ └──────────────┘││
│  │ Section 2        │ │ ┌──────────────┐││
│  │  ├─ Lecture 3    │ │ │ LectureTabs  │││
│  │  └─ Quiz 2       │ │ │ Transcript   │││
│  └──────────────────┘ │ │ Quiz         │││
│                        │ └──────────────┘││
│                        └────────────────┘│
└──────────────────────────────────────────┘
```

**Features:**
- **Video.js player** — Supports multiple video formats, custom controls, seek.
- **Transcript tabs** — Click timestamps to seek in the video.
- **Quiz taking** — MCQ format, answer selection, submission, review.
- **Attempt history** — View past attempts with scores.

### 4.6 Gamified User Profile

The profile page (`/profile`) turns learning into a game:

- **XP System** — Earn experience points for completing lectures and quizzes.
- **Level Progression** — Visual level indicator with progress to next level.
- **Daily Streaks** — Consecutive days of learning. Visual streak counter.
- **Achievement Badges** — Badges for milestones (first course, perfect quiz, 7-day streak, etc.).
- **Weekly Activity Chart** — Bar chart showing daily activity for the past 7 days.
- **Learning Statistics** — Total hours, lectures watched, quizzes passed.
- **Recent Courses** — List of recently accessed courses with progress.

### 4.7 Notifications System

An in-app notification system built with React Context:

- **NotificationContext** — Manages an array of notifications in memory.
- **Add on Generation Complete** — When a course finishes generating, a notification is created.
- **Dropdown Panel** — Accessible from the bell icon in `MainHeader`.
- **Unread Badge** — Shows count of unread notifications.
- **Link Navigation** — Clicking a notification navigates to the relevant course content.
- **Mark as Read** — Individual or bulk mark-as-read.

### 4.8 Onboarding Wizard

After registration, users are guided through a multi-step onboarding process:

- **Fetches questions** from `GET /api/v1/onboarding/questions`.
- **Conditional Logic** — Questions adapt based on previous answers (e.g., field-of-study questions only if user selects "Student").
- **Question Types** — Single-select and multi-select.
- **Collapsible Lists** — Long option lists are collapsed to avoid overwhelming the user.
- **Skip Capability** — Users can skip the onboarding and complete it later.
- **Redirect Guard** — `useOnboardingRedirect` hook checks `user.onboardingStatus` and redirects to `/onboarding` if pending.

### 4.9 Email Verification

- **Verification Link** — User receives an email with a link containing `userId` and `token` query parameters.
- **Verify Page** — `/verify-email?userId=X&token=Y` sends a POST to the backend to confirm the email.
- **Resend Capability** — If the email was lost, user can request a re-send from the login page.
- **Backend Validation** — The backend validates the token and marks the user as verified.

---

## 5. Architecture & Design Patterns

### 5.1 Service Layer Pattern

All API communication is abstracted into service files in `src/services/`. These are plain TypeScript modules (not React components) that export functions.

**Benefits:**
- Testable independently of React.
- Replaceable — swap Axios for fetch without touching components.
- Centralized configuration (base URL, headers, interceptors).

```
Component → Custom Hook → Service → Axios Instance → Backend
```

### 5.2 Custom Hooks Pattern

Every non-trivial operation is extracted into a custom hook. This keeps page components clean and focused on rendering.

**Examples:**
- `useGetAllCources` — Fetches courses, manages loading/error states.
- `useGetQuiz` — Fetches quiz data AND manages answer selection state.
- `useGenerationSocket` — Wraps socket connection lifecycle.
- `useOnboardingRedirect` — Encapsulates redirect logic as a side effect.

### 5.3 Context + Provider State Management

No external state management library (no Redux, Zustand, or Jotai). Instead:

- **AuthContext** — The single piece of truly global state (user authentication).
- **NotificationContext** — In-app notifications.
- **All other state** is local (`useState`, `useReducer`) or derived from custom hooks.

**Why no Redux?** The app's state needs are simple enough that React Context + hooks suffice. Adding Redux would be unnecessary complexity.

### 5.4 Singleton Socket Pattern

The Socket.io connection (`src/services/socket.ts`) uses module-level variables to maintain a single connection instance:

```typescript
let socket: Socket | null = null;
let currentCallbacks: SocketCallbacks | null = null;
let currentJobId: string | null = null;
```

This prevents duplicate connections when the user visits the Generate page multiple times.

### 5.5 Compound Component Pattern

Complex pages are decomposed into focused sub-components:

- **Generate page:** `OnIdle` → `StageTimeline` → `OnComplete` / `OnFailed`
- **CourseContent page:** `CourseSidebar` + `ContentPlayerArea` + `LectureTabs` + `Video` + `Quiz`
- **Home page:** `Hero` + `Features` + `Testimonials` + `FAQ` + etc.

### 5.6 Barrel Export Pattern

Every module folder has an `index.ts` that re-exports its contents, enabling clean imports:

```typescript
// Instead of:
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

// You can write:
import { Button, Card } from "@/components/ui";
```

### 5.7 Error Boundary (Axios Queue)

The 401 interceptor implements a producer-consumer queue pattern. When multiple API calls fail simultaneously with 401, only one refresh request is made, and all others are queued and retried after the refresh completes.

---

## 6. Pros & Cons

### Pros ✅

| Aspect | Why It's Good |
|---|---|
| **Security** | httpOnly cookie auth eliminates XSS token theft. No localStorage tokens. |
| **Real-Time UX** | Socket.io provides smooth generation progress instead of loading spinners. |
| **Code Organization** | Clear separation: services / hooks / pages / components. Easy to navigate. |
| **TypeScript** | Full type coverage across the entire codebase. Catches errors at compile time. |
| **Modern Stack** | React 19, Vite 7, Tailwind v4, TypeScript 5.9 — all latest versions. |
| **No Over-Engineering** | Uses Context + hooks instead of Redux for simple state needs. Right-sized architecture. |
| **Reusability** | Custom hooks and UI components are well-factored and reusable across pages. |
| **User Experience** | Gamification (XP, streaks, badges), drag-and-drop upload, real-time progress, AI chatbot. |
| **Design System** | Consistent UI components (Button, Card, Badge, Accordion, Progress) with themed variants. |
| **Accessibility** | video.js has built-in accessibility; semantic HTML structure. |

---

## 7. Security Considerations

### Current Security Posture

| Measure | Status |
|---|---|
| httpOnly cookies for tokens | ✅ Implemented |
| Automatic token refresh | ✅ Implemented |
| XSS protection (no localStorage tokens) | ✅ Implemented |
| `withCredentials: true` | ✅ Implemented |
| Email verification | ✅ Implemented |
| Password reset with secure tokens | ✅ Implemented |
| Onboarding redirect guard | ✅ Implemented |

### Recommendations

1. **Add CSRF protection** — If the backend supports it, implement double-submit cookie pattern or CSRF tokens.
2. **Rate limiting awareness** — The frontend should handle 429 (Too Many Requests) gracefully.
3. **Content Security Policy (CSP)** — Add CSP headers via meta tag or server config.
4. **Input sanitization** — Ensure user inputs (especially in chatbot messages) are sanitized before rendering.
5. **API key exposure** — Verify no API keys or secrets are in the frontend code (only the backend URL is in `.env`).

---

## 8. Deployment & DevOps

### Current Setup

| Platform | Config |
|---|---|
| **Vercel** | Primary deployment. `vercel.json` rewrites all routes to `index.html` for SPA support. |
| **GitHub Pages** | Alternative via `gh-pages` npm script. |

### Environment

```env
VITE_API_BASE_URL=https://genlearn-backend-egehcshjhabscsgu.francecentral-01.azurewebsites.net
```

The backend runs on Azure. The frontend is a pure static SPA that connects to the backend API.

### Build & Run

```bash
npm install        # Install dependencies
npm run dev        # Development server on port 3001
npm run build      # Production build to dist/
npm run preview    # Preview production build
npm run lint       # ESLint check
```

---

## 9. API Reference

All API calls are proxied through the Axios instance at `src/services/axios.ts`.

### Authentication

| Endpoint | Method | Service | Purpose |
|---|---|---|---|
| `/api/v1/auth/register` | POST | `authService.register` | Create account |
| `/api/v1/auth/login` | POST | `authService.login` | Sign in |
| `/api/v1/auth/logout` | POST | `authService.logout` | Sign out |
| `/api/v1/auth/refresh` | POST | `authService.refresh` | Rotate tokens |
| `/api/v1/auth/forgot-password` | POST | `authService.forgotPassword` | Request reset |
| `/api/v1/auth/reset-password` | POST | `authService.resetPassword` | Execute reset |
| `/api/v1/auth/verify-email` | POST | `authService.verifyEmail` | Verify email |
| `/api/v1/auth/resend-verification-email` | POST | `authService.resendVerification` | Resend verification |

### User Management

| Endpoint | Method | Service | Purpose |
|---|---|---|---|
| `/api/v1/users/me` | GET | `userService.getCurrentUser` | Fetch current user |
| `/api/v1/users/me` | PUT | `userService.updateUser` | Update profile |
| `/api/v1/users/me` | DELETE | `userService.deleteUser` | Delete account |
| `/api/v1/users/me/profile-image` | PUT | `userService.uploadProfileImage` | Upload avatar |
| `/api/v1/users/me/profile-image` | GET | `userService.getProfileImage` | Get avatar |
| `/api/v1/users/me/profile-image` | DELETE | `userService.deleteProfileImage` | Remove avatar |

### Courses

| Endpoint | Method | Service | Purpose |
|---|---|---|---|
| `/api/v1/courses` | GET | `courcesService.getAll` | List all courses |
| `/api/v1/courses/:id` | GET | `singleCourceService.getById` | Get course details |
| `/api/v1/lectures/:id` | GET | `lectureService.getById` | Get lecture details |

### Quizzes

| Endpoint | Method | Service | Purpose |
|---|---|---|---|
| `/api/v1/quizzes/:id` | GET | `quizService.getQuiz` | Get quiz questions |
| `/api/v1/quizzes/:id/submit` | POST | `quizService.submitQuiz` | Submit answers |
| `/api/v1/quizzes/:id/attempts` | GET | `quizService.getAttempts` | Get attempt history |

### Generation

| Endpoint | Method | Service | Purpose |
|---|---|---|---|
| `/api/v1/generate/test` | POST | `generateService.upload` | Upload PDF |
| `/api/v1/generate/:jobId` | GET | `generateService.getStatus` | Check generation status |

### AI Chatbot

| Endpoint | Method | Service | Purpose |
|---|---|---|---|
| `/api/v1/chatbot/response` | POST | `chatbotService.sendMessage` | Send message to AI |

### Onboarding

| Endpoint | Method | Service | Purpose |
|---|---|---|---|
| `/api/v1/onboarding/questions` | GET | `onboardingService.getQuestions` | Get onboarding questions |
| `/api/v1/onboarding` | POST | `onboardingService.submitOnboarding` | Submit answers |

### Real-Time (Socket.io)

| Namespace | Event | Direction | Purpose |
|---|---|---|---|
| `/generation` | `joinJob` | Client → Server | Subscribe to job |
| `/generation` | `joinedJob` | Server → Client | Subscription confirmed |
| `/generation` | `jobStatusUpdated` | Server → Client | Progress update |
| `/generation` | `jobCompleted` | Server → Client | Job complete |
| `/generation` | `jobFailed` | Server → Client | Job failed |

---

> **Document Version:** 1.0  
> **Last Updated:** July 2026  
> **Project:** GenLearn Front-End
 
 