/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable manual dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'], // Set Inter as the default sans font
        'ubuntu': ['Ubuntu', 'sans-serif'] // Keep existing if needed, but Inter is preferred
      },
      colors: {
        // Custom Dark Theme Palette
        'app-black': '#09090b', // Deepest background (e.g., main body)
        'app-gray': '#18181b',  // Secondary background (e.g., sidebar, cards)
        'app-light-gray': '#27272a', // Borders, separators
        'primary': '#6366f1',   // Indigo-500
        'primary-hover': '#4f46e5', // Indigo-600
        'secondary': '#a855f7', // Purple-500
      },
      height: {
        "1/10": "10%",
        "9/10": "90%"
      },
      backgroundImage: {
        'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
