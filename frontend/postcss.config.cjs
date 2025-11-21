module.exports = {
  plugins: [
    // new PostCSS adapter for Tailwind
    require("@tailwindcss/postcss")(),
    require("autoprefixer")(),
  ],
};
