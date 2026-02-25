# Coursera Course Evaluator

A precision course analysis platform powered by specialized AI agents. Deconstruct learning objectives, instructional quality, and content alignment in seconds.

## Features

- **AI-Driven Auditing**: 7 specialized agents (Learning Objectives, Learner Alignment, Instruction Quality, etc.) powered by specialized course metadata.
- **Dynamic Reports**: Granular analysis views with 4 key metrics: Analysis Results, Course Overview, Pedagogical Insights, and Assessment Metrics.
- **Authentication**: Firebase Google sign-in with server-side session management.
- **Database**: Prisma ORM with PostgreSQL for robust user and course state management.
- **UI**: Premium, dark-mode first design with glassmorphism aesthetics and responsive navigation.

## Prerequisites

- Node.js 18+
- Docker (for local database)
- Firebase project with Google sign-in enabled

## Getting Started

### 1. Clone & Install
```bash
git clone <repository-url>
cd coursera-course-evaluator
npm install
```

### 2. Environment Setup
Rename `.env.example` to `.env` and configure your variables:

```properties
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Auth Security
AUTH_SECRET="generated-secure-random-string"

# Firebase Admin SDK (server)
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Firebase Web SDK (client)
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
```

### 3. Database Setup
Start the local Postgres instance:
```bash
docker-compose up -d
```

Push the schema to the database:
```bash
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

## Architecture

### Authentication Flow
1. **Login**: User authenticates via Firebase Google sign-in.
2. **Session**: Server creates an encrypted JWT session cookie for secure server-side rendering.
3. **RBAC**: User roles (User, Tester, Admin) are enforced within the application layout and API routes.

### Evaluation Workflow
1. **Discovery**: Browse and select courses from the dashboard.
2. **Analysis**: View agent-specific highlights and lowlights in the Evaluation Cockpit.
3. **Reporting**: Access deep-dive reports via the navigation parameters to share granular pedagogical findings.

## Project Structure

```
├── src
│   ├── app
│   │   ├── (main)       # Authenticated routes (Dashboard, Reports, Admin)
│   │   ├── api          # Authentication and Data APIs
│   │   └── page.tsx     # Landing page
│   ├── components       # Shared UI and Project-specific components
│   ├── constants        # Mock data (course-data.ts) and Config
│   ├── lib              # Auth, Prisma, and Utility helpers
│   └── types            # Global Type definitions
├── prisma               # Database schema
└── public               # Static assets and media
```
