# ETAP 3 – Konfiguracja

## Przygotowanie środowiska

### 1. Firebase Setup

Utwórz plik `.env.local` w katalogu głównym i dodaj:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Klucze znaleźć w Firebase Console > Project Settings > General.

### 2. Firestore Setup

Firestore jest już skonfigurowany w `src/firebase/config.ts`.

Koleje do utworzenia w ETAP 7:
- `users` - profili użytkowników
- `events` - wydarzeń
- `posts` - postów
- `messages` - wiadomości

### 3. Cloudinary Setup

Dodaj do `.env.local`:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

Upload Preset utwórz w Cloudinary Dashboard > Settings > Upload.

### 4. Routing

Routing jest skonfigurowany w `src/router.tsx`:
- `/` - strona główna
- `/profile/:id` - profil użytkownika
- `/events` - lista wydarzeń
- `/search` - wyszukiwanie
- `/messages` - wiadomości

Strony zostaną zaimplementowane w ETAP 4.

## Sprawdzenie

```bash
npm install
npm run dev
```

Aplikacja powinna się załadować na `http://localhost:5173` bez błędów (strony będą puste).
