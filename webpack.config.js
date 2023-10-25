"use strict";

let path = require("path");
console.log(path);
module.exports = {
  context: path.resolve(__dirname, "./localhost/tabs/js"), // папка откуда берется файл
  mode: "development",
  entry: "./script.js",
  output: {
    filename: "bundle.js",
    path:path.resolve(__dirname, "./localhost/tabs/bind")
  },
  watch: true,
  devtool: "source-map",
  module: {},
};
