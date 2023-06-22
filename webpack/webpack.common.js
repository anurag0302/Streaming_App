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
  experiments: {
    asyncWebAssembly: true, // Enable WebAssembly using async modules
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
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
      {
        /**
         * Developers packaging the IVS player into an app are required to resolve and import the following assets via URL:
         *
         * 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.wasm'
         * 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.js';
         *
         * These assets must not be re-compiled during packaging. Your build tool must import these files as-is, untranspiled.
         * The webpack file-loader (https://webpack.js.org/loaders/file-loader/) accomplishes this.
         * Rollup's plugin-url (https://github.com/rollup/plugins/tree/master/packages/url) also seems to do this, but has not been tested.
         */
        test: /[\/\\]amazon-ivs-player[\/\\].*dist[\/\\]assets[\/\\]/,
        loader: 'file-loader',
        type: 'javascript/auto',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(mp3|mp4)$/,
        use: 'file-loader',
      }
      

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
