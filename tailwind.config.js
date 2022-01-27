module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Open Sans',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
