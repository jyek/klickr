var mongoose = require('mongoose');

var klicksSchema = new mongoose.Schema({
  linkUrl: { type: String, default: '' },  // corresponds to the url which a user will click on and redirect to the recording
  width: Number,  // width of the window where the recording happens
  height: Number,  // height of the window where the recording happens
  url: { type: String, default: '' },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  hype: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  duration: { type: Number, default: 0},
  ticks: [{
    action: String,
    pageX: Number,  // x coordinate relative to the entire page
    pageY: Number,
    clientX: Number,  // x coordinate relative to the viewport
    clientY: Number,
    timestamp: Date,
    url: { type: String, default: '' }, // url that tick took place on
    target: { // target altered for purpose of making DOM selection of target attainable
      tagName: { type: String, default: '' },
      index: { type: Number, default: -1 }
    },
    charCode: { type: Number, default: -1 }, // applies only for keypress actions
    altKey: { type: Boolean, default: false }, // applies only for keypress actions
    ctrlKey: { type: Boolean, default: false }, // applies only for keypress actions
    metaKey: { type: Boolean, default: false }, // applies only for keypress actions
    shiftKey: { type: Boolean, default: false }, // applies only for keypress actions
    annotation: { type: String, default: '' } // applies for annotation
  }]
});

module.exports = mongoose.model('Klicks', klicksSchema);