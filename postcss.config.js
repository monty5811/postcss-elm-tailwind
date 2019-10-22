var process = require("process");

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("./index.js")({
      elmFile: "src/TW.elm"
    })
  ]
};
