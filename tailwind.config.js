/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F5EF',
        card: '#FFFDF8',
        secondary: '#EAE6DD',
        heading: '#242424',
        text: '#55514B',
        border: '#D8D2C7',
        accent: '#C5AD7B',
        palette: {
          bg: '#F7F5EF',
          card: '#FFFDF8',
          secondary: '#EAE6DD',
          heading: '#242424',
          text: '#55514B',
          border: '#D8D2C7',
          accent: '#C5AD7B',
        },
      },
      fontFamily: {
        couple: ['"Bodoni Moda"', '"Playfair Display"', '"Italiana"', '"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', '"Alex Brush"', '"Pinyon Script"', '"Marck Script"', 'cursive'],
        heading: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        subtitle: ['"Playfair Display"', 'serif'],
        body: ['Montserrat', 'Poppins', 'sans-serif'],
        arabic: ['Amiri', '"Traditional Arabic"', '"Scheherazade New"', '"Cormorant Garamond"', 'serif'],
      }
    },
  },
  plugins: [],
};
