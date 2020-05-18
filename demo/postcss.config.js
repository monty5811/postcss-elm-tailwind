module.exports = {
  plugins: [
    require("tailwindcss"),
    require("../index.js")({
      elmFile: "src/TLWND.elm",
      elmModuleName: "TLWND",
      prefix: "tw-",
      formats: {
        svg: {
          elmFile: "src/TLWND/Svg.elm",
          elmModuleName: "TLWND.Svg"
        },
        string: {
          elmFile: "src/TLWND/String.elm",
          elmModuleName: "TLWND.String"
        }
      }
    }),
    require("autoprefixer")
  ]
};
