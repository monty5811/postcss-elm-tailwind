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
      if (!rule.selector.startsWith(".")) {
        // keep only classes
        return;
      }

      let cls = rule.selector;

      cls = h.fixClass(cls);
      elm = h.toElmName(cls, opts.prefix);

      classes.set(cls, h.elmFunction(cls, elm));
      elm_fns.push(elm);
    });

    const elmModule =
      h.elmHeader(opts.elmModuleName, elm_fns) + h.elmBody(classes);

    // writing to disk
    fs.writeFile(opts.elmFile, elmModule, err => {
      if (err) {
        return console.log(err);
      }

      console.log(opts.elmFile, "was saved!");
    });
  };
});
