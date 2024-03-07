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
        foreground: "hsl(var(--foreground))",
        background: "hsl(var(--background))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        "purple-alternative": {
          100: "#e8e4f0",
          200: "#d2cae1",
          300: "#bbafd3",
          400: "#a595c4",
          500: "#8e7ab5",
          600: "#726291",
          700: "#55496d",
          800: "#393148",
          900: "#1c1824",
        },
        "red-alternative": {
          100: "#fcdfde",
          200: "#fabfbe",
          300: "#f79f9d",
          400: "#f57f7d",
          500: "#f25f5c",
          600: "#c24c4a",
          700: "#913937",
          800: "#612625",
          900: "#301312",
        },
        "blue-alternative": {
          100: "#d3e5ec",
          200: "#a7cad9",
          300: "#7cb0c6",
          400: "#5095b3",
          500: "#247ba0",
          600: "#1d6280",
          700: "#164a60",
          800: "#0e3140",
          900: "#071920",
        },
        "yellow-alternative": {
          100: "#fef3d5",
          200: "#fde7ab",
          300: "#fbda82",
          400: "#face58",
          500: "#f9c22e",
          600: "#c79b25",
          700: "#95741c",
          800: "#644e12",
          900: "#322709",
        },
      },
      height: {
        "screen-without-navbar": `calc(100dvh - ${navbar.height} - ${layout.paddingTop} - ${layout.paddingBottom})`,
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        display: ["var(--font-display)"],
        // display: ["var(--font-geist-sans)"],
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
