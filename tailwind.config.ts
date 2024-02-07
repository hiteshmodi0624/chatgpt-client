import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors:{
        seperator:"rgb(38,38,38)",
        gray:"#121212",
        gray2:"#1E1E1E",
        grey:"#71767A",
        primary:"#0023FF",
        primary2:"#006AFF"
      },
    },
  },
  plugins: [],
} satisfies Config;
