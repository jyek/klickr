var mongoose = require('mongoose');

var klicksSchema = new mongoose.Schema({
  linkUrl: { type: String, default: '' },  // url which user will click on and redirect to for recording
  width: Number,  // window width of recording
  height: Number,  // window height of recording
  url: { type: String, default: '' }, // first url of Klick (used for faster load time in gallery.html)
  description: { type: String, default: '' }, // description associated with Klick
  createdAt: { type: Date, default: Date.now },
  hype: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  duration: { type: Number, default: 0},
  ticks: [{ // ticks correspond to each individual movement we're capturing
    action: String,  // user action (i.e. move, click, keypress)
    pageX: Number,  // x coordinate relative to the entire page
    pageY: Number,
    clientX: Number,  // x coordinate relative to the viewport
    clientY: Number,
    timestamp: Date,
    url: { type: String, default: '' }, // url where tick took place
    target: { // specific for keypress events
      tagName: { type: String, default: '' },
      index: { type: Number, default: -1 } // specific index of target element out of all elements of same type
    },
    charCode: { type: Number, default: -1 }, // applies only for keypress actions
    altKey: { type: Boolean, default: false }, // applies only for keypress actions
    ctrlKey: { type: Boolean, default: false }, // applies only for keypress actions
    metaKey: { type: Boolean, default: false }, // applies only for keypress actions
    shiftKey: { type: Boolean, default: false }, // applies only for keypress actions
    annotation: { type: String, default: '' }
  }]
});

module.exports = mongoose.model('Klicks', klicksSchema);