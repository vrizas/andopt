module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        andopt: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'
      },
      gridTemplateColumns: {
        profile: '1fr 3fr'
      },
      gridTemplateRows: {
        chat: '1fr 10fr 2fr'
      }
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif']
    },
    colors: {
      primary: '#2F957F',
      secondary: '#E06B2D',
      darkGray: '#628281',
      lightGray: '#C4C4C4',
      white: '#F9F9F9',
      black: '#191919',
      pink: '#EF144A',
      darkFilter: 'rgba(0, 0, 0, 0.5)',
      primaryFilter: 'rgba(47, 149, 127, 0.2)',
      'primaryOpacity-0': 'rgba(47, 149, 127, 0)',
      primaryChat: '#CAFFB9'
    }
  },
  plugins: []
}
