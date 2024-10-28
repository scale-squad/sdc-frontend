const { axios, serverPath,logErrorAndSend } = require('./axiosConfig.js');


module.exports.getQuestions = (req, res) => {
  axios.get(`${serverPath}/qa/questions`, { params: req.query })
    .then(r => res.send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};

module.exports.getAnswers = (req, res) => {
  axios.get(`${serverPath}/qa/questions/${req.params.id}/answers`)
    .then(r => res.send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};

module.exports.addQuestion = (req, res) => {
  axios.post(`${serverPath}/qa/questions`, req.body)
    .then(r => res.status(201).send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};

module.exports.addAnswer = (req, res) => {
  axios.post(`${serverPath}/qa/questions/${req.params.id}/answers`, req.body)
    .then(r => res.status(201).send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};

module.exports.markQuestionHelpful = (req, res) => {
  axios.put(`${serverPath}/qa/questions/${req.params.id}/helpful`)
    .then(r => res.status(204).send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};

module.exports.reportQuestion = (req, res) => {
  axios.put(`${serverPath}/qa/questions/${req.params.id}/report`)
    .then(r => res.status(204).send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};

module.exports.markAnswerHelpful = (req, res) => {
  axios.put(`${serverPath}/qa/answers/${req.params.id}/helpful`)
    .then(r => res.status(204).send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};

module.exports.reportAnswer = (req, res) => {
  axios.put(`${serverPath}/qa/answers/${req.params.id}/report`)
    .then(r => res.status(204).send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};