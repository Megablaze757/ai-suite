/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        // ===== Brand Colors =====
        colors: {
          // Primary brand color (buttons, highlights)
          primary: {
            50: "#f0f9ff",
            100: "#e0f2fe",
            200: "#bae6fd",
            300: "#7dd3fc",
            400: "#38bdf8",
            500: "#0ea5e9", // Main primary
            600: "#0284c7",
            700: "#0369a1",
            800: "#075985",
            900: "#0c4a6e",
          },
  
          // Secondary color (accent elements)
          secondary: {
            50: "#f5f3ff",
            100: "#ede9fe",
            200: "#ddd6fe",
            300: "#c4b5fd",
            400: "#a78bfa",
            500: "#8b5cf6", // Main secondary
            600: "#7c3aed",
            700: "#6d28d9",
            800: "#5b21b6",
            900: "#4c1d95",
          },
  
          // Neutral/gray palette
          gray: {
            50: "#f9fafb",
            100: "#f3f4f6",
            200: "#e5e7eb",
            300: "#d1d5db",
            400: "#9ca3af",
            500: "#6b7280",
            600: "#4b5563",
            700: "#374151",
            800: "#1f2937",
            900: "#111827",
          },
  
          // Success/error states
          success: "#10b981",
          error: "#ef4444",
          warning: "#f59e0b",
        },
  
        // ===== Typography =====
        fontFamily: {
          sans: ["var(--font-inter)", "sans-serif"], // Body text
          heading: ["var(--font-poppins)", "sans-serif"], // Headings
          mono: ["var(--font-roboto-mono)", "monospace"], // Code
        },
  
        // ===== Extended Utilities =====
        borderRadius: {
          '4xl': '2rem', // Extra-large rounded corners
        },
        boxShadow: {
          'soft': '0 4px 24px rgba(0, 0, 0, 0.08)', // Subtle shadow
          'glow': '0 0 12px rgba(14, 165, 233, 0.4)', // Blue glow effect
        },
        spacing: {
          '18': '4.5rem', // Additional spacing value
        },
        animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }
      },
    },
    plugins: [
      require('@tailwindcss/forms'), // Form styling
      require('@tailwindcss/typography'), // Prose content
    ],
  }