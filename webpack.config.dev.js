import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  target: 'web',
  devtool: 'inline-source-map',
  entry: {
    app: path.resolve(__dirname, 'src/index'),
  },
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, use: 'eslint-loader', exclude: /node_modules/ },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: 'css-loader' },
    ]
  },
  plugins: [
    // Create HTML file that includes references to bundled JS
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
      inject: true,
      favicon: 'favicon.ico'
    })
  ]
}
