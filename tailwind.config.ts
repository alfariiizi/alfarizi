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
        display: ["var(--font-display)"],
      },
      typography: {
        // customize typography
        // https://stackoverflow.com/questions/66594385/how-do-i-modify-the-default-styling-of-the-typography-prose-class-in-tailwindcss?newreg=53bd1cf2d09943f8b35b0528c1a0794c
        DEFAULT: {
          css: {
            maxWidth: "80ch", // add required value here
            fontSize: "1rem",
            // "&:hover": {
            //   // could be any. It's like extending css selector
            //   color: "#F7941E",
            // },
          },
        },
        sm: {
          css: {
            fontSize: "16px",
          },
        },
      },
    },
  },
  plugins: [tailwindTypography],
} satisfies Config;
