/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        heading: ['Sora', 'sans-serif'],
      },
      colors: {
        amber: {
          50: '#FFFBEB', 100: '#FEF3C7', 200: '#FDE68A',
          300: '#FCD34D', 400: '#FBBF24', 500: '#F59E0B',
          600: '#D97706', 700: '#B45309', 800: '#92400E', 900: '#78350F',
        }
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.05), 0 1px 2px -1px rgba(0,0,0,0.05)',
        'elevated': '0 4px 24px -4px rgba(0,0,0,0.12)',
        'amber-glow': '0 8px 24px -4px rgba(245,158,11,0.35)',
      }
    }
  },
  plugins: [],
};
