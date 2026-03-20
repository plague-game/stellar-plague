/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Plague neobrutalist palette
        plague: {
          black: '#0a0a0a',
          white: '#f5f0e8',
          red: '#e63329',
          yellow: '#f5c518',
          green: '#1a7a4a',
          purple: '#6b21a8',
          border: '#0a0a0a',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      boxShadow: {
        brutal: '4px 4px 0px #0a0a0a',
        'brutal-lg': '6px 6px 0px #0a0a0a',
        'brutal-red': '4px 4px 0px #e63329',
      },
      borderWidth: {
        3: '3px',
      },
      animation: {
        'pulse-red': 'pulse-red 1.5s ease-in-out infinite',
        'infect': 'infect 0.6s ease-out forwards',
        'shake': 'shake 0.4s ease-in-out',
      },
      keyframes: {
        'pulse-red': {
          '0%, 100%': { boxShadow: '4px 4px 0px #e63329' },
          '50%': { boxShadow: '6px 6px 0px #e63329' },
        },
        'infect': {
          '0%': { transform: 'scale(1)', backgroundColor: '#f5f0e8' },
          '50%': { transform: 'scale(1.1)', backgroundColor: '#e63329' },
          '100%': { transform: 'scale(1)', backgroundColor: '#e63329' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
      },
    },
  },
  plugins: [],
}
