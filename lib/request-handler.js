'use strict';

var db = require('../server/config');
var Klicks = require('../server/models/klicks');

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

/* TODO: Update Klick */
exports.updateKlick = function (req, res) {
  console.log('Server: Update Klick', req.body.id, req.body);
  Klicks.findByIdAndUpdate(req.body.id, req.body, {}, function(updatedKlick){
    res.send(200, updatedKlick);
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