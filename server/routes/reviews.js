const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController.js');

router.get('/', reviewsController.getReviews);
router.get('/meta', reviewsController.getReviewsMetadata);
router.post('/', reviewsController.addReview);
router.put('/:id/helpful', reviewsController.markReview);
router.put('/:id/report', reviewsController.reportReview);

module.exports = router;