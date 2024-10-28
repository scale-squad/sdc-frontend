const { axios, serverPath,logErrorAndSend } = require('./axiosConfig.js');

module.exports.getProducts = (req, res) => {
  axios.get(`${serverPath}/products`)
    .then(r => res.send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};

module.exports.getProductInfo = (req, res) => {
  axios.get(`${serverPath}/products/${req.params.id}`)
    .then(r => res.send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};

module.exports.getProductStyles = (req, res) => {
  axios.get(`${serverPath}/products/${req.params.id}/styles`)
    .then(r => res.send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};

module.exports.getRelatedProducts = (req, res) => {
  axios.get(`${serverPath}/products/${req.params.id}/related`)
    .then(r => res.send(r.data))
    .catch(e => logErrorAndSend(e, res, 500));
};