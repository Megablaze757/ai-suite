// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // Minimal working config
      primary: {
        500: '#0ea5e9', // MUST match your usage
      },
      white: '#ffffff',
      gray: {
        200: '#e5e7eb',
        800: '#1f2937'
      }
    },
    extend: {},
  },
  plugins: [],
}
