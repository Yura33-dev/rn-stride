# State Management

State in STRIDE is explicitly separated into **Server State** (data living in the backend database) and **Client State** (ephemeral UI state).

## Server State: TanStack React Query
All interactions with Firebase Firestore are managed via React Query. 

### Why React Query?
- Automatic caching and background deduplication of requests.
- Built-in loading (`isPending`) and error states.
- Optimistic updates for better UX (UI updates immediately before the server responds).
- Automatic refetching on window focus or network reconnection.

### Implementation Pattern
1. Database access logic is isolated in `api/services/task.service.ts`.
2. Custom hooks (e.g., `useTasks`, `useCreateTask`, `useUpdateTask`) wrap React Query's `useQuery` and `useMutation` inside the `hooks/queryHooks/` directory.
3. Components consume these custom hooks, remaining agnostic to how the data is actually fetched or mutated.

## Client State: Zustand
For global UI state that doesn't belong in the database, STRIDE uses Zustand.

### Usage
Zustand is used for tracking context that needs to be shared across deeply nested components or distinct tab screens without resorting to prop-drilling or complex React Context setups.
- **Example**: `weekStore` tracks which calendar week the user is currently viewing across the app.

### Why Zustand?
- Minimal boilerplate compared to Redux.
- Hook-based consumption.
- Performs outside of React context, reducing unnecessary re-renders.
