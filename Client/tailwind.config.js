/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // ✅ fixed missing quotes
  theme: {
    extend: {
      fontFamily: {
        // ✅ You can use either 'poppins' class OR set as default 'sans'
        sans: ["Poppins", "sans-serif"], // makes Poppins the default font
        poppins: ["Poppins", "sans-serif"], // optional: explicit class `font-poppins`
      },
      animation: {
        "fire-ring": "fire-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "fire-ring": {
          "0%, 100%": {
            boxShadow: "0 0 10px 2px rgba(251, 191, 36, 0.5)",
            borderColor: "rgba(251, 191, 36, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 20px 5px rgba(239, 68, 68, 0.7)",
            borderColor: "rgba(239, 68, 68, 0.5)",
          },
        },
      },
    },
  },
  plugins: [],
};
