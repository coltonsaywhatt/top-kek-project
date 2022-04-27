require('dotenv').config();
require('./config/database')
const Clip = require('./models/clip');

let c;

Clip.findOne({}, function(err, clip) {
  c = clip;
});