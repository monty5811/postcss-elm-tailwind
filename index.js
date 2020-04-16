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

    h.formats(opts).forEach(
      ({ elmFile, elmModuleName, elmBodyFn }) =>
        writeFile(elmFile, elmBodyFn(elmModuleName, classes))
    );
  };
});

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
