module.exports = {
  theme: {},
  variants: {
    backgroundColor: [
      "responsive",
      "active",
      "disabled",
      "even",
      "first",
      "focus-within",
      "focus",
      "group-focus",
      "group-hover",
      "hover",
      "last",
      "odd",
      "visited"
    ]
  },
  plugins: [require("@tailwindcss/custom-forms"), require("@tailwindcss/ui")],
  prefix: "tw-",
  purge: {
    content: ['./index.html', './dist/app.js']
  }
};
