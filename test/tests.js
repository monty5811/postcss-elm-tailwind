const { fixClass, toElmName, elmFunction } = require("../code-gen.js");
const { cleanOpts, defaultOpts } = require("../options.js");

let assert = require("assert");

function toElmName_(cls) {
  return toElmName(fixClass(cls), {...defaultOpts, screens: ["sm"]})
}

describe("cleanOpts", () => {
  it("should throw if no tailwind config supplied", () => {
    assert.throws(() => cleanOpts(undefined));
  });
  it("should not override elmFile", () => {
    assert.deepStrictEqual(cleanOpts({ elmFile: "src/NotTW.elm", tailwindConfig: "./demo/tailwind.config.js" }), {
      elmFile: "src/NotTW.elm",
      elmModuleName: "TW",
      prefix: "tw-",
      nameStyle: "snake",
      formats: {},
      splitByScreens: true,
      tailwindConfig: "./demo/tailwind.config.js",
      screens: ["sm", "md", "lg", "xl", "2xl"]
    });
  });
});

describe("fixClass", () => {
  it("should let container pass through", () => {
    assert.strictEqual(fixClass(".container"), "container");
  });
  it("should let mx-auto pass through", () => {
    assert.strictEqual(fixClass(".mx-auto"), "mx-auto");
  });
  it("responsive", () => {
    assert.strictEqual(fixClass(".sm:mx-auto"), "sm:mx-auto");
  });
  describe("pseudo-classes", () => {
    it("removes :after", () => {
      assert.strictEqual(
        fixClass(".tw-clearfix:after"),
        "tw-clearfix"
      );
    });
    it("removes :before", () => {
      assert.strictEqual(
        fixClass(".fa-accessible-icon:before"),
        "fa-accessible-icon"
      );
    });
    it("removes :disabled", () => {
      assert.strictEqual(
        fixClass(".disabled:tw-bg-transparent:disabled"),
        "disabled:tw-bg-transparent"
      );
    });
    it("removes :focus-within", () => {
      assert.strictEqual(
        fixClass(".sm:focus-within:tw-text-transparent:focus-within"),
        "sm:focus-within:tw-text-transparent"
      );
    });
    it("removes :not", () => {
      assert.strictEqual(
        fixClass(".sm:not(:active)"),
        "sm"
      );
    });
    it("removes :visited", () => {
      assert.strictEqual(
        fixClass(".visited:tw-bg-teal-100:visited"),
        "visited:tw-bg-teal-100"
      );
    });
    it("removes chained pseudo classes", () => {
      assert.strictEqual(
        fixClass(".visited:tw-bg-teal-100:nth-child(odd):active"),
        "visited:tw-bg-teal-100"
      );
    });
  });
  it("removes pseudo-elements (::)", () => {
    assert.strictEqual(fixClass(".tw-form-select::-ms-expand"), "tw-form-select");
  });
  it("removes pseudo-classes and psuedo-elements", () => {
    assert.strictEqual(
      fixClass(".focus:placeholder-gray-400:focus::placeholder"),
      "focus:placeholder-gray-400"
    );
    assert.strictEqual(
      fixClass(".focus:tw-placeholder-transparent:focus::-webkit-input-placeholder"),
      "focus:tw-placeholder-transparent"
    );
  });
  it("removes chained pseudo-classes", () => {
    assert.strictEqual(
      fixClass(".tw-form-checkbox:checked:focus"),
      "tw-form-checkbox"
    );
    assert.strictEqual(
      fixClass(".tw-form-checkbox:focus:checked"),
      "tw-form-checkbox"
    );
  });
  it("handles responsive with pseudo-classes", () => {
    assert.strictEqual(
      fixClass(".lg:active:tw-text-transparent:active"),
      "lg:active:tw-text-transparent"
    );
    assert.strictEqual(
      fixClass(".xl:focus:no-underline:focus"),
      "xl:focus:no-underline"
    );
    assert.strictEqual(
      fixClass(".lg:hover:tw-text-opacity-50:hover"),
      "lg:hover:tw-text-opacity-50"
    );
  });
  it("with prefix", () => {
    assert.strictEqual(
      fixClass(".hover:tw-bg-blue-500:hover"),
      "hover:tw-bg-blue-500"
    );
  });
  it("ratio", () => {
    assert.strictEqual(fixClass(".w-1\\/2"), "w-1/2");
  });
  // regression tests for github issue #7:
  it("handle variants", () => {
    assert.strictEqual(
      fixClass(".xl:odd:tw-bg-pink-700:nth-child(odd)"),
      "xl:odd:tw-bg-pink-700"
    );
    assert.strictEqual(
      fixClass(".lg:even:bg-pink-700:nth-child(even)"),
      "lg:even:bg-pink-700"
    );
    assert.strictEqual(
      fixClass(".first:tw-bg-red-400:first-child"),
      "first:tw-bg-red-400"
    );
    assert.strictEqual(
      fixClass(".last:tw-bg-transparent:last-child"),
      "last:tw-bg-transparent"
    );
  });
  // regession tests for github issue #13
  it("handle '.' in class names", () => {
    assert.strictEqual(fixClass(".col-gap-1\\.5"), "col-gap-1.5");
  });
  // regression test for font awesome (and a lot of other stuff)
  it("handle '>' in class names", () => {
    assert.strictEqual(fixClass("fa > li"), "fa");
    assert.strictEqual(fixClass("fa >li"), "fa");
    assert.strictEqual(fixClass("fa> li"), "fa");
  });
});

describe("fixClass -> toElmName", () => {
  const camelCaseOpts = { ...defaultOpts, nameStyle: "camel", screens: ["sm"] };
  it("should let container pass through", () => {
    assert.strictEqual(toElmName_("container"), "container");
  });
  it("should let mx-auto pass through", () => {
    assert.strictEqual(toElmName_("mx-auto"), "mx_auto");
  });
  it("should let mx-auto pass through camel case", () => {
    assert.strictEqual(toElmName(fixClass("mx-auto"), camelCaseOpts), "mxAuto");
  });
  it("responsive", () => {
    assert.strictEqual(toElmName_("sm:mx-auto"), "mx_auto");
  });
  it("responsive and focus", () => {
    assert.strictEqual(
      toElmName_(".xl:focus:no-underline:focus"),
      "xl__focus__no_underline"
    );
  });
  it("over", () => {
    assert.strictEqual(toElmName_(".w-1\\/2"), "w_1over2");
  });
  it("negative", () => {
    assert.strictEqual(toElmName_(".-m-1"), "neg_m_1");
  });
  it("negative with variant .sm:-m-24", () => {
    assert.strictEqual(toElmName_(".sm:-m-24"), "neg_m_24");
  });
  it("negative with variant .sm:-translate-x-1", () => {
    assert.strictEqual(
      toElmName_(".sm:-translate-x-1"),
      "neg_translate_x_1"
    );
    assert.strictEqual(
      toElmName(fixClass(".sm:-translate-x-1"), {...defaultOpts, splitByScreens: false}),
      "sm__neg_translate_x_1"
    );
  });
  it("with prefix", () => {
    assert.strictEqual(
      toElmName(fixClass(".hover:tw-bg-blue-500:hover"), {
        ...defaultOpts,
        prefix: "tw-",
        screens: ["sm"]
      }),
      "hover__tw_bg_blue_500"
    );
  });
  it("negative with prefix and variant .xl:tw--my-64", () => {
    assert.strictEqual(
      toElmName(fixClass(".xl:tw--my-64"), {
        ...defaultOpts,
        prefix: "tw-",
        screens: ["sm"]
      }),
      "xl__tw_neg_my_64"
    );
  });
  it("negative with prefix and variant .xl:tw--my-64 camel", () => {
    assert.strictEqual(
      toElmName(fixClass(".xl:tw--my-64"), {
        ...camelCaseOpts,
        prefix: "tw-",

      }),
      "xlTwNegMy64"
    );
  });
  it("not-negative with prefix .xl:tw-my-64", () => {
    assert.strictEqual(
      toElmName(fixClass(".xl:tw-my-64"), {
        ...defaultOpts,
        prefix: "-tw",
        screens: ["sm"]
      }),
      "xl__tw_my_64"
    );
  });
  it("cursor-pointer", () => {
    assert.strictEqual(toElmName_(".cursor-pointer"), "cursor_pointer");
  });
  it("font-medium", () => {
    assert.strictEqual(toElmName_(".font-medium"), "font_medium");
  });
  // regression tests for github issue #7:
  it("handle variants", () => {
    assert.strictEqual(
      toElmName_(".xl\:odd\:tw-bg-pink-700:nth-child(odd)"),
      "xl__odd__tw_bg_pink_700"
    );
    assert.strictEqual(
      toElmName_(".lg\:even\:tw-bg-pink-700:nth-child(even)"),
      "lg__even__tw_bg_pink_700"
    );
    assert.strictEqual(toElmName_(".last\:tw-bg-transparent:last-child"), "last__tw_bg_transparent");
  });
  // regession tests for github issue #13
  it("handle '.' in class names", () => {
    assert.strictEqual(toElmName_(".col-gap-1\\.5"), "col_gap_1_dot_5");
  });
  // regression test for font awesome (and a lot of other stuff)
  it("handle '>' in class names", () => {
    assert.strictEqual(toElmName_("fa > li"), "fa");
    assert.strictEqual(toElmName_("fa> li"), "fa");
    assert.strictEqual(toElmName_("fa >li"), "fa");
  });
  // regression test for .bottom-0.5
  it("handle '.bottom-0.5'", () => {
    assert.strictEqual(toElmName_(".bottom-0\.5"), "bottom_0_dot_5");
  });
});

describe("elmFunction", () => {
  it("generates Html attributes", () => {
    assert.ok(
      /Html\.Attribute/.test(
        elmFunction(
          { type: "Html.Attribute msg", fn: "A.class " },
          "bg-pink-700",
          "bg_pink_700"
        )
      )
    );
  });
  it("generates Svg attributes", () => {
    assert.ok(
      /Svg\.Attribute/.test(
        elmFunction(
          { type: "Svg.Attribute msg", fn: "A.class " },
          "bg-pink-700",
          "bg_pink_700"
        )
      )
    );
  });
  it("generates strings", () => {
    assert.ok(
      /String/.test(
        elmFunction({ type: "String", fn: "" }, "bg-pink-700", "bg_pink_700")
      )
    );
  });
});
