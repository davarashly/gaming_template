const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const path = require("path")

const buildDir = path.resolve(__dirname, "build")

module.exports = {
  entry: { index: "./src/index.ts" },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: buildDir,
    compress: true,
    port: 8080
  },
  optimization: {
    usedExports: true,
    minimizer: ["..."],
    minimize: true
  },
  output: {
    filename: "[name].[contenthash].js",
    path: buildDir,
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: true,
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    })
  ]
}
