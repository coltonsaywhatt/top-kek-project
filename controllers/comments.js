const Movie = require('../models/clip');

module.exports = {
  create,
  delete: deleteComment
};

function deleteComment(req, res, next) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Movie.findOne({'comments._id': req.params.id}).then(function(clip) {
    // Find the review subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const comment = clip.reviews.id(req.params.id);
    // Ensure that the review was created by the logged in user
    if (!comment.user.equals(req.user._id)) return res.redirect(`/clips/${clips._id}`);
    // Remove the review using the remove method of the subdoc
    comment.remove();
    // Save the updated movie
    clip.save().then(function() {
      // Redirect back to the movie's show view
      res.redirect(`/clips/${clip._id}`);
    }).catch(function(err) {
      // Let Express display an error
      return next(err);
    });
  });
}

function create(req, res) {
  // Find the movie to embed the review within
  Movie.findById(req.params.id, function(err, clip) {
    // Add the user-centric info to req.body
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // Push the subdoc for the review
    clip.reviews.push(req.body);
    // Always save the top-level document (not subdocs)
    clip.save(function(err) {
      res.redirect(`/clips/${clip._id}`);
    });
  });
}