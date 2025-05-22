// tailwind.config.js
import {heroui} from "@heroui/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
],
  theme: {
    extend: {
      backgroundImage: {
        'dropbox': "url('/bg.avif')"
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};