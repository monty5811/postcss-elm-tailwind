const h = require("../helpers");
var assert = require("assert");


describe("cleanOpts", () => {
  it("should return default config if none supplied", () => {
    assert.deepEqual(h.cleanOpts(undefined), {
      elmFile: "src/TW.elm",
      elmModuleName: "TW",
      prefix: "",
      nameStyle: "snake"
    });
  });
  it("should not override elmFile", () => {
    assert.deepEqual(h.cleanOpts({ elmFile: "src/NotTW.elm" }), {
      elmFile: "src/NotTW.elm",
      elmModuleName: "TW",
      prefix: "",
      nameStyle: "snake"
    });
  });
  it("should not override prefix", () => {
    assert.deepEqual(h.cleanOpts({ prefix: "tw--" }), {
      elmFile: "src/TW.elm",
      elmModuleName: "TW",
      prefix: "tw--",
      nameStyle: "snake"
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
});

describe("fixClass -> toElmName", () => {
  const camelCaseOpts = {...h.defaultOpts, nameStyle: "camel"};
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
    assert.equal(h.toElmName(h.fixClass("sm:mx-auto")), "sm_mx_auto");
  });
  it("responsive and focus", () => {
    assert.equal(
      h.toElmName(h.fixClass(".xl:focus:no-underline:focus")),
      "xl_focus_no_underline"
    );
  });
  it("over", () => {
    assert.equal(h.toElmName(h.fixClass(".w-1\\/2")), "w_1over2");
  });
  it("negative", () => {
    assert.equal(h.toElmName(h.fixClass(".-m-1")), "neg_m_1");
  });
  it("negative with variant .sm:-m-24", () => {
    assert.equal(h.toElmName(h.fixClass(".sm:-m-24")), "sm_neg_m_24");
  });
  it("negative with variant .sm:-translate-x-1", () => {
    assert.equal(h.toElmName(h.fixClass(".sm:-translate-x-1")), "sm_neg_translate_x_1");
  });
  it("with prefix", () => {
    assert.equal(
      h.toElmName(h.fixClass(".hover:tw-bg-blue-500:hover"), "tw-"),
      "hover_tw_bg_blue_500"
    );
  });
  it("negative with prefix and variant .xl:tw--my-64", () => {
    assert.equal(
      h.toElmName(h.fixClass(".xl:tw--my-64"), {...h.defaultOpts, prefix: "tw-"}),
      "xl_tw_neg_my_64"
    );
  });
  it("negative with prefix and variant .xl:tw--my-64 camel", () => {
    assert.equal(
      h.toElmName(h.fixClass(".xl:tw--my-64"), {...camelCaseOpts, prefix: "tw-"}),
      "xlTwNegMy64"
    );
  });
  it("not-negative with prefix .xl:tw-my-64", () => {
    assert.equal(h.toElmName(h.fixClass(".xl:tw-my-64"), {...h.defaultOpts, prefix: "-tw"}),
        "xl_tw_my_64");
  });
  it("cursor-pointer", () => {
    assert.equal(
      h.toElmName(h.fixClass(".cursor-pointer")),
      "cursor_pointer"
    );
  });
  it("font-medium", () => {
    assert.equal(h.toElmName(h.fixClass(".font-medium")), "font_medium");
  });
});
