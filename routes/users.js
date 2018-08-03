'use strict';

const express = require('express');
const router = express.Router();
const db = require('../db/knex');

router.post('/login', (req,res) => {
  
  res.send('users smoketest');
});

module.exports = router;