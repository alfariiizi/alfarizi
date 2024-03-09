import tailwindTypography from "@tailwindcss/typography";
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { layout, navbar } from "./src/app/_components/shared";
import { colorsAlternative } from "./src/lib/colors-alternative";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        ...colorsAlternative,
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      height: {
        "screen-without-navbar": `calc(100dvh - ${navbar.height} - ${layout.paddingTop} - ${layout.paddingBottom})`,
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        display: ["var(--font-display)"],
        // display: ["var(--font-geist-sans)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      // [Typography]
      typography: {
        // customize typography
        // https://stackoverflow.com/questions/66594385/how-do-i-modify-the-default-styling-of-the-typography-prose-class-in-tailwindcss?newreg=53bd1cf2d09943f8b35b0528c1a0794c
        DEFAULT: {
          css: {
            width: "100%",
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
            width: "100%", // add required value here
            fontSize: "16px",
          },
        },
      },
    },
  },
  plugins: [tailwindTypography],
} satisfies Config;
