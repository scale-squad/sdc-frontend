const express = require('express');
const app = express();
const axios = require('axios');
const controller = require('./controller.js');

app.use(express.static('client/dist'));
app.use(express.json());

// Review routes
app.use('/reviews', require('./routes/reviews'));

// product routes
app.use('/products', require('./routes/products'));

// Q&A routes
app.use('/qa', require('./routes/questions'));

// Cart routes
app.use('/cart', require('./routes/cart'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



