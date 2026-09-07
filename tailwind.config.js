/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dynamic tokens supporting black theme & light mode
        primary: 'var(--color-primary)',
        'primary-active': 'var(--color-primary-active)',
        'on-primary': 'var(--color-on-primary)',

        // Surfaces
        canvas: 'var(--color-canvas)',
        'canvas-soft': 'var(--color-canvas-soft)',
        'canvas-deep': 'var(--color-canvas-deep)',
        'surface-card': 'var(--color-surface-card)',
        'surface-strong': 'var(--color-surface-strong)',
        'surface-dark': 'var(--color-surface-dark)',
        'surface-dark-elevated': 'var(--color-surface-dark-elevated)',

        // Hairlines
        hairline: 'var(--color-hairline)',
        'hairline-soft': 'var(--color-hairline-soft)',
        'hairline-strong': 'var(--color-hairline-strong)',

        // Text
        ink: 'var(--color-ink)',
        body: 'var(--color-body)',
        'body-strong': 'var(--color-body-strong)',
        muted: 'var(--color-muted)',
        'muted-soft': 'var(--color-muted-soft)',
        'on-dark': 'var(--color-on-dark)',
        'on-dark-soft': 'var(--color-on-dark-soft)',

        // Atmospheric Gradient Stops (signature pastel orbs)
        'gradient-mint': '#a7e5d3',
        'gradient-peach': '#f4c5a8',
        'gradient-lavender': '#c8b8e0',
        'gradient-sky': '#a8c8e8',
        'gradient-rose': '#e8b8c4',

        // Semantic
        success: '#16a34a',
        error: '#dc2626',
        'error-soft': 'var(--color-error-soft)',

        // Sunny Patel Inspired Palette Tokens
        ember: '#d9663d',
        'ember-glow': 'rgba(217, 102, 61, 0.25)',
        bone: '#ede8dc',
        'bone-dim': '#a19d93',
        line: 'var(--color-hairline)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        serif: [
          '"EB Garamond"',
          'Times New Roman',
          'serif',
        ],
        display: [
          '"EB Garamond"',
          'Times New Roman',
          'serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'monospace',
        ],
      },
      spacing: {
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        section: '96px',
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        xxl: '24px',
        pill: '9999px',
        full: '9999px',
      },
      boxShadow: {
        'soft-drop': '0 4px 16px rgba(0, 0, 0, 0.25)',
        'soft-hover': '0 8px 24px rgba(0, 0, 0, 0.4)',
        level1: '0 1px 2px rgba(0, 0, 0, 0.2), 0 0 0 1px var(--color-hairline)',
        level2: '0 4px 16px rgba(0, 0, 0, 0.25), 0 0 0 1px var(--color-hairline)',
        level3: '0 10px 30px rgba(0, 0, 0, 0.35), 0 0 0 1px var(--color-hairline-strong)',
      },
    },
  },
  plugins: [],
}
