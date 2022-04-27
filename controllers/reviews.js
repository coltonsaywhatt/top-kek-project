const Clip = require('../models/clip');

module.exports = {
  create,
  delete: deleteReview
};

function deleteReview(req, res, next) {
  Clip.findOne({'reviews._id': req.params.id}).then(function(clip) {
    const review = clip.reviews.id(req.params.id);
    if (!review.user.equals(req.user._id)) return res.redirect(`/clips/${clips._id}`);
    review.remove();
    clip.save().then(function() {
      res.redirect(`/clips/${clip._id}`);
    }).catch(function(err) {
      return next(err);
    });
  });
}

function create(req, res) {
  Clip.findById(req.params.id, function(err, clip) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    clip.reviews.push(req.body);
    clip.save(function(err) {
      res.redirect(`/clips/${clip._id}`);
    });
  });
}