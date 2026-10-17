/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Art Deco palette — mirrors the CSS custom properties in app/globals.css
      colors: {
        ink: { DEFAULT: '#0a0a0c', 2: '#121216', 3: '#1c1c22' },
        gold: { DEFAULT: '#d4af37', light: '#f3d98b', dark: '#8f6d1a' },
        ivory: { DEFAULT: '#f6eedb', 2: '#efe3c6', 3: '#e4d4ae' },
        emerald: { DEFAULT: '#0d332d', 2: '#134a41', 3: '#1b5e52' },
        wine: '#7b1e3a',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Limelight', 'Georgia', 'serif'],
        serif: ['var(--font-accent)', 'Bodoni Moda', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'Josefin Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #8a6a1c 0%, #f3d98b 24%, #c9a13b 48%, #fbe7a1 72%, #9c7a1f 100%)',
      },
    },
  },
  plugins: [],
}
