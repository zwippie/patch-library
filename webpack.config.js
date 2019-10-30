const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => ({
  entry: {
      './js/app.js': ['./js/app.js']
  },
  output: {
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: './app.css' }),
  ]
});
