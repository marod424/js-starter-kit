import base from './webpack.config.base.js';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = Object.assign({}, base, {
  devtool: 'inline-source-map',
  plugins: (base.plugins || []).concat([
    // Create HTML file that includes references to bundled JS
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      favicon: 'favicon.ico'
    })
  ])
});

config.module.rules.push(
  { test: /\.css$/, use: ['style-loader', 'css-loader']}
);

export default config;
