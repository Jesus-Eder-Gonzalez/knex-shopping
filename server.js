'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT =  process.env.PORT || 3000;
const products = require('./routes/products');
const cart = require('./routes/cart');
const users = require('./routes/users');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res) =>{
  res.send('smoketest');
});

app.use('/users', users);
app.use('/products', products);
app.use('/cart',cart);

app.listen(PORT, 'localhost', () => {
  console.log(`CONNECTING ON PORT: ${PORT}`);
});