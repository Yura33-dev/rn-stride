# Internationalization & Validation

STRIDE is built to be multi-lingual from the ground up, with a firm integration between localization and form validation.

## Internationalization (i18n)
The application uses `i18next` combined with `react-i18next`.

- **Supported Locales**: English (`en`), German (`de`), Russian (`ru`).
- **Detection**: `expo-localization` is used to detect the system language on the initial launch.
- **Files**: Translation strings are stored in `i18n/locales/*.json`.
- **Usage**: Components use the `useTranslation` hook from `react-i18next` to extract the `t` function for rendering text.

## Form Validation
Form state and validation are handled by **React Hook Form** and **Zod**.

### Architecture
1. **Zod Schemas** (`schemas/`): Schemas define the shape of valid data (e.g., `auth.schema.ts`, `task-schema.ts`).
2. **Dynamic Translations**: To ensure validation error messages reflect the currently selected language, Zod schemas are wrapped in factory functions (e.g., `getTaskSchema(t)`). This function receives the `t` translation function dynamically at runtime.
3. **React Hook Form**: The form logic consumes these schemas using `@hookform/resolvers/zod`.
4. **UI Components**: Specialized inputs (like `ControlledTextInput`) take the `control` object from React Hook Form, automatically extracting values, tracking focus, and displaying error messages defined by Zod.
