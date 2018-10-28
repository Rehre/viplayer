const path = require('path');
const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

const { ifProduction, ifNotProduction } = getIfUtils(process.env.NODE_ENV);

module.exports = {
  entry: './view/src/index.js',
  mode: ifProduction('production', 'development'),
  output: {
    filename: 'main.[hash].js',
    path: ifProduction(path.resolve(__dirname, 'build', 'view', 'src'),
      path.resolve(__dirname, 'dist')),
  },
  module: {
    rules: [
      {
        // .js loader
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        // .scss loader
        test: /\.scss$/,
        use: [
          ifProduction(MiniCSSExtractPlugin.loader, 'style-loader'),
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '../fonts/',
            outputPath: '../fonts',
          },
        }],
      },
    ],
  },
  plugins: removeEmpty([
    new HTMLWebpackPlugin({
      template: './view/public/index.html',
      filename: ifProduction('../index.html', 'index.html'),
      inject: 'body',
    }),
    ifProduction(new MiniCSSExtractPlugin()),
    ifProduction(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })),
    ifNotProduction(new webpack.HotModuleReplacementPlugin()),
    ifNotProduction(new webpack.NoEmitOnErrorsPlugin()),
  ]),
  optimization: {
    minimizer: removeEmpty([
      new UglifyJSWebpackPlugin({
        cache: true,
        parallel: true,
      }),
      ifProduction(new OptimizeCssAssetsWebpackPlugin()),
    ]),
  },
  devServer: ifNotProduction({
    contentBase: 'dist',
    historyApiFallback: true,
    hot: true,
    stats: 'minimal',
    port: '3000',
  }),
};
