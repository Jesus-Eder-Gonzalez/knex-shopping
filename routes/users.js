'use strict';

const express = require('express');
const router = express.Router();
const db = require('../db/knex');

router.get('/', (req,res) => {
  console.log('/users');
  res.send('users smoketest');
});

module.exports = router;