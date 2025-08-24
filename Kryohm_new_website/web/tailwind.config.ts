import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Typography scales - Professional B2B hierarchy
      fontSize: {
        'heading-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // 56px
        'heading-lg': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // 44px
        'heading-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }], // 36px
        'heading-sm': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }], // 30px
        'heading-xs': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0' }], // 24px
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }], // 18px
        'body-md': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }], // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0' }], // 14px
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }], // 12px
      },
      // Container and grid system
      maxWidth: {
        'container': '1200px',
        'content': '680px',
      },
      // Enhanced spacing scale for design consistency
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      // Responsive breakpoints
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      // Animation and transitions
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      // Border radius scale
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      // Box shadows for depth
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'strong': '0 8px 32px rgba(0, 0, 0, 0.16)',
      },
    },
  },
  plugins: [],
}

export default config
