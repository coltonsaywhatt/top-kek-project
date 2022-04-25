require('dotenv').config();
require('./config/database')
const Clip = require('./models/movie');


let m;
let p;

Clip.findOne({}, function(err, clip) {
  m = movie;
});