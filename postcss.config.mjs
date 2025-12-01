const config = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
        abeezee: ["var(--font-abeezee)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
        plusJakarta: ["var(--font-plusjakarta)", "sans-serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
        caveat: ["var(--font-caveat)", "cursive"],
      },
    },
  },
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
