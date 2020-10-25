module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    mode: "layers",
    layers: ["utilities"],
    content: ["./src/**/*.html"],
  },
  theme: {
    extend: {},
    container: {
      center: true,
      padding: "2rem",
    },
  },
  variants: {},
  plugins: [],
};
