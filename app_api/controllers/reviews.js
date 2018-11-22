var mongoose = require('mongoose');
var Mob = mongoose.model('Mobile');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

//create a new review
module.exports.reviewsCreate = function(req, res) {
  if (req.params.mobileid) {
    Mob
      .findById(req.params.mobileid)
      .select('reviews')
      .exec(
        function(err, mobile) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            doAddReview(req, res, mobile);
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, mobileid required"
    });
  }
};

var doAddReview = function(req, res, mobile) {
  if (!mobile) {
    sendJSONresponse(res, 404, "mobileid not found");
  } else {
    mobile.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    mobile.save(function(err, mobile) {
      var thisReview;
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        updateAverageRating(mobile._id);
        thisReview = mobile.reviews[mobile.reviews.length - 1];
        sendJSONresponse(res, 201, thisReview);
      }
    });
  }
};

var updateAverageRating = function(mobileid) {
  console.log("Update rating average for", mobileid);
  Mob
    .findById(mobileid)
    .select('reviews')
    .exec(
      function(err, mobile) {
        if (!err) {
          doSetAverageRating(mobile);
        }
      });
};

var doSetAverageRating = function(mobile) {
  var i, reviewCount, ratingAverage, ratingTotal;
  if (mobile.reviews && mobile.reviews.length > 0) {
    reviewCount = mobile.reviews.length;
    ratingTotal = 0;
    for (i = 0; i < reviewCount; i++) {
      ratingTotal = ratingTotal + mobile.reviews[i].rating;
    }
    ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    mobile.rating = ratingAverage;
    mobile.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Average rating updated to", ratingAverage);
      }
    });
  }
};
