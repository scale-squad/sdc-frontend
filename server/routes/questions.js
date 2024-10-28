const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController.js');

router.get('/questions', questionsController.getQuestions);
router.get('/questions/:id/answers', questionsController.getAnswers);
router.post('/questions', questionsController.addQuestion);
router.post('/questions/:id/answers', questionsController.addAnswer);
router.put('/questions/:id/helpful', questionsController.markQuestionHelpful);
router.put('/questions/:id/report', questionsController.reportQuestion);
router.put('/answers/:id/helpful', questionsController.markAnswerHelpful);
router.put('/answers/:id/report', questionsController.reportAnswer);

module.exports = router;