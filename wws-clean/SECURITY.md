# Security Guidelines

## Environment Variables

### Required Setup

1. **Create `.env.local` file** (NEVER commit this file)
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in Firebase credentials**
   - Get from: Firebase Console > Project Settings > General
   - All 6 variables are REQUIRED to start the app

3. **Fill in Cloudinary credentials** (optional for development)
   - Get from: Cloudinary Dashboard > Settings
   - Leave empty to skip image uploads during development

### Security Rules

✅ **DO:**
- Keep `.env.local` in `.gitignore` (already configured)
- Use environment variables for ALL secrets
- Rotate credentials regularly
- Use different credentials for dev/staging/production
- Review `.env.example` - never add secrets there

❌ **DON'T:**
- Commit `.env.local` to Git
- Hardcode secrets in source code
- Share credentials via email or chat
- Use the same credentials across environments
- Log environment variables

## Firebase Security

### Rules Checklist

- [ ] Enable Authentication methods (Email/Password, Google, etc.)
- [ ] Setup Firestore Security Rules for data access
- [ ] Enable Storage Security Rules for file uploads
- [ ] Use service accounts for backend operations
- [ ] Enable Cloud Audit Logs
- [ ] Setup billing alerts

### Recommended Rules

**Firestore Rules** (see `firestore.rules`)
- Users can only read/write their own data
- Public profiles are readable by all authenticated users
- Events are readable by all, writable only by creator

**Storage Rules**
- Users can only upload/delete their own files
- Uploads limited by file size and type
- Generate signed URLs for time-limited access

## API Security

### Cloudinary
- Use unsigned uploads with upload preset only in development
- Use signed uploads in production
- Validate file types and sizes on both client and server
- Implement rate limiting for uploads

### Firebase Functions
- Authenticate requests with Firebase Auth tokens
- Validate input data with type checking
- Use environment variables for sensitive config
- Monitor function execution and errors

## Credential Rotation

**Firebase API Keys:**
1. Go to Firebase Console > Project Settings
2. Create new Web app if needed
3. Update `.env.local` with new credentials
4. Verify app still works
5. Deactivate old keys after verification
6. Wait 24 hours before deleting

**Cloudinary:**
1. Go to Cloudinary Dashboard > Settings > API Keys
2. Generate new upload preset
3. Update `.env.local`
4. Test uploads
5. Deactivate old preset

## Additional Resources

- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [Cloudinary API Security](https://cloudinary.com/documentation/api_security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Environment Variables Best Practices](https://12factor.net/config)

---

**Last Updated:** 2026-06-22  
**Next Review:** Monthly
