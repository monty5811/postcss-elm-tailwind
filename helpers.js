function elmHeader(elmModuleName, elm_fns) {
  const s = new Set(elm_fns);
  let tmp = Array.from(s.values());
  tmp.push("classList");
  const l = tmp.join("\n    , ");

  return `module ${elmModuleName} exposing
    ( ${l}
    )

import Html
import Html.Attributes as A


classList : List (Html.Attribute msg, Bool) -> List (Html.Attribute msg)
classList classes =
    List.map Tuple.first <| List.filter Tuple.second classes

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
  //
  cls = cls.replace(/\\\//g, "/");
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
  var elm = cls;
  // handle negative with prefix
  if (prefix) {
    re_neg_with_prefix = new RegExp(`(${prefix})-([p|m])`);
    elm = elm.replace(re_neg_with_prefix, "$1neg_$2");
  }
  // handle negative at start of string
  elm = elm.replace(/^-([p|m])/, "_neg_$1");
  // handle negative with variant
  elm = elm.replace(/:-([p|m])/, "_neg_$1");
  // replace dashes now we have sorted the negative stuff
  elm = elm.replace(/-/g, "_");
  // replace :
  elm = elm.replace(/:/g, "_");
  // handle fractions
  elm = elm.replace(/\//g, "over");
  // clean up
  elm = elm.replace(/\\__/g, "_");
  elm = elm.replace(/^_/g, "");
  return elm;
}

function cleanOpts(opts) {
  const defaultOpts = {
    elmFile: "src/TW.elm",
    elmModuleName: "TW",
    prefix: ""
  };
  if (opts === undefined) {
    opts = defaultOpts;
  }
  if (!opts.elmFile) {
    opts.elmFile = defaultOpts.elmFile;
  }
  if (!opts.prefix) {
    opts.prefix = defaultOpts.prefix;
  }
  if (!opts.elmModuleName) {
    opts.elmModuleName = defaultOpts.elmModuleName;
  }
  return opts;
}

exports.elmHeader = elmHeader;
exports.elmBody = elmBody;
exports.elmFunction = elmFunction;
exports.fixClass = fixClass;
exports.toElmName = toElmName;
exports.cleanOpts = cleanOpts;
