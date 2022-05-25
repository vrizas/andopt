module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'andopt': 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
      }
    },
    colors: {
      primary: '#2F957F',
      secondary: '#E06B2D',
      darkGray: '#628281',
      lightGray: '#C4C4C4',
      white: '#F9F9F9',
      black: '#191919',
      pink: '#EF144A'
    }
  },
  plugins: [],
}
