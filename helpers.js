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

function toElmName(cls, prefix) {
  if (!prefix) {
    prefix = "";
  }
  re_neg_with_prefix = new RegExp(`(${prefix})-([p|m])`);

  var elm = cls;
  // handle negative with prefix
  elm = elm.replace(re_neg_with_prefix, "$1neg_$2");
  // handle negative at start of string
  elm = elm.replace(/^-([p|m])/, "_neg_$1");
  // replace dashes now we have sorted the negative stuff
  elm = elm.replace(/-/g, "_");
  // replace :
  elm = elm.replace(/:/g, "_");
  // handle fractions
  elm = elm.replace(/\\\\\//g, "over");
  // clean up
  elm = elm.replace(/\\__/g, "_");
  elm = elm.replace(/^_/g, "");
  return elm;
}

exports.elmHeader = elmHeader;
exports.elmBody = elmBody;
exports.elmFunction = elmFunction;
exports.fixClass = fixClass;
exports.toElmName = toElmName;
