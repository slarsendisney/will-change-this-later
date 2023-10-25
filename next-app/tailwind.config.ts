import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'honolulu-blue': 'rgb(0, 124, 193)',
        'white': 'rgba(255, 255, 255, 0.66)',
        'white-2': 'rgb(255, 255, 255)',
        'armor': 'rgb(115, 127, 133)',
        'armor-2': 'rgba(115, 127, 133, 0.4)',
        'blackwater': 'rgb(81, 89, 93)',
        'fiord': ' rgb(80, 88, 92)',
        'aztec': 'rgb(45, 50, 52)',
        'aztec-2': ' rgb(44, 49, 51)',
      }
    },
  },
  plugins: [],
}
export default config
