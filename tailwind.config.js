/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          color01: "#162A41",
          color03: "#162A41",
          color04: "#162A41",
          color05: "#FA983A",
          red: "#F21515",
          green: "#15F26E",
          orange: "#dd4b39",
          facebook: "#3B5999",
        },
        heading: {
          head01: "263048",
          head02: "2A2C30",
        },
        paragraph: {
          para01: "333333",
          para02: "7B7B7B",
          para03: "D5E0EA",
        },
        background: {
          bg01: "#F8F8FB",
          bg02: "#F9FCFF",
          bg03: "#25517A",
        },
        shape: {
          shape01: "#D3DEE8",
          shape02: "#EEF7FF",
          shape03: "#33628D",
        },
        multiply: {
          bg1: "#33485C",
          bg2: "#51789D",
          bg3: "#465F78",
          bg4: "#444444",
          bg5: "#455463",
        },
        energyLabel: {
          A: "#00A650",
          B: "#FDB913",
          C: "#F37021",
          D: "#ED1C24",
        },
      },
    },
  },
  plugins: [],
};
