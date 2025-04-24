/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        "max-640": { max: "640px" },
      },
      height: {
        120: "450px",
        cart: "480px",
        logins: "430px",
      },
      colors: {
        btns: "#586070",
        inputborders: "#F0EAE4",
        transparent: "#66586070",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5e00ff",

          secondary: "#0068d1",

          accent: "#AF8F6F",

          neutral: "#1c1b15",

          "base-100": "#F0EAE4",

          info: "#00edff",

          success: "#00e790",

          warning: "#e6bf00",

          error: "#fc094b",
        },
      },
    ],
  },
};
