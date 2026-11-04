import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-raised': 'var(--bg-raised)',
        glass: 'var(--glass)',
        'glass-strong': 'var(--glass-strong)',
        hairline: 'var(--border)',
        'text-main': 'var(--text)',
        'text-muted': 'var(--text-muted)',
        accent: {
          DEFAULT: 'var(--accent)',
          deep: 'var(--accent-deep)',
          glow: 'var(--accent-glow)'
        },
        gold: {
          DEFAULT: 'var(--gold)',
          glow: 'rgba(227, 176, 75, 0.35)'
        },
        attention: 'var(--attention)',
        critical: 'var(--critical)'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace']
      },
      boxShadow: {
        glass: '0 12px 40px rgba(0, 0, 0, 0.35)',
        'glass-light': '0 12px 40px rgba(0, 0, 0, 0.06)',
        'accent-pill': '0 4px 20px var(--accent-glow)',
        'gold-pill': '0 4px 20px rgba(227, 176, 75, 0.35)'
      },
      borderRadius: {
        '2.5xl': '20px',
        '3xl': '24px'
      },
      keyframes: {
        'scan': {
          '0%, 100%': { transform: 'translateY(-10%)' },
          '50%': { transform: 'translateY(110%)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(6px)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.14', transform: 'scale(1)' },
          '50%': { opacity: '0.24', transform: 'scale(1.06)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        }
      },
      animation: {
        'scan': 'scan 3s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 7s ease-in-out 1s infinite',
        'pulse-glow': 'pulse-glow 5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'cursor-blink': 'cursor-blink 0.9s infinite'
      }
    }
  },
  plugins: []
};
export default config;
