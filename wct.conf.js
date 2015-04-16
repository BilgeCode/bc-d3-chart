module.exports = {
  verbose: false,
  plugins: {

    local: {
      disabled: false,
      browsers: ['firefox'],
    },

    "web-component-tester-istanbul": {
      disabled: true,
      dir: "./coverage",
      reporters: ["lcov"],
      include: [],
      exclude: []
    }
  }
};
