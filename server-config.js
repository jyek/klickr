'use strict';

var express = require('express');
var cors = require('cors');
var handler = require('./lib/request-handler');

var app = express();

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/app'));
  app.use(cors());
});

app.get('/', handler.renderIndex);
app.get('/klicks/:id', handler.getKlick);
app.get('/klicks', handler.getAllKlicks);
app.post('/klicks', handler.createKlick);
app.put('/klicks', handler.updateKlick);
app.get('/*', handler.invalidRoute);

module.exports = app;