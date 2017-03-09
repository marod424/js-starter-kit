import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));
app.use(express.static(path.resolve(__dirname, '../src/assets')));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.get('/items', function(req, res) {
  // Hard coding for simplicity.  Pretend this hits a real database
  res.json([
    { "id": 1, "title": "README", "description": "What's inside?", "link": "?q=readme" },
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
