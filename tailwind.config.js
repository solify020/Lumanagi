/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "var(--background, linear-gradient(135deg, #414593 0%, #00022E 100%))",
      },
      colors: {
        defaultButtongBg: "rgba(37, 157, 168, 0.08)",
        primary: {
          "900-high-emphasis": "#259DA8",
          "900-medium-emphasis": "#1E7E87",
        },
        "foreground-night": {
          100: "rgba(255, 255, 255, 0.03)",
          400: "rgba(255, 255, 255, 0.13)",
        },
        background: "linear-gradient(135deg, #414593 0%, #00022E 100%)",
      },
      boxShadow: {
        custom:
          "0px 40.26560592651367px 50.332008361816406px -2.5166003704071045px rgba(0, 0, 0, 0.08), 0px 1.2583001852035522px 1.2583001852035522px 0px rgba(0, 0, 0, 0.08)",
      },
      fontFamily: {
        poppins: ["Poppins"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        xxs: "0.70rem",
        1.25831: "1.25831rem",
        lg: "1.125rem",
      },
      spacing: {
        "20.58369rem": "20.58369rem",
        1.25831: "0.315rem",
      },
      lineHeight: {
        2.202: "2.202rem",
        1.1875: "1.1875rem",
        12: 3.2,
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '100%': '100%',
      }
    },
  },
  plugins: [],
};
