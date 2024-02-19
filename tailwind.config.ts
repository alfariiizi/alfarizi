import tailwindTypography from "@tailwindcss/typography";
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { layout, navbar } from "./src/app/_components/shared";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        text: "var(--text)",
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },
      height: {
        "screen-without-navbar": `calc(100dvh - ${navbar.height} - ${layout.paddingTop} - ${layout.paddingBottom})`,
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "80ch", // add required value here
            fontSize: "18px",
          },
        },
      },
    },
  },
  plugins: [tailwindTypography],
} satisfies Config;
