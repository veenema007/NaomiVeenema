/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#fdf2f4',
          100: '#fbe6ea',
          200: '#f5cdd6',
          300: '#eca3b6',
          400: '#df6f8e',
          500: '#cc4668',
          600: '#b32f50',
          700: '#932240',
          800: '#800020',
          900: '#6b0a1c',
          950: '#3d000f',
        },
        gold: {
          50: '#fdfaf0',
          100: '#faf2d9',
          200: '#f4e3ab',
          300: '#edcf73',
          400: '#e7ba4a',
          500: '#d3ae36',
          600: '#b8902a',
          700: '#936c25',
          800: '#7a5623',
          900: '#694821',
          950: '#3e2710',
        },
        racing: {
          black: '#1a0006',
          dark: '#24000a',
          darker: '#1c0008',
          carbon: '#300010',
          light: '#480018',
        },
      },
      fontFamily: {
        display: ['"Rajdhani"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        marquee: 'marquee 30s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(211, 174, 54, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(211, 174, 54, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};
