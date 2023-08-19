const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/scripts/index.js', 
  output: {
    filename: 'main.js', 
    path: path.resolve(__dirname, 'dist'), 
    clean: true, 
  },
  mode: 'production', 
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', 
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'postcss-loader', 
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', 
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource', 
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', 
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css', 
    }),
  ],
  optimization: {
    minimize: true, 
    minimizer: [new CssMinimizerPlugin()], 
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true, 
    port: 8080, 
  },
};
