import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.5rem',
        md: '2.5rem',
      },
    },
    extend: {
      colors: {
        'main': '#ab4725',
      },
    },
  },
  plugins: [],
};
export default config;
