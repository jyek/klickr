'use strict';

var express = require('express');
var cors = require('cors'); // module for handling Cors headers
var handler = require('./lib/request-handler');

var app = express();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/app'));
  app.use(cors());
});

app.get('/', handler.renderIndex);

app.get('/klicks/:id', handler.getKlick);
app.get('/klicks', handler.getAllKlicks);
app.post('/klicks', handler.createKlick);

// app.get(/\/?url=(.+)/, handler.loadKlick);
// app.get('/*', handler.default);

module.exports = app;