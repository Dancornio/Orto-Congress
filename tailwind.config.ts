import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        clinic: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#bcd9ff",
          300: "#8abefb",
          400: "#5aa0f3",
          500: "#2f79e6",
          600: "#1f5fc9",
          700: "#1a4ca1",
          800: "#1b3f7f",
          900: "#1b335f"
        },
        rehab: {
          50: "#edfff9",
          100: "#ccfbed",
          200: "#9cf3db",
          300: "#5fe4c2",
          400: "#2fc7a3",
          500: "#1ba383",
          600: "#13826a",
          700: "#126757",
          800: "#125447",
          900: "#0f443b"
        },
        accent: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706"
        }
      },
      boxShadow: {
        soft: "0 20px 50px -30px rgba(15, 23, 42, 0.4)",
        card: "0 16px 40px -28px rgba(15, 23, 42, 0.45)"
      },
      borderRadius: {
        xl: "1.25rem"
      }
    }
  },
  plugins: []
};

export default config;
