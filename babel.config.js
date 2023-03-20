// This is only used for Jest tests
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [["@babel/plugin-proposal-private-methods", { loose: true }]],
};
