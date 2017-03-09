import path from 'path';

export default {
  target: 'web',
  entry: {
    app: path.resolve(__dirname, '../src/index'),
  },
  output: {
    path: path.resolve(__dirname, '../src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, use: 'eslint-loader', exclude: /node_modules/ },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(png|jpg|gif|svg|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      },
      {
        test: /\.md$/,
        use: [
          { loader: 'html-loader' },
          { loader: 'markdown-loader' }
        ]
      }
    ]
  }
};
