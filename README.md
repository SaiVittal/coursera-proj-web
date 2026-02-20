# Next.js + Okta Enterprise Template

A production-ready Next.js application skeleton featuring Okta SSO authentication, secure session management, RBAC, and Prisma with PostgreSQL.

## Features

- **Authentication**: Custom Okta OIDC integration (Authorization Code Flow).
- **Session Management**: Secure, HTTP-only, encrypted cookies using `jose` (JWT).
- **Database**: Prisma ORM with PostgreSQL.
- **RBAC**: Role-Based Access Control (User, Tester, Admin).
- **Proxy**: Route protection for authenticated pages.
- **UI**: Tailwind CSS + Shadcn UI components with responsive Sidebar layout.
- **Type Safety**: Full TypeScript support.

## Prerequisites

- Node.js 18+
- Docker (for local database)
- Okta Developer Account

## Getting Started

### 1. Clone & Install
```bash
git clone <repository-url>
cd nextjs-okta-template
npm install
```

### 2. Environment Setup
Rename `.env.example` to `.env` and configure your variables:

```properties
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Auth Security
AUTH_SECRET="generated-secure-random-string"

# Okta Configuration
AUTH_OKTA_ISSUER="https://your-org.okta.com/oauth2/default"
AUTH_OKTA_CLIENT_ID="your-client-id"
AUTH_OKTA_CLIENT_SECRET="your-client-secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

`AUTH_SECRET` is required and must be set in every environment.

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
1. **Login**: User clicks "Login" -> Redirects to Okta with `state`.
2. **Callback**: Okta redirects back to `/api/auth/callback/okta`.
3. **Validation**: Server validates `state`, exchanges code for tokens.
4. **Session**: Server creates an encrypted JWT session cookie (`session`) and optionally a refresh token cookie.
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
docker build -t nextjs-okta-app .
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
