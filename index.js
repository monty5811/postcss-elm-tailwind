const fs = require("fs");
let postcss = require("postcss");

function fixClass(cls) {
  var oldCls = cls;
  cls = cls.replace(
    /\:(responsive|group-hover|focus-within|first|last|odd|even|hover|focus|active|visited|disabled)$/,
    ""
  ); // remove extras at end
  cls = cls.replace(/\::(placeholder)$/, ""); // remove extras at end
  cls = cls.replace(/\\([/])/g, "\\\\$1"); // make \/ safe for elm
  cls = cls.replace(/\\([:])/g, "$1"); // make \: safe for elm
  cls = cls.replace(
    /^(responsive|group-hover|focus-within|first|last|odd|even|hover|focus|active|visited|disabled)\\\\:/,
    "$1:"
  );
  return cls;
}

function elmFunction(cls, elm) {
  return `
{-|Tailwind class:
    ${cls}"
-}
${elm} : Html.Attribute msg
${elm} =
    A.class "${cls}"

`;
}

function elmBody(classes) {
  let body = "";
  for (var fn of classes.values()) {
    body = body + fn;
  }
  return body;
}

function elmHeader(elm_fns) {
  const s = new Set(elm_fns);
  const l = Array.from(s.values()).join("\n    , ");
  const d = Array.from(s.values()).join(", ");

  return `module TW exposing
    ( ${l}
    )

{-| This library exports helper utilities - one for each tailwindcss class.

# Example

    Html.div [TW.container, TW.mx_auto] []

will result in a centred container.

@docs ${d}
-}

import Html
import Html.Attributes as A

`;
}

let classes = new Map();
let elm_fns = new Array();

module.exports = postcss.plugin(
  "postcss-elm-tailwind",
  (opts = { elmFile }) => {
    // Work with options here
    opts.elmFile = "src/TW.elm";

    return (root, result) => {
      // Transform CSS AST here
      root.walkRules(rule => {
        if (!rule.selector.startsWith(".")) {
          // keep only classes
          return;
        }

        let cls = rule.selector;

        // remove the dot
        cls = cls.replace(/^(\.)/, "");
        // keep only up to a comma or a space
        cls = fixClass(cls);

        var elm = cls.split("\\\\:").join("_");
        elm = elm.replace(/^-/, "neg_");
        elm = elm.replace(/-/g, "_");
        elm = elm.replace(/:/g, "_");
        elm = elm.replace(/\\\\\//g, "over");
        elm = elm.replace(/\\__/, "_");

        classes.set(cls, elmFunction(cls, elm));
        elm_fns.push(elm);
      });

      const elmModule = elmHeader(elm_fns) + elmBody(classes);

      // writing to disk
      fs.writeFile(opts.elmFile, elmModule, err => {
        if (err) {
          return console.log(err);
        }

        console.log(opts.elmFile, "was saved!");
      });
    };
  }
);
