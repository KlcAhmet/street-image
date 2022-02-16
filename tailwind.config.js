module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      orange: {
        500: '#f97316',
        600: '#ea580c',
      },
      indigo: {
        800: '#3730a3',
      },
    },
  },
  plugins: [],
}
