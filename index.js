const fs = require("fs");
const path = require("path");
let postcss = require("postcss");

let h = require("./helpers.js");

let classes = new Map();
let elmFns = new Set();

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

    writeMainFile(opts, elmFns, classes);

    if (opts.formats.svg) {
      writeSvgFile(opts.formats.svg, elmFns, classes);
    }

    if (opts.formats.string) {
      writeStringFile(opts.formats.string, elmFns, classes);
    }
  };
});

function writeMainFile({ elmFile, elmModuleName }, elmFns, classes) {
  const elmModule = h.elmHeaderHtml(elmModuleName, elmFns) +
    h.elmBody({ type: "Html.Attribute msg", fn: "A.class " }, classes);

  writeFile(elmFile, elmModule);
}

function writeSvgFile({ elmFile, elmModuleName }, elmFns, classes) {
  const elmModule = h.elmHeaderSvg(elmModuleName, elmFns) +
    h.elmBody({ type: "Svg.Attribute msg", fn: "A.class " }, classes);

  writeFile(elmFile, elmModule);
}

function writeStringFile({ elmFile, elmModuleName }, elmFns, classes) {
  const elmModule = h.elmHeaderString(elmModuleName, elmFns) +
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
  elmFns.add(elm);
}
