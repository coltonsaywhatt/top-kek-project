const Clip = require('../models/clip');

module.exports = {
  index,
  show,
  new: newClip,
  create
};

function index(req, res) {
  Clip.find({}, (err, clips) => {
    res.render('clips/index', {clips});
  });
}

function show(req, res) {

}

function newClip(req, res) {
  res.render('clips/new');
}

function create(req, res) {
  var clipUrl = req.body.clipUrl;
  var match = clipUrl.match(/https:\/\/clips\.twitch\.tv\/(?<uid>[A-z0-9\-]+)/m);
  if (match.groups) {
    var embeddedUrl = `https://clips.twitch.tv/embed?clip=${match.groups.uid}&parent=${req.hostname}`;
    req.body.user = req.user._id;
    var newClip = new Clip({Url:embeddedUrl});
    newClip.save(() => {
      res.redirect('/clips');
    });    
  } else {
    res.redirect('/clips');
  }
}
