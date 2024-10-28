const { axios, serverPath,logErrorAndSend } = require('./axiosConfig.js');

module.exports.getCart = (req, res) => {
  axios.get(`${serverPath}/cart`)
    .then(r => res.status(200).send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};

module.exports.addToCart = (req, res) => {
  axios.post(`${serverPath}/cart`, req.body)
    .then(r => res.status(201).send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};