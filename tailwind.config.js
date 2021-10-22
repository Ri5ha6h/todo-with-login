module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'gr-100': '#5e5e5e',
        'purp-100': '#b47aea',
        'rd-100': '#ef6161',
        'bl-100': '#1e9cea',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
