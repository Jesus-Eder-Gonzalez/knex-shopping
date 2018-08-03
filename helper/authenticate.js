"use strict";

const userExists = function(dbResults) {
  if (dbResults.rows.length === 0) {
    throw new Error("User not found");
  }
  return dbResults;
};
const passwordCorrect = function(req, dbResults) {
  if (dbResults.rows[0].password !== req.body.password) {
    throw new Error("Incorrect password");
  }
  return dbResults;
};
const userDoesNotExist = function(dbResults) {
  if (dbResults.rows.length !== 0) {
    throw new Error("User already exists");
  }
  return dbResults;
};

const userIDExists = function(dbResults) {
  if (dbResults.rows.length === 0) {
    throw new Error("User ID not found");
  }
  return dbResults;
};

module.exports = {
  userExists,
  passwordCorrect,
  userDoesNotExist,
  userIDExists
};
