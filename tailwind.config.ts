import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { layout, navbar } from "./src/app/_components/shared";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: ["class"],
  theme: {
    colors: {
      text: "var(--text)",
      background: "var(--background)",
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      accent: "var(--accent)",
    },
    extend: {
      height: {
        "screen-without-navbar": `calc(100dvh - ${navbar.height} - ${layout.paddingTop} - ${layout.paddingBottom})`,
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
