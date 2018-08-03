'use strict';

let sendError = function (req, res, err) {
  console.log(`\nError: ${err.message} on route '${req.originalUrl}'`);
  res.status(400).json({ message: err.message });
}

module.exports = sendError;