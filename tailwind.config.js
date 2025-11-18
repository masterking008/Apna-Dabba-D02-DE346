/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f7',
          100: '#daf2ed',
          500: '#114A42',
          600: '#0d3a34',
          700: '#0a2d27',
        },
        neutral: {
          50: '#F7F8FA',
          100: '#f1f3f4',
          600: '#6b7280',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '4': '16px',
      },
      borderRadius: {
        'card': '16px',
      },
      minHeight: {
        'button': '44px',
      }
    },
  },
  plugins: [],
}