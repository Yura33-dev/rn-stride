# Getting Started

Follow these instructions to set up STRIDE for local development.

## Prerequisites
- **Node.js**: Version 18.x or newer.
- **Package Manager**: `npm` (or `yarn`).
- **Expo CLI**: Available via `npx expo`.
- **Firebase Account**: Required to initialize the backend services.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd to-do
   ```

2. **Install Dependencies**
   Run the package manager to install all dependencies required by the project.
   ```bash
   npm install
   ```
   *Note: This will also run the `patch-package` postinstall script if there are any patched dependencies.*

3. **Configure Environment Variables**
   Create a `.env` file in the root directory based on the provided `env.example`.
   ```
   API_KEY=your_firebase_api_key
   AUTH_DOMAIN=your_firebase_auth_domain
   PROJECT_ID=your_firebase_project_id
   STORAGE_BUCKET=your_firebase_storage_bucket
   MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   APP_ID=your_firebase_app_id
   ```

4. **Start the Development Server**
   Start the Expo Metro bundler.
   ```bash
   npm start
   ```

5. **Run the App**
   - Press `i` in the terminal to open the iOS simulator (requires macOS and Xcode).
   - Press `a` in the terminal to open the Android emulator (requires Android Studio).
   - Alternatively, scan the QR code using the Expo Go app on your physical device.

## Building for Production
STRIDE uses Expo EAS (Expo Application Services) for building standalone applications. Ensure you have the EAS CLI installed (`npm install -g eas-cli`) to create production builds.
