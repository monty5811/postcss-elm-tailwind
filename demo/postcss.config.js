var process = require("process");
const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: ["./index.html", "./dist/app.js"],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("../index.js")({
      elmFile: "src/TLWND.elm",
      elmModuleName: "TLWND",
      prefix: "tw-"
    }),
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
    require("autoprefixer")
  ]
};
