# Architecture and Folder Structure

STRIDE follows a modular, feature-centric directory structure, built around Expo Router's file-based routing mechanism.

## High-Level Folder Structure
- **`app/`**: Contains all the screens and navigation layouts governed by Expo Router.
- **`api/`**: Encapsulates network requests, database interactions, and React Query clients.
- **`components/`**: Reusable UI components used across different screens.
- **`config/`**: Configuration files for third-party services (e.g., Firebase).
- **`constants/`**: Global static values like colors, themes, and configuration flags.
- **`hooks/`**: Custom React hooks for encapsulating logic, including React Query hooks.
- **`i18n/`**: Localization setup and language files.
- **`schemas/`**: Zod validation schemas for forms.
- **`store/`**: Global client state definitions using Zustand.
- **`types/`**: Global TypeScript types and interfaces.
- **`utilities/`**: Pure helper functions (e.g., date manipulation, classname merging).

## Routing (`app/` Directory)
The project relies on Expo Router to define the navigation tree:
- `_layout.tsx`: The root layout providing global contexts (QueryClientProvider, AuthProvider, etc.).
- `authenticate.tsx`: The authentication screen (Login and Registration).
- `(protected)/`: A pathless route group that enforces an authentication barrier. Users must be logged in to access its children.
  - `_layout.tsx`: Checks authentication state and redirects unauthenticated users back to `/authenticate`.
  - `(tabs)/`: The main bottom tab navigation.
    - `(tasks)/`: The task management stack (Weekly overview -> Day detail -> Modals).
    - `settings/`: The user settings and profile tab.

## Component Architecture
Components are split into two conceptual categories:
1. **Dumb/Presentational Components** (in `components/ui/`): High reusability, stateless, rely purely on props (e.g., `ControlledTextInput`, `SubmitButton`).
2. **Smart Components/Widgets**: Connected to state or context, representing distinct features (e.g., `day-card.tsx`, `daily-task-item.tsx`).
