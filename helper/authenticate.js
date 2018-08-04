"use strict";

const productFields = ["title", "description", "inventory", "price"];

const itemExists = function(errStr, dbResults) {
  if (dbResults.rows.length === 0) {
    throw new Error(errStr);
  }
  return dbResults;
};

const userExists = itemExists.bind(this, ["User not found"]);
const productExists = itemExists.bind(this, ["Product not found"]);

const itemDoesNotExist = function(errStr, dbResults) {
  if (dbResults.rows.length !== 0) {
    throw new Error(errStr);
  }
  return dbResults;
};

const userDoesNotExist = itemDoesNotExist.bind(this, ["User already exists"]);
const productDoesNotExist = itemDoesNotExist.bind(this, [
  "Product already exists"
]);

const itemHasEmptyFields = function(requiredFieldsArr, userInput) {
  if (Object.keys(userInput).length !== requiredFieldsArr.length) {
    let errorOutput = "Missing ";
    let temp = [];
    requiredFieldsArr.forEach(field => {
      userInput.hasOwnProperty(field) ? `` : temp.push(`${field}`);
    });
    errorOutput += `${temp.join(", ")} fields. Must POST all product fields.`;
    throw new Error(errorOutput);
  }

  return userInput;
};

const productHasEmptyFields = itemHasEmptyFields.bind(this, productFields);

const passwordCorrect = function(req, dbResults) {
  if (dbResults.rows[0].password !== req.body.password) {
    throw new Error("Incorrect password");
  }
  return dbResults;
};

const itemIDExists = function(errStr, dbResults) {
  if (dbResults.rows.length) {
    throw new Error(errStr);
  }
  return dbResults;
};

const userIdExists = itemIDExists.bind(this, ["User ID not found"]);
const productIdExists = itemIDExists.bind(this, ["Product ID not found"]);

module.exports = {
  userExists,
  passwordCorrect,
  userDoesNotExist,
  userIdExists,
  productExists,
  productDoesNotExist,
  productHasEmptyFields,
  productIdExists
};
