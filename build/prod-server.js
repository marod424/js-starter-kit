import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/users', function(req, res) {
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
