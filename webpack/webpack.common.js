const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index'),
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },

      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },

      {
        test: /\.(?:png|jpeg|jpg|gif|ico)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
    }),
    // new ESLintPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
