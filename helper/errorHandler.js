'use strict';

const sendError = function (url, res, err) {
  console.log(`\nError: ${err.message} on route '${url}'`);
  res.status(400).json({ message: err.message });
}

module.exports = {
  sendError
}