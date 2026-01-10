module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--color-border)', /* white-10 */
        input: 'var(--color-input)', /* slate-900 */
        ring: 'var(--color-ring)', /* cyan-400 */
        background: 'var(--color-background)', /* slate-950 */
        foreground: 'var(--color-foreground)', /* gray-200 */
        primary: {
          DEFAULT: 'var(--color-primary)', /* cyan-400 */
          foreground: 'var(--color-primary-foreground)', /* slate-950 */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* violet-500 */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-500 */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* slate-800 */
          foreground: 'var(--color-muted-foreground)', /* gray-400 */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* orange-500 */
          foreground: 'var(--color-accent-foreground)', /* white */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* slate-900 */
          foreground: 'var(--color-popover-foreground)', /* gray-200 */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* slate-900 */
          foreground: 'var(--color-card-foreground)', /* gray-200 */
        },
        surface: {
          DEFAULT: 'var(--color-surface)', /* slate-900 */
          foreground: 'var(--color-surface-foreground)', /* gray-200 */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* green-500 */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-500 */
          foreground: 'var(--color-warning-foreground)', /* slate-950 */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-500 */
          foreground: 'var(--color-error-foreground)', /* white */
        },
      },
      borderRadius: {
        lg: '16px',
        md: '12px',
        sm: '6px',
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        caption: ['"Plus Jakarta Sans"', 'sans-serif'],
        data: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'h1': ['3rem', { lineHeight: '1', fontWeight: '900', letterSpacing: '-0.05em' }],
        'h2': ['2.25rem', { lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.04em' }],
        'h3': ['1.5rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.03em' }],
        'h4': ['1.25rem', { lineHeight: '1.3', fontWeight: '500' }],
        'h5': ['1.125rem', { lineHeight: '1.4', fontWeight: '500' }],
        'h1-hero': ['5.5rem', { lineHeight: '0.9', fontWeight: '900', letterSpacing: '-0.06em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(59, 130, 246, 0.15)',
        'glow-md': '0 0 20px rgba(124, 77, 255, 0.2)',
        'glow-lg': '0 0 30px rgba(0, 229, 255, 0.25)',
        'glow-xl': '0 0 50px rgba(59, 130, 246, 0.3)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '250': '250ms',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      animation: {
        'slide-in-right': 'slideInRight 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}