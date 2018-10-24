const path = require('path');

module.exports = {
  entry: {
    pw: './src/scripts/pw.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};