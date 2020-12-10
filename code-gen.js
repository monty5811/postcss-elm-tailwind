function elmBodyHtml(elmModuleName, classes) {
  return elmHeaderHtml(elmModuleName, classes) +
    elmBody({ type: "Html.Attribute msg", fn: "A.class " }, classes);
}

function elmBodyString(elmModuleName, classes) {
  return elmHeaderString(elmModuleName, classes) +
    elmBody({ type: "String", fn: "" }, classes);
}

function elmBodySvg(elmModuleName, classes) {
  return elmHeaderSvg(elmModuleName, classes) +
    elmBody({ type: "Svg.Attribute msg", fn: "A.class " }, classes);
}

function elmHeaderExports(elmFns, includeClassList) {
  let tmp = Array.from(elmFns.values()).map(o => o.elm);
  if (includeClassList) {
    tmp.push("classList");
  }
  tmp.sort();
  return tmp.join("\n    , ");
}

function elmHeaderHtml(elmModuleName, elmFns) {
  l = elmHeaderExports(elmFns, true);

  return `module ${elmModuleName} exposing
    ( ${l}
    )

import Html
import Html.Attributes as A


classList : List ( Html.Attribute msg, Bool ) -> List (Html.Attribute msg)
classList classes =
    List.map Tuple.first <| List.filter Tuple.second classes
`;
}

function elmHeaderSvg(elmModuleName, elmFns) {
  l = elmHeaderExports(elmFns, true);

  return `module ${elmModuleName} exposing
    ( ${l}
    )

import Svg
import Svg.Attributes as A


classList : List ( Svg.Attribute msg, Bool ) -> List (Svg.Attribute msg)
classList classes =
    List.map Tuple.first <| List.filter Tuple.second classes
`;
}

function elmHeaderString(elmModuleName, elmFns) {
  l = elmHeaderExports(elmFns, false);

  return `module ${elmModuleName} exposing
    ( ${l}
    )
`;
}

function elmBody(config, classes) {
  let body = "";
  for (let [cls, {elm}] of classes) {
    body = body + elmFunction(config, { cls, elm });
  }
  return body;
}

function elmFunction(config, { cls, elm }) {
  return `

${elm} : ${config.type}
${elm} =
    ${config.fn}"${cls}"
`;
}

// parse, clean up stuff

function fixClass(cls) {
  // remove the dot
  cls = cls.replace(/^(\.)/, "");
  // make other dots safe
  cls = cls.replace(/\\\./g, ".");
  // remove > anything
  cls = cls.replace(/\s?>\s?.*/, "");
  // remove pseudo-elements (::)
  cls = cls.replace(/::.*$/, "");
  // remove not pseudo-classes (:not())
  cls = cls.replace(/:not\([^\)]*\)/g, "");
  // remove pseudo-classes (:)
  cls = cls.replace(
    /(:(active|after|before|checked|disabled|focus|focus-within|hover|visited|nth-child\((even|odd)\)|(first|last)-child))+$/,
    ""
  );
  // make / safe for elm
  cls = cls.replace(/\\\//g, "/");
  // make \/ safe for elm
  cls = cls.replace(/\\([/])/g, "\\\\$1");
  // make \: safe for elm
  cls = cls.replace(/\\([:])/g, "$1");
  return cls;
}

function toScreen(cls, opts) {
    let screen = null;
    for (let index = 0; index < opts.screens.length; index++) {
      const currentScreen = opts.screens[index];
      if (cls.includes(`${currentScreen}:`)) {
        screen = currentScreen;
      }
    }
    return screen;
}

function toElmName(cls, opts) {
  var elm = cls;
  // handle negative with prefix
  if (opts.prefix) {
    let re_neg_with_prefix = new RegExp(`(${opts.prefix})-([a-z])`);
    elm = elm.replace(re_neg_with_prefix, "$1neg_$2");
  }
  // handle negative at start of string
  elm = elm.replace(/^-([a-z])/, "_neg_$1");
  // handle negative with variant
  elm = elm.replace(/:-([a-z])/, "__neg_$1");
  // replace dashes now we have sorted the negative stuff
  elm = elm.replace(/-/g, "_");
  // replace :
  elm = elm.replace(/:/g, "__");
  // handle fractions
  elm = elm.replace(/\//g, "over");
  // clean up
  elm = elm.replace(/\\__/g, "_");
  elm = elm.replace(/^_/g, "");
  // handle :nth-child(even), etc
  elm = elm.replace(/_nth_child\(.+\)/, "");
  elm = elm.replace(/_(last|first)_child/, "");
  // replace any other dots
  if (opts.nameStyle === "camel") {
    elm = elm.replace(/\./g, "Dot");
  } else {
    elm = elm.replace(/\./g, "_dot_");
  }
  // remove screens prefix
  if (opts.splitByScreens) {
    const screens_re = RegExp(`(${opts.screens.join("|")})__`);
    elm = elm.replace(screens_re, '');
  }
  // convert to camel case
  if (opts.nameStyle === "camel") {
    elm = elm.replace(/(_+\w)/g, (g) => g.replace(/_/g, "").toUpperCase());
  }
  return elm;
}

exports.elmBodyHtml = elmBodyHtml;
exports.elmBodyString = elmBodyString;
exports.elmBodySvg = elmBodySvg;
exports.elmFunction = elmFunction;
exports.fixClass = fixClass;
exports.toElmName = toElmName;
exports.toScreen = toScreen;
