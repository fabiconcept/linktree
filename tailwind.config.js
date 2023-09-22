/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        themeGreen: '#3AE09A',
        themeDark: '#3b3b3b',
        btnPrimary: '#8129D9',
        btnPrimaryAlt: '#5D18A2',
        themeYellow: '#F1BC00',
        themeYellowLight: '#FFF1BF',
      },
      width: {
        'clamp': 'clamp(15rem, 20rem, 25rem)',
      },
    },
  },
  plugins: [],
}
