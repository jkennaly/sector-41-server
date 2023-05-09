module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        backgroundImage: theme => ({

         'crowd-stage': "url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Crowd_watching_The_Proclaimers%2C_Towersey_2018.jpg/1280px-Crowd_watching_The_Proclaimers%2C_Towersey_2018.jpg')"
        })
      },
  },
  variants: {
    extend: {},
  },
  plugins: [
  	require('@tailwindcss/forms')
  ],
}
