/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'deathknight': '#C41E3A',
        'demonhunter': '#A330C9',
        'druid': '#FF7C0A',
        'evoker': '#33937F',
        'hunter': '#AAD372',
        'mage': '#3FC7EB',
        'monk': '#00FF98',
        'paladin': '#F48CBA',
        'priest': '#FFFFFF',
        'rogue': '#FFF468',
        'shaman': '#0070DD',
        'warlock': '#8788EE',
        'warrior': '#C69B6D'
      }
    }
  },
  plugins: [],
}

