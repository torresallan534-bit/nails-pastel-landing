import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#fcf5f2',
          alt: '#f7eeea',
          border: '#eddcd6',
        },
        pastel: {
          purple: '#f7bbfd',
          soft: '#f0cdef',
          pink: '#ffa0d3',
          pinkHover: '#f98bc3',
          lavender: '#ecd6fd',
          cream: '#fff9f7',
        },
        brand: {
          dark: '#010101',
          surface: '#121214',
          muted: '#636266',
          border: '#e7ded9',
          success: '#10b981',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-jakarta)',
          'var(--font-inter)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        display: ['var(--font-jakarta)', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 40px -10px rgba(240, 205, 239, 0.35)',
        'glow-pink': '0 0 25px rgba(255, 160, 211, 0.45)',
        'glow-purple': '0 0 25px rgba(247, 187, 253, 0.45)',
        'float': '0 20px 40px -15px rgba(1, 1, 1, 0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
