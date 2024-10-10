const express = require('express');
const app = express();
const axios = require('axios');
//require('dotenv').config();
const controller = require('./controller.js');

app.use(express.static('client/dist'));
app.use(express.json());

// Review routes
app.get('/reviews', controller.getReviews);
app.get('/reviews/meta', controller.getReviewsMetadata);
app.post('/reviews', controller.addReview);
app.put('/reviews/:id/helpful', controller.markReview);
app.put('/reviews/:id/report', controller.reportReview);

// product routes
 app.get('/products', controller.getProducts);
app.get('/products/:id', controller.getProductInfo);
app.get('/products/:id/styles', controller.getProductStyles);
app.get('/products/:id/related', controller.getRelatedProducts);

// Q&A routes
app.get('/qa/questions/', controller.getQuestions);
app.get('/qa/questions/:id/answers', controller.getAnswers);
app.post('/qa/questions', controller.addQuestion);
app.post('/qa/questions/:id/answers', controller.addAnswer);
app.put('/qa/questions/:id/helpful', controller.markQuestionHelpful);
app.put('/qa/questions/:id/report', controller.reportQuestion);
app.put('/qa/answers/:id/helpful', controller.markAnswerHelpful);
app.put('/qa/answers/:id/report', controller.reportAnswer);

// Cart routes
app.get('/cart', controller.getCart);
app.post('/cart', controller.addToCart);

// Interactions routes
app.post('/interactions', controller.AddInteraction);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



