# Weekend Warrior Social - Architecture

## Data Flow

```
UI Components
    ↓
Custom Hooks (useAuth, useProfile, useEvents, usePosts, useMessages, useNotifications)
    ↓
Services (AuthService, UserService, ProfileService, EventService, PostService, MessageService, NotificationService)
    ↓
Firestore Models & Firebase SDK
    ↓
Firestore Database
```

## Firestore Collections

- `users/{userId}` - Authentication metadata
- `profiles/{userId}` - User public profiles
- `events/{eventId}` - Event details
- `events/{eventId}/participants/{userId}` - Event participants
- `posts/{postId}` - User posts
- `posts/{postId}/comments/{commentId}` - Post comments
- `posts/{postId}/likes/{userId}` - Post likes
- `conversations/{conversationId}` - Chat conversations
- `conversations/{conversationId}/messages/{messageId}` - Chat messages
- `notifications/{userId}/items/{notificationId}` - User notifications

## Folder Structure

```
src/
  ├── models/
  │   ├── firestore/
  │   │   ├── index.ts (barrel export)
  │   │   ├── user.model.ts
  │   │   ├── profile.model.ts
  │   │   ├── event.model.ts
  │   │   ├── post.model.ts
  │   │   ├── comment.model.ts
  │   │   ├── like.model.ts
  │   │   ├── conversation.model.ts
  │   │   ├── message.model.ts
  │   │   ├── notification.model.ts
  │   │   └── common.types.ts (timestamps, status)
  │   └── index.ts
  ├── services/
  │   ├── index.ts (barrel export)
  │   ├── auth.service.ts
  │   ├── user.service.ts
  │   ├── profile.service.ts
  │   ├── event.service.ts
  │   ├── post.service.ts
  │   ├── message.service.ts
  │   ├── notification.service.ts
  │   └── base.service.ts (shared CRUD logic)
  ├── hooks/
  │   ├── index.ts (barrel export)
  │   ├── useAuth.ts
  │   ├── useProfile.ts
  │   ├── useEvents.ts
  │   ├── usePosts.ts
  │   ├── useMessages.ts
  │   ├── useNotifications.ts
  │   └── useFirestore.ts (base hook for CRUD)
  ├── utils/
  │   ├── firebase.config.ts
  │   ├── firebase.helpers.ts
  │   └── error.handler.ts
  └── types/
      ├── index.ts
      ├── api.types.ts
      └── error.types.ts
```

## Type System

- All models use `readonly` for immutability
- Common base type: `FirestoreDocument` (id, createdAt, updatedAt, deletedAt, createdBy)
- Status enums for state tracking
- Full error typing with custom error classes

## Error Handling Strategy

- Custom error classes extending Error
- Retry logic with exponential backoff
- Offline detection and queueing
- Permission error detection
- Timeout handling
