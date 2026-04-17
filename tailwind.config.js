/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#00a8a6',
          darkTeal: '#054e60',
          lightTeal: '#dcf4f4',
          accent: '#1e88e5',
          bgLight: '#ffffff',
          bgGray: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
          textDark: '#1e293b',
          textMuted: '#64748b'
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(40px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(232, 114, 26, 0.3)' },
          to: { boxShadow: '0 0 40px rgba(26, 108, 232, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
