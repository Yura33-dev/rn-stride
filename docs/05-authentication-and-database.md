# Authentication & Database

STRIDE utilizes Google's Firebase platform for standardizing backend operations, allowing the app to remain serverless while maintaining robust data persistence and user management.

## Authentication (Firebase Auth)
The authentication flow is implemented in `app/authenticate.tsx` and protected by a routing middleware pattern.

- **Methods**: Currently supports Email & Password authentication.
- **Routing Protection**: The `app/(protected)/_layout.tsx` layout listens to Firebase Auth's state. If no user is logged in, it intercepts the navigation and forces a redirect to the login screen.
- **User Sessions**: Firebase automatically persists the authentication session on the device.

## Database (Cloud Firestore)
Tasks and user data are stored in Cloud Firestore via the Firebase JS SDK.

### Data Structure
The database relies on a NoSQL document model.
- **`users/{userId}/tasks/{taskId}`**: Tasks are nested as a subcollection under the specific authenticated user. This ensures that users only ever read and write their own data, providing a foundational layer of security.

### Security Rules
Firebase Security Rules must be configured to ensure that a user can only access documents where the `userId` in the path matches their authentication token's `uid`.

### Service Layer
Database operations are decoupled from React components. The `api/services/task.service.ts` file exports functions to:
- Read tasks (fetching by date range).
- Create new task documents.
- Update existing documents (e.g., toggling the `completed` status).
- Delete documents.
