import Colors from './constants/Colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: Colors.primary,
        'primary-active': Colors.primaryActive,
        secondary: Colors.secondary,
        background: Colors.background[600],
        'dark-background': Colors.background[800],
        foreground: Colors.foreground,
        success: Colors.success,
        warning: Colors.warning,
        error: Colors.error,
        placeholder: Colors.placeholder,
      },
    },
  },
  plugins: [],
};
