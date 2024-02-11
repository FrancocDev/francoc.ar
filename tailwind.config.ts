import type { Config } from "tailwindcss";
//@ts-ignore
import animations from "@midudev/tailwind-animations";


const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "rotate-360": "rotate-360 1s linear"
      },
      "rotate-360": {
        "0%": {
          "transform": "rotate(0deg)"
        },
        "100%": {
          "transform": "rotate(360deg)"
        }
      }
    },
  },
  plugins: [animations],
  
};
export default config;
