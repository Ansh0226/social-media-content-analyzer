// postcss.config.js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {}, // ✅ correct Tailwind v4 PostCSS plugin
    autoprefixer: {}, // optional but fine to keep
  },
};
