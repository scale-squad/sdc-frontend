const axios = require('axios');
require('dotenv').config();

const serverPath = "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp";
axios.defaults.headers.common['Authorization'] = `${process.env.API_KEY}`;

const logErrorAndSend = (e, res, statusCode = 500) => {
  console.log(e);
  res.sendStatus(statusCode);
};

module.exports = {
  axios,
  serverPath,
  logErrorAndSend
};