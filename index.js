const fs = require("fs");
let postcss = require("postcss");

let h = require("./helpers.js");

let classes = new Map();
let elm_fns = new Array();

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

    const htmlOrSvg = opts.svg ? 'Svg' : 'Html';

    const elmModule = h.elmHeader(opts.elmModuleName, elm_fns, htmlOrSvg) +
      h.elmBody(classes);

    // writing to disk
    fs.writeFile(opts.elmFile, elmModule, err => {
      if (err) {
        return console.log(err);
      }

      console.log(opts.elmFile, "was saved!");
    });
  };
});

function processSelector(selector, opts) {
  if (!selector.startsWith(".")) {
    // Keep only classes
    return;
  }

  const htmlOrSvg = opts.svg ? 'Svg' : 'Html';

  let cls, elm;

  cls = h.fixClass(selector);
  elm = h.toElmName(cls, opts);

  classes.set(cls, h.elmFunction(cls, elm, htmlOrSvg));
  elm_fns.push(elm);
}
