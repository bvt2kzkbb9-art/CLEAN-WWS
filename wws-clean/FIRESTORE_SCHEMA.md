# Firestore Database Schema

## Collections & Documents

### `users/{uid}`
User profile documents created automatically during registration.

**Fields:**
```javascript
{
  uid: string,                 // Firebase Auth UID (document ID)
  email: string,              // User email
  displayName: string,        // User display name
  photoURL: string,           // Profile photo URL (empty by default)
  bio?: string,               // User biography (optional)
  createdAt: timestamp,       // Account creation date
  updatedAt: timestamp,       // Last update date
  role: 'user' | 'admin',     // User role
  isActive: boolean,          // Account status
}
```

**Access Rules:**
- ✅ Users can read their own profile
- ✅ Users can update their own profile
- ✅ Admins can read all profiles
- ❌ Users cannot read other users' full profiles (sensitive data)

---

### `events/{eventId}`
Event documents (to be created in later stages).

**Planned Fields:**
```javascript
{
  id: string,                 // Event ID (document ID)
  title: string,              // Event title
  description: string,        // Event description
  location: string,           // Event location
  category: string,           // Event category (Sports, Outdoor, etc.)
  image: string,              // Event image URL (Cloudinary)
  date: timestamp,            // Event date and time
  creator: string,            // Event creator UID
  participants: string[],     // Array of user UIDs
  createdAt: timestamp,       // Creation date
  updatedAt: timestamp,       // Last update date
}
```

---

### `posts/{postId}`
Social media posts (to be created in later stages).

**Planned Fields:**
```javascript
{
  id: string,                 // Post ID (document ID)
  content: string,            // Post text content
  image?: string,             // Post image URL (optional)
  creator: string,            // Post creator UID
  likes: string[],            // Array of user UIDs who liked
  comments: number,           // Comment count
  createdAt: timestamp,       // Creation date
  updatedAt: timestamp,       // Last update date
}
```

---

### `messages/{conversationId}/{messageId}`
Direct messages between users (to be created in later stages).

**Planned Fields:**
```javascript
{
  id: string,                 // Message ID (document ID)
  senderId: string,           // Sender UID
  receiverId: string,         // Receiver UID
  content: string,            // Message text
  read: boolean,              // Read status
  createdAt: timestamp,       // Creation date
  updatedAt: timestamp,       // Last update date
}
```

---

## Setup Instructions

### 1. Create Collections Manually

In Firebase Console:
1. Go to **Build** → **Firestore Database**
2. Click **Create Collection**
3. Create the following collections:
   - `users` - for user profiles
   - `events` - for events (later)
   - `posts` - for social posts (later)
   - `messages` - for direct messages (later)

### 2. Security Rules

See `firestore.rules` file (to be configured).

### 3. Indexes

Firestore will auto-create simple indexes. Complex queries may require composite indexes.

---

## Current Implementation (ETAP 2)

**Active Collections:**
- ✅ `users/` - Automatic creation on registration

**Planned Collections:**
- ⏳ `events/` - ETAP 3
- ⏳ `posts/` - ETAP 4
- ⏳ `messages/` - ETAP 5

---

## Data Migration Notes

If migrating from SQL database:
- Convert timestamps to Firestore `Timestamp` format
- Convert user IDs to Firebase Auth UIDs
- Test data integrity in staging environment first

---

## Last Updated
2026-06-22 (ETAP 2)
