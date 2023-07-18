/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'background': '#1fb6ff',
      'gray': '#404959',
      'gray-light': '#A3AED0',
      'primary': '#422AFB',
      'secondary': '#D0DDFB',
      'tertiary': '#F4F7FE',
      'primary-text': '#285DFF',
      'white': '#FFFFFF',
    }
  },
  plugins: [],
}
