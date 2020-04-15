const fs = require("fs");
const path = require("path");
let postcss = require("postcss");

let h = require("./helpers.js");

let classes = new Map();

module.exports = postcss.plugin("postcss-elm-tailwind", opts => {
  opts = h.cleanOpts(opts);

  return (root, result) => {
    // Transform CSS AST here
    root.walkRules(rule => {
      rule.selector
        .split(" ")
        .map(sel => sel.split(","))
        .reduce((arr, v) => (arr.push(...v), arr), [])
        .forEach(selector => processSelector(selector, opts));
    });

    writeMainFile(opts, classes);

    if (opts.formats.svg) {
      writeSvgFile(opts.formats.svg, classes);
    }

    if (opts.formats.string) {
      writeStringFile(opts.formats.string, classes);
    }
  };
});

function writeMainFile({ elmFile, elmModuleName }, classes) {
  const elmModule = h.elmHeaderHtml(elmModuleName, classes) +
    h.elmBody({ type: "Html.Attribute msg", fn: "A.class " }, classes);

  writeFile(elmFile, elmModule);
}

function writeSvgFile({ elmFile, elmModuleName }, classes) {
  const elmModule = h.elmHeaderSvg(elmModuleName, classes) +
    h.elmBody({ type: "Svg.Attribute msg", fn: "A.class " }, classes);

  writeFile(elmFile, elmModule);
}

function writeStringFile({ elmFile, elmModuleName }, classes) {
  const elmModule = h.elmHeaderString(elmModuleName, classes) +
    h.elmBody({ type: "String", fn: "" }, classes);

  writeFile(elmFile, elmModule);
}

function writeFile(fname, content) {
  folder = path.dirname(fname);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  fs.writeFile(fname, content, err => {
    if (err) {
      return console.log(err);
    }
    console.log(fname, "was saved!");
  });
}

function processSelector(selector, opts) {
  if (!selector.startsWith(".")) {
    // Keep only classes
    return;
  }

  let cls, elm;

  cls = h.fixClass(selector);
  elm = h.toElmName(cls, opts);

  classes.set(cls, elm);
}
