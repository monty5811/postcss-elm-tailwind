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

function elmBody(classes) {
  let body = "";
  for (var fn of classes.values()) {
    body = body + fn;
  }
  return body;
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

function fixClass(cls) {
  // remove the dot
  cls = cls.replace(/^(\.)/, "");
  // remove extras at end
  cls = cls.replace(
    /\:(responsive|group-hover|focus-within|first|last|odd|even|hover|focus|active|visited|disabled)$/,
    ""
  );
  // remove extras at end
  cls = cls.replace(/\::(placeholder)$/, "");
  // make \/ safe for elm
  cls = cls.replace(/\\([/])/g, "\\\\$1");
  // make \: safe for elm
  cls = cls.replace(/\\([:])/g, "$1");
  cls = cls.replace(
    /^(responsive|group-hover|focus-within|first|last|odd|even|hover|focus|active|visited|disabled)\\\\:/,
    "$1:"
  );
  return cls;
}

function toElmName(cls) {
  var elm = cls.split("\\\\:").join("_");
  elm = elm.replace(/^-([p|m])/, "neg_$1"); // handle negative at start of string
  elm = elm.replace(/-([p|m])/, "_neg_$1"); // handle negative with prefix and/or variant
  elm = elm.replace(/-/g, "_");
  elm = elm.replace(/:/g, "_");
  elm = elm.replace(/\\\\\//g, "over");
  elm = elm.replace(/\\__/g, "_");
  elm = elm.replace(/__/g, "_"); // cleanup
  return elm;
}

exports.elmHeader = elmHeader;
exports.elmBody = elmBody;
exports.elmFunction = elmFunction;
exports.fixClass = fixClass;
exports.toElmName = toElmName;
