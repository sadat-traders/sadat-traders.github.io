/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#7A1020',
          50: '#FDF2F3',
          100: '#FCE4E6',
          200: '#F7BCC2',
          300: '#EE8893',
          400: '#DE4D5E',
          500: '#C62828',
          600: '#A31B2A',
          700: '#7A1020', // Deep Burgundy primary
          800: '#5A0B16',
          900: '#3D070E',
          950: '#230307',
        },
        meatRed: {
          DEFAULT: '#C62828',
          light: '#EF5350',
          dark: '#B71C1C',
        },
        charcoal: {
          DEFAULT: '#171717',
          light: '#262626',
          dark: '#0A0A0A',
          card: '#1F1F1F',
          border: '#2E2E2E',
        },
        cream: {
          DEFAULT: '#FFF8F2',
          soft: '#FBF5EE',
          dark: '#F3E9DE',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E6C65C',
          dark: '#B89326',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Cabinet Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(122, 16, 32, 0.15), 0 5px 15px -5px rgba(0, 0, 0, 0.08)',
        'luxury-gold': '0 10px 30px -5px rgba(212, 175, 55, 0.25)',
        'luxury-hover': '0 20px 40px -10px rgba(122, 16, 32, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
