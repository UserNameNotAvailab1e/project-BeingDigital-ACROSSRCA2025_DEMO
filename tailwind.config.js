/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nostalgia-white': '#FAFAFA', // The warm, expensive paper white
        'nostalgia-black': '#050505', // The void
        'nostalgia-grey': '#888888',  // The metadata
        'nostalgia-error': '#FF3333', // Only for Critical Glitch state
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'serif': ['SF Pro Display', 'Inter', 'serif'], // Added fallback for the serif title requested
      }
    }
  },
  plugins: [],
}
