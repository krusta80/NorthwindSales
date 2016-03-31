var express = require('express');
var path = require('path');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var db = require('./models');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/browser'));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use('/angular', express.static(path.join(__dirname, '/node_modules/angular')));

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('/api/salespeople', require('./routes/sales.people'));


db.connect()
  .then(function(){
    app.listen(process.env.PORT || 1337);
  });
