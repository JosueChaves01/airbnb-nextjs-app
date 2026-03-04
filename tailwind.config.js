/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00B4B0',
          hover: '#028A87',
        },
        secondary: '#1D4F7C',
        romantic: '#F973A2',
        'romantic-hover': '#e05593',
        surface: '#FAFBFF',
        'surface-card': '#FFFFFF',
        'text-primary': '#1a1a2e',
        'text-secondary': '#4a4a6a',
        'text-muted': '#8888a8',
        border: '#e8e8f0',
      },
      fontFamily: {
        serif: ['var(--font-heading)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '10px',
        md: '14px',
        lg: '22px',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.12)',
        'hero': '0 4px 24px rgba(0,180,176,0.15)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00B4B0, #1D4F7C)',
        'gradient-romantic': 'linear-gradient(135deg, #F973A2, #e05593)',
        'gradient-hero': 'linear-gradient(135deg, #0a0a1a 0%, #1D4F7C 100%)',
        'gradient-ethereal': 'linear-gradient(180deg, #f0f4ff 0%, #e8f0ff 50%, #f5f0ff 100%)',
      },
      spacing: {
        'section': '5rem',
        'section-sm': '3rem',
      },
    },
  },
  plugins: [],
}
