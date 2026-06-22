# Weekend Warrior Social

A modern web application for organizing social events and connecting with friends.

## Tech Stack

- **Frontend:** React 18.2 + TypeScript 5.3
- **Build Tool:** Vite 5.0
- **Routing:** React Router 6.20
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **Styling:** CSS with design system
- **Package Manager:** npm

## Prerequisites

- Node.js 18+ with npm
- Firebase project (credentials in `.env.local`)

## Quick Start

### 1. Setup Environment

```bash
# Copy environment template
cp .env.example .env.local

# Fill in your Firebase credentials in .env.local
```

Required environment variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### 2. Install Dependencies

```bash
npm install
```

### 3. Development Server

```bash
npm run dev
```

Application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

Production bundle will be in `dist/` directory.

### 5. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
.
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components (Home, Login, Events, etc.)
│   ├── services/           # Firebase services (auth, firestore)
│   ├── context/            # React Context (AuthContext)
│   ├── hooks/              # Custom hooks (useAuthForm)
│   ├── firebase/           # Firebase configuration
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Root layout component
│   ├── main.tsx            # Application entry point
│   ├── router.tsx          # Route definitions
│   └── index.css           # Global styles
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── .env.example            # Environment variables template
```

## Features

### Authentication (ETAP 2)
- ✅ User registration with email/password
- ✅ User login
- ✅ User logout
- ✅ Session persistence (browserLocalPersistence)
- ✅ Protected routes with automatic redirect
- ✅ Automatic Firestore user document creation

### Public Routes
- `/login` - User login page
- `/register` - User registration page

### Protected Routes (require authentication)
- `/` - Home page with events feed
- `/events` - Events listing and discovery
- `/search` - Search functionality
- `/messages` - Direct messaging
- `/profile/:id` - User profile page

## Development

### Linting

```bash
npm run lint
```

### Type Checking

TypeScript strict mode is enabled. Run build to check for type errors:

```bash
npm run build
```

## Security

### Environment Variables

- Never commit `.env.local` to git (protected by `.gitignore`)
- Credentials are validated at app startup
- Missing variables will show clear error message

### Firebase Security

- Security rules must be configured in Firebase Console
- User authentication via Firebase Auth
- Firestore access controlled via security rules

## Firebase Schema

### Users Collection (`users/{uid}`)
```
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  bio: string (optional),
  createdAt: timestamp,
  updatedAt: timestamp,
  role: "user" | "admin",
  isActive: boolean
}
```

### Events Collection (`events/{docId}`)
```
{
  id: string,
  title: string,
  description: string,
  location: string,
  category: string,
  image: string,
  date: timestamp,
  creator: string (uid),
  participants: string[] (uids),
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Troubleshooting

### "Configuration Error" on app startup
- Check that `.env.local` exists and has all required Firebase credentials
- Verify variable names match exactly (case-sensitive)
- Run `npm install` to ensure all dependencies are installed

### Port 5173 already in use
- Vite will automatically try next available port (5174, 5175, etc.)
- Or kill existing process: `lsof -i :5173 | grep node | awk '{print $2}' | xargs kill`

### TypeScript errors
- Run `npm run build` to see full compilation errors
- Check that all imports use correct paths with `@` alias

## Next Steps

- ETAP 3: Implement events, posts, and social features
- Add real-time updates with Firestore listeners
- Implement image uploads with Cloudinary
- Add notifications with Firebase Cloud Messaging

## License

MIT
