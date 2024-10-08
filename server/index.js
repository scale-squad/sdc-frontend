const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config()

app.use(express.static('client/dist'));
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});