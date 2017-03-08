import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from './webpack.config.dev';

const port = 3000;
const app = express();

// setup on the fly compilation and hot reload
config.entry.app = ['webpack-hot-middleware/client', config.entry.app];
config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
);

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/'
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.resolve(__dirname, '../src/assets')));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(compiler.outputPath, 'index.html'));
});

app.get('/items', function(req, res) {
  // Hard coding for simplicity.  Pretend this hits a real database
  res.json([
    { "id": 1, "title": "README", "description": "What's inside?", "link": "readme.html" },
    { "id": 2, "title": "Logo", "description": "Check out our logo!", "link": "logo.png" },
    { "id": 3, "title": "Roboto-Regular", "description": "Download", "link": "fonts/Roboto-Regular.ttf" }
  ]);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
