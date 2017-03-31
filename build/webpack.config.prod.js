import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import base from './webpack.config.base.js';

const config = Object.assign({}, base, {
  devtool: 'source-map',
  entry: {
    vendor: path.resolve(__dirname, '../src/vendor'),
    main: path.resolve(__dirname, '../src/index')
  },
  output: Object.assign({}, base.output, {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash].js'
  }),
  plugins: (base.plugins || []).concat([
    // Define node environment variable to be production
    // https://webpack.js.org/guides/production-build/#node-environment-variable
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV':  JSON.stringify('production')
      }
    }),

    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    // Hash the files using MD5 so that their names change when the content changes
    new WebpackMd5Hash(),

    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    // Create HTML file that includes references to bundled JS
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      favicon: 'favicon.ico'
    }),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ])
});

config.module.rules.push(
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      use: {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }
    })
  }
);

export default config;
