'use strict';

var db = require('../server/config');
var Klicks = require('../server/models/klicks');

/* Render index */
exports.renderIndex = function(req, res){
  if (req.query.url && req.query.id){
    // if user is trying to play a Klick
    res.render('extension');

    // increment view count
    Klicks.findById(req.query.id, function(err, klick){
      if (err) {
        throw new Error('Invalid Klick ID', err);
      }
      klick.views++;
      klick.save();
    });
  } else {
    // if user wants to visit our site
    res.render('index');
  }
};

/* Get Klick by ID */
exports.getKlick = function (req, res) {
  var klickId = req.params.id;

  Klicks.findById(klickId, function (err, klick) {
    if (err) {
      throw new Error('Error in handleGetKlicks', err);
    }
    console.log('Klick object from server to client:', klick);
    res.send(200, klick);
  });
};

/* Get all Klicks (excludes ticks field to increase loading speed) */
exports.getAllKlicks = function (req, res) {
  Klicks.find({}, {ticks: 0}, function (err, klicks) {
    if (err) {
      throw new Error('Error in handleGetAllKlicks', err);
    }
    res.send(200, klicks);
  });
};

/* Update Klick */
exports.updateKlick = function (req, res) {
  var id = req.body.klick._id;
  delete req.body.klick._id;
  var params = req.body.klick;
  console.log('Server: Update Klick with id', id, 'and params', params);
  Klicks.findByIdAndUpdate(id, params, {}, function(){
    res.send(200);
  });
};

/* Create Klick */
exports.createKlick = function (req, res) {
  var klickObj = new Klicks(req.body);
  var id = klickObj._id.toString();
  klickObj.url = klickObj.ticks[0].url;

  // need to url encode the url where the initial recording happened
  // the id corresponds to the mongodb object
  klickObj.linkUrl = '/?url=' + encodeURIComponent(klickObj.url) + '&id=' + id;

  // compute duration
  klickObj.duration = klickObj.ticks[klickObj.ticks.length-1].timestamp - klickObj.ticks[0].timestamp;

  klickObj.save(function (err) {
    if (err) {
      throw new Error('Error in handlePostKlicks', err);
    }
    res.send(200, klickObj);
  });
};

/* Invalid route handler */
exports.invalidRoute = function(req, res){
  console.log('Server: Invalid route');
  res.send(404);
};