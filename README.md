# Next.js + Firebase Enterprise Template

A production-ready Next.js application skeleton featuring Firebase Google authentication, secure session management, RBAC, and Prisma with PostgreSQL.

## Features

- **Authentication**: Firebase Google sign-in with server-side token verification.
- **Session Management**: Secure, HTTP-only, encrypted cookies using `jose` (JWT).
- **Database**: Prisma ORM with PostgreSQL.
- **RBAC**: Role-Based Access Control (User, Tester, Admin).
- **Proxy**: Route protection for authenticated pages.
- **UI**: Tailwind CSS + Shadcn UI components with responsive Sidebar layout.
- **Type Safety**: Full TypeScript support.

## Prerequisites

- Node.js 18+
- Docker (for local database)
- Firebase project with Google sign-in enabled

## Getting Started

### 1. Clone & Install
```bash
git clone <repository-url>
cd nextjs-firebase-template
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
FIREBASE_PROJECT_ID="your-firebase-project-id"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@your-firebase-project-id.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Firebase Web SDK (client)
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-firebase-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-firebase-project-id"
NEXT_PUBLIC_FIREBASE_APP_ID=""
```

`AUTH_SECRET` is required and must be set in every environment.

In Firebase Console, enable **Authentication > Sign-in method > Google** and add your app domain (for local dev, `localhost`) under authorized domains.

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
1. **Login**: User clicks "Continue with Google" and authenticates via Firebase in the browser.
2. **Token Verification**: The browser sends Firebase `idToken` to `/api/auth/login`.
3. **Validation**: Server verifies the token with Firebase Admin SDK.
4. **Session**: Server creates an encrypted JWT session cookie (`session`).
5. **User**: User profile is upserted into the PostgreSQL database.

### Proxy Protection
The `proxy.ts` file protects routes like `/dashboard` or `/profile` by verifying the `session` cookie.

## Deployment

### Vercel
1. Push to GitHub.
2. Import project in Vercel.
3. Add Environment Variables in Vercel Project Settings.
4. Deploy.

### Docker
Build the container:
```bash
docker build -t nextjs-firebase-app .
```

## Project Structure
```
├── src
│   ├── app
│   │   ├── (main)       # Authenticated routes with Sidebar
│   │   ├── api          # API Routes
│   │   └── page.tsx     # Landing page
│   ├── db               # Database handler
│   ├── lib              # Auth & Utilities
│   └── components       # React components
│       ├── app-sidebar.tsx # Sidebar component
│       └── ui           # Shadcn UI components
├── prisma               # Database schema
└── proxy.ts             # Route protection
```
