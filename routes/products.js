'use strict';

const express = require('express');
const router = express.Router();
const db = require('../db/knex');

router.get('/', (req,res) => {
  console.log('/cart');
  res.send('cart smoketest');
});

module.exports = router;