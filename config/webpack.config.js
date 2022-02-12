const { merge } = require("webpack-merge");
const base = require("./webpack.config.base");
const prod = require("./webpack.config.prod");
const dev = require("./webpack.config.dev");

module.exports = (env) => {
  return merge(base, env.production ? prod : dev);
};
