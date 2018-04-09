const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "ts-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/index.html"
    })
  ]
};
