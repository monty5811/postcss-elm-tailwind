const path = require("path");
const resolveConfig = require("tailwindcss/resolveConfig");
const { elmBodyHtml, elmBodyString, elmBodySvg}  = require("./code-gen.js")

const defaultOpts = {
  tailwindConfig: null,
  splitByScreens: true,
  elmFile: "src/TW.elm",
  elmModuleName: "TW",
  prefix: "",
  nameStyle: "snake",
  formats: {
    /*
      string: {
        elmFile: "src/TW/String.elm",
      },
      svg: {
        elmFile: "src/TW/Svg.elm",
      }
    */
  },
};

function cleanOpts(opts) {
  opts = { ...defaultOpts, ...opts };
  opts.formats = { ...opts.formats };
  // grab resolved tailwind config:
  if (opts.tailwindConfig === null) {
    throw new Error("Failed to specify Tailwind config file. Add a `tailwindConfig` key to your config.");
  }
  const twConfig = resolveConfig(require(path.resolve(opts.tailwindConfig)));
  opts.prefix = twConfig.prefix;
  opts.screens = Object.keys(twConfig.theme.screens);
  
  return opts;
}

function formats(opts) {
  return [
    cleanFormat(opts, elmBodyHtml),
    cleanFormat({ ...opts.formats.string }, elmBodyString),
    cleanFormat({ ...opts.formats.svg }, elmBodySvg),
  ].filter((f) => f);
}

function cleanFormat({ elmFile, elmModuleName }, elmBodyFn) {
  if (!elmFile) return false;
  if (!elmModuleName) return false;
  return { elmFile, elmModuleName, elmBodyFn };
}

exports.cleanOpts = cleanOpts;
exports.defaultOpts = defaultOpts;
exports.formats = formats;
