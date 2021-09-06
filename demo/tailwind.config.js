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
  plugins: [require('@tailwindcss/forms')],
  prefix: "tw-",
  purge: {
    mode: 'all', // Removes unused font-awesome fonts and icons
    content: ['./index.html', './dist/app.js'],
  }
};
