/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        school: {
          green: "#176B45",
          dark: "#10452F",
          soft: "#F3F8F3",
          light: "#F5F6F4",
          yellow: "#F2D34F",
          "yellow-hover": "#E5C538",
        }
      },
      fontFamily: {
        sans: ['Inter', 'Sarabun', 'sans-serif'],
        thai: ['Sarabun', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(16, 69, 47, 0.05), 0 1px 2px 0 rgba(16, 69, 47, 0.03)',
        'card': '0 4px 6px -1px rgba(16, 69, 47, 0.07), 0 2px 4px -1px rgba(16, 69, 47, 0.04)',
        'elevated': '0 10px 15px -3px rgba(16, 69, 47, 0.08), 0 4px 6px -2px rgba(16, 69, 47, 0.04)',
      }
    },
  },
  plugins: [],
}
