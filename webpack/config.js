// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const REPO_PATH = path.dirname(__dirname)
const SRC_PATH = path.join(REPO_PATH, 'src')

module.exports = {
  entry: {
    app: path.join(SRC_PATH, 'app.jsx')
  },
  output: {
    path: path.join(REPO_PATH, 'assets', 'js'),
    filename: '[name].[chunkhash].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.join(REPO_PATH, 'assets', 'css'),
              hmr: false,  // 'development' -> false
            },
          },
          'css-loader',
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(REPO_PATH, '_layouts', 'default.html'),
      template: path.join(REPO_PATH, 'public', 'default.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ]
}