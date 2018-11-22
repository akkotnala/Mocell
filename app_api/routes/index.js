var express = require('express');
var router = express.Router();
var ctrlMobiles = require('../controllers/mobiles');
var ctrlReviews = require('../controllers/reviews');
// mobiles
router.get('/mobiles', ctrlMobiles.mobilesList);
router.post('/mobiles', ctrlMobiles.mobilesCreate);
router.get('/mobiles/:mobileid', ctrlMobiles.mobilesReadOne);
router.put('/mobiles/:mobileid', ctrlMobiles.mobilesUpdateOne);
router.delete('/mobiles/:mobileid', ctrlMobiles.mobilesDeleteOne);

// reviews
router.post('/mobiles/:mobileid/reviews', ctrlReviews.reviewsCreate);

module.exports = router;