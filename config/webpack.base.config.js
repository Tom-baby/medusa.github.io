const path = require('path');
// const { VueLoaderPlugin } = require('vue-loader');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';
const baseConfig = {
  module: {
    rules: [
      {
        test: /\.(js)|(vue)|(postcss)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'dist')],
        options: {
          fix: true,
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.postcss$/,
        use: [
          // devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'vue-style-loader',
            {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      }
    ],
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, '../node_modules')],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new FriendlyErrorsWebpackPlugin(),
    new StylelintWebpackPlugin({
      fix: true,
      // configFile: path.resolve(__dirname, '../../stylelint.config.js'),
      // context: path.resolve(baseDir, WEBPACK_DEV_DIR),
      files: 'src/**/*.(vue|postcss)',
      cache: true,
    }),
  ],
};

module.exports = baseConfig;