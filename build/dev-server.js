import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

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
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/items', function(req, res) {
  // Hard coding for simplicity.  Pretend this hits a real database
  res.json([
    { "id": 1, "firstName": "Bob", "lastName": "Glaser", "email": "bglaser@gmail.com" },
    { "id": 2, "firstName": "Russ", "lastName": "Stamm", "email": "ramm@gmail.com" },
    { "id": 3, "firstName": "Zac", "lastName": "Levine", "email": "zlevi@gmail.com" }
  ]);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
