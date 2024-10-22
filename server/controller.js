const axios = require('axios');
require('dotenv').config();

const serverPath = "https://app-hrsei-api.herokuapp.com/api/fec2/rfp";

axios.defaults.headers.common['Authorization'] = `${process.env.API_KEY}`;
const logErrorAndSend=(e,res,statusCode=500)=>{
  console.log(e);
  res.sendStatus(statusCode);
};

module.exports.getProducts = (req, res) => {
  axios.get(`${serverPath}/products`)
    .then(r => res.send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

module.exports.getProductInfo = (req, res) => {
  axios.get(`${serverPath}/products/${req.params.id}`)
    .then(r => res.send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};
module.exports.getProductStyles = (req, res) => {
  axios.get(`${serverPath}/products/${req.params.id}/styles`)
    .then(r => res.send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

module.exports.getRelatedProducts = (req, res) => {
  axios.get(`${serverPath}/products/${req.params.id}/related`)
    .then(r => res.send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

//QUESTION AND ANSWER ROUTES
module.exports.getQuestions = (req, res) => {
  axios.get(`${serverPath}/qa/questions`, { params: req.query })
    .then(r => res.send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

module.exports.getAnswers = (req, res) => {
  axios.get(`${serverPath}/qa/questions/${req.params.id}/answers`)
    .then(r => res.send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

module.exports.addQuestion = (req, res) => {
  axios.post(`${serverPath}/qa/questions`, req.body)
    .then(r => res.status(201).send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

module.exports.addAnswer = (req, res) => {
  axios.post(`${serverPath}/qa/questions/${req.params.id}/answers`, req.body)
    .then(r => res.status(201).send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

module.exports.markQuestionHelpful = (req, res) => {
  axios.put(`${serverPath}/qa/questions/${req.params.id}/helpful`)
    .then(r => res.status(204).send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

module.exports.reportQuestion = (req, res) => {
  axios.put(`${serverPath}/qa/questions/${req.params.id}/report`)
    .then(r => res.status(204).send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

module.exports.markAnswerHelpful = (req, res) => {
  axios.put(`${serverPath}/qa/answers/${req.params.id}/helpful`)
    .then(r => res.status(204).send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

module.exports.reportAnswer = (req, res) => {
  axios.put(`${serverPath}/qa/answers/${req.params.id}/report`)
    .then(r => res.status(204).send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

//Review Routes

module.exports.getReviews = (req, res) => {
  axios.get(`${serverPath}/reviews`, { params: req.query })
    .then(r => res.status(200).send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

module.exports.getReviewsMetadata = (req, res) => {
  axios.get(`${serverPath}/reviews/meta`, { params: req.query })
    .then(r => res.status(200).send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

module.exports.addReview = (req, res) => {
  axios.post(`${serverPath}/reviews`, req.body)
    .then(r => res.status(201).send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

module.exports.markReview = (req, res) => {
  axios.put(`${serverPath}/reviews/${req.params.id}/helpful`)
    .then(r => res.status(204).send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

module.exports.reportReview = (req, res) => {
  axios.put(`${serverPath}/reviews/${req.params.id}/report`)
    .then(r => res.status(204).send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

//Cart routes
module.exports.getCart = (req, res) => {
  axios.get(`${serverPath}/cart`)
    .then(r => res.status(200).send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

module.exports.addToCart = (req, res) => {
  axios.post(`${serverPath}/cart`, req.body)
    .then(r => res.status(201).send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};

// Interactions routes
module.exports.AddInteraction = (req, res) => {
  axios.post(`${serverPath}/interactions`, req.body)
    .then(r => res.status(201).send(r.data))
    .catch(e => logErrorAndSend(e,res,500));
};