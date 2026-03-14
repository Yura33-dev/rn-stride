# Technology Stack

STRIDE leverages a modern and robust stack for cross-platform mobile development.

## Core Framework
- **React Native (v0.81)**: Core library for rendering native UI.
- **Expo (SDK 54)**: Toolchain and framework around React Native for easier development, building, and deployment.
- **Expo Router (v6)**: File-based routing system for React Native, handling navigation and deep linking.
- **TypeScript**: Used universally across the project for static typing and safer code.

## State Management & Data Fetching
- **TanStack React Query (v5)**: Handles server state, data fetching from remote APIs (Firebase), caching, and synchronization.
- **Zustand (v5)**: A lightweight, fast, and scalable bearbones state-management solution for global client state (e.g., managing the currently selected week).

## Backend & Services
- **Firebase**: 
  - **Firebase Auth**: User authentication (Email/Password).
  - **Firestore**: NoSQL document database for storing user tasks and preferences.

## UI & Styling
- **NativeWind (v4)**: Tailwind CSS for React Native. Provides utility-first styling.
- **@expo/vector-icons**: Provides widely used icon sets (MaterialIcons, etc.).
- **react-native-reanimated & react-native-gesture-handler**: Used for smooth, native-driven animations and complex gestures (like swipe-to-delete).
- **sonner-native**: Toast notification library for React Native.

## Forms & Validation
- **React Hook Form**: Performant, flexible, and extensible forms with easy-to-use validation.
- **Zod**: TypeScript-first schema declaration and validation library.
- **@hookform/resolvers**: Bridge between React Hook Form and Zod for seamless schema-based validation.

## Utilities
- **i18next & react-i18next**: Internationalization framework.
- **expo-localization**: Handles detecting the user's device locale.
- **date-fns**: Comprehensive library for parsing, formatting, and manipulating dates.
- **react-native-calendars**: Customizable calendar components.
