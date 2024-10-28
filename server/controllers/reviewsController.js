const { axios, serverPath,logErrorAndSend } = require('./axiosConfig.js');

module.exports.getReviews = (req, res) => {
  axios.get(`${serverPath}/reviews`, { params: req.query })
    .then(r => res.status(200).send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};

module.exports.getReviewsMetadata = (req, res) => {
  axios.get(`${serverPath}/reviews/meta`, { params: req.query })
    .then(r => res.status(200).send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};

module.exports.addReview = (req, res) => {
  axios.post(`${serverPath}/reviews`, req.body)
    .then(r => res.status(201).send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};

module.exports.markReview = (req, res) => {
  axios.put(`${serverPath}/reviews/${req.params.id}/helpful`)
    .then(r => res.status(204).send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};

module.exports.reportReview = (req, res) => {
  axios.put(`${serverPath}/reviews/${req.params.id}/report`)
    .then(r => res.status(204).send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};