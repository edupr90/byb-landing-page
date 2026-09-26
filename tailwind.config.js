/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      /* The Noto faces sit behind the Latin ones, never in front: Inter and
         Plus Jakarta Sans have every Latin glyph, so an English or Spanish page
         never reaches them, and a CJK one has a designed face instead of
         whatever sans-serif the OS defaults to. Only the stylesheet for the
         selected language is fetched — see ensureCjkFont() in src/i18n/index.jsx.
         All three are listed because fallback is resolved PER CHARACTER: Noto
         Sans JP declares no Hangul range, so Korean text walks past it to KR.
         Order among them is therefore harmless, and the unloaded families are
         simply skipped. */
      fontFamily: {
        sans: ['Inter', '"Noto Sans JP"', '"Noto Sans KR"', '"Noto Sans TC"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', '"Noto Sans JP"', '"Noto Sans KR"', '"Noto Sans TC"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#eff4fc',
          100: '#dae6f8',
          200: '#b9cef1',
          300: '#8daee8',
          400: '#5c86e0',
          500: '#3e6bcd',
          600: '#2f5bbd',
          700: '#2a4fa5',
          800: '#23458f',
          900: '#1e3a75',
          950: '#13244a',
        },
        accent: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#f59e0b',
          500: '#ea8f08',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        surface: {
          50:  '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'progress': 'progress 2s ease-out forwards',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
