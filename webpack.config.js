const path = require('path');

module.exports = {
  entry: './view/src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, 'build', 'view', 'src'),
  },
  rules: {
    loader: [],
  },
  plugins: [],
  optimization: {
    minimizer: [],
  },
};