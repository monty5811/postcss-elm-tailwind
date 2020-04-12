const h = require("../helpers");
var assert = require("assert");

describe("cleanOpts", () => {
  it("should return default config if none supplied", () => {
    assert.deepEqual(h.cleanOpts(undefined), {
      elmFile: "src/TW.elm",
      elmModuleName: "TW",
      prefix: "",
      nameStyle: "snake",
      svg: false
    });
  });
  it("should not override elmFile", () => {
    assert.deepEqual(h.cleanOpts({ elmFile: "src/NotTW.elm" }), {
      elmFile: "src/NotTW.elm",
      elmModuleName: "TW",
      prefix: "",
      nameStyle: "snake",
      svg: false
    });
  });
  it("should not override prefix", () => {
    assert.deepEqual(h.cleanOpts({ prefix: "tw--" }), {
      elmFile: "src/TW.elm",
      elmModuleName: "TW",
      prefix: "tw--",
      nameStyle: "snake",
      svg: false
    });
  });
});

describe("fixClass", () => {
  it("should let container pass through", () => {
    assert.equal(h.fixClass("container"), "container");
  });
  it("should let mx-auto pass through", () => {
    assert.equal(h.fixClass("mx-auto"), "mx-auto");
  });
  it("responsive", () => {
    assert.equal(h.fixClass("sm:mx-auto"), "sm:mx-auto");
  });
  it("responsive and focus", () => {
    assert.equal(
      h.fixClass(".xl:focus:no-underline:focus"),
      "xl:focus:no-underline"
    );
  });
  it("with prefix", () => {
    assert.equal(
      h.fixClass(".hover:tw-bg-blue-500:hover"),
      "hover:tw-bg-blue-500"
    );
  });
  it("ratio", () => {
    assert.equal(h.fixClass(".w-1\\/2"), "w-1/2");
  });
  // regression tests for github issue #7:
  it("handle variants", () => {
    assert.equal(
      h.fixClass(".xl:odd:tw-bg-pink-700:nth-child(odd)"),
      "xl:odd:tw-bg-pink-700"
    );
    assert.equal(
      h.fixClass(".lg:even:bg-pink-700:nth-child(even)"),
      "lg:even:bg-pink-700"
    );
    assert.equal(
      h.fixClass(".last:tw-bg-transparent:last-child"),
      "last:tw-bg-transparent"
    );
  });
  // regession tests for github issue #13
  it("handle '.' in class names", () => {
    assert.equal(h.fixClass(".col-gap-1\\.5"), "col-gap-1.5");
  });
  // regression test for font awesome (and a lot of other stuff)
  it("handle '>' in class names", () => {
    assert.equal(h.fixClass("fa > li"), "fa");
    assert.equal(h.fixClass("fa >li"), "fa");
    assert.equal(h.fixClass("fa> li"), "fa");
  });
});

describe("fixClass -> toElmName", () => {
  const camelCaseOpts = { ...h.defaultOpts, nameStyle: "camel" };
  it("should let container pass through", () => {
    assert.equal(h.toElmName(h.fixClass("container")), "container");
  });
  it("should let mx-auto pass through", () => {
    assert.equal(h.toElmName(h.fixClass("mx-auto")), "mx_auto");
  });
  it("should let mx-auto pass through camel case", () => {
    assert.equal(h.toElmName(h.fixClass("mx-auto"), camelCaseOpts), "mxAuto");
  });
  it("responsive", () => {
    assert.equal(h.toElmName(h.fixClass("sm:mx-auto")), "sm__mx_auto");
  });
  it("responsive and focus", () => {
    assert.equal(
      h.toElmName(h.fixClass(".xl:focus:no-underline:focus")),
      "xl__focus__no_underline"
    );
  });
  it("over", () => {
    assert.equal(h.toElmName(h.fixClass(".w-1\\/2")), "w_1over2");
  });
  it("negative", () => {
    assert.equal(h.toElmName(h.fixClass(".-m-1")), "neg_m_1");
  });
  it("negative with variant .sm:-m-24", () => {
    assert.equal(h.toElmName(h.fixClass(".sm:-m-24")), "sm__neg_m_24");
  });
  it("negative with variant .sm:-translate-x-1", () => {
    assert.equal(
      h.toElmName(h.fixClass(".sm:-translate-x-1")),
      "sm__neg_translate_x_1"
    );
  });
  it("with prefix", () => {
    assert.equal(
      h.toElmName(h.fixClass(".hover:tw-bg-blue-500:hover"), "tw-"),
      "hover__tw_bg_blue_500"
    );
  });
  it("negative with prefix and variant .xl:tw--my-64", () => {
    assert.equal(
      h.toElmName(h.fixClass(".xl:tw--my-64"), {
        ...h.defaultOpts,
        prefix: "tw-"
      }),
      "xl__tw_neg_my_64"
    );
  });
  it("negative with prefix and variant .xl:tw--my-64 camel", () => {
    assert.equal(
      h.toElmName(h.fixClass(".xl:tw--my-64"), {
        ...camelCaseOpts,
        prefix: "tw-"
      }),
      "xlTwNegMy64"
    );
  });
  it("not-negative with prefix .xl:tw-my-64", () => {
    assert.equal(
      h.toElmName(h.fixClass(".xl:tw-my-64"), {
        ...h.defaultOpts,
        prefix: "-tw"
      }),
      "xl__tw_my_64"
    );
  });
  it("cursor-pointer", () => {
    assert.equal(h.toElmName(h.fixClass(".cursor-pointer")), "cursor_pointer");
  });
  it("font-medium", () => {
    assert.equal(h.toElmName(h.fixClass(".font-medium")), "font_medium");
  });
  // regression tests for github issue #7:
  it("handle variants", () => {
    assert.equal(
      h.toElmName(h.fixClass(".xl\:odd\:tw-bg-pink-700:nth-child(odd)")),
      "xl__odd__tw_bg_pink_700"
    );
    assert.equal(
      h.toElmName(h.fixClass(".lg\:even\:tw-bg-pink-700:nth-child(even)")),
      "lg__even__tw_bg_pink_700"
    );
    assert.equal(
      h.toElmName(h.fixClass(".last\:tw-bg-transparent:last-child")),
      "last__tw_bg_transparent"
    );
  });
  // regession tests for github issue #13
  it("handle '.' in class names", () => {
    assert.equal(h.toElmName(h.fixClass(".col-gap-1\\.5")), "col_gap_1_dot_5");
  });
  // regression test for font awesome (and a lot of other stuff)
  it("handle '>' in class names", () => {
    assert.equal(h.toElmName(h.fixClass("fa > li")), "fa");
    assert.equal(h.toElmName(h.fixClass("fa> li")), "fa");
    assert.equal(h.toElmName(h.fixClass("fa >li")), "fa");
  });
});
