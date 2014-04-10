// Database
var Klicks = require('../server/models/klicks');

exports.renderIndex = function(req, res) {
  res.render('index');
};

// The purpose of this function is to allow a user to click on a link
// and have it make a GET request for the specific Klick object stored in Mongodb.
// This function will be triggered when a user clicks on links displayed on the Klickr.io home page.
exports.handleGetKlicks = function (req, res) {
  var klickId = req.params.id;

  Klicks.findById(klickId, function (err, klick) {
    if (err) {
      throw new Error('Error in handleGetKlicks', err);
    }
    res.send(200, klick);
  });
};

// The purpose of this function is to allow the Klickr.io home page to pull all links
// from the Mongodb and display them.
exports.handleGetAllKlicks = function (req, res) {
  Klicks.find({}, function (err, klicks) {
    if (err) {
      throw new Error('Error in handleGetAllKlicks', err);
    }
    res.send(200, klicks);
  });
};

// The purpose of this function is to create a new Klick object whenever a person makes
// a recording on a webpage. The chrome extension tool will trigger this function.
exports.handlePostKlicks = function (req, res) {
  var klickObj = new Klicks(req.body);
  var id       = klickObj._id.toString();
  // for multi-page functionality, grab url from the first tick object in ticks array
  var url      = klickObj.ticks[0].url;

  // need to url encode the url where the initial recording happened
  // the id corresponds to the mongodb object
  klickObj.linkUrl = '/?url=' + encodeURIComponent(url) + '&id=' + id;

  klickObj.save(function (err) {
    if (err) {
      throw new Error('Error in handlePostKlicks', err);
    }
    res.send(200, klickObj);
  });
};
