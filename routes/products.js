"use strict";

const express = require("express");
const router = express.Router();
const db = require("../db/knex");
const authenticate = require("../helper/authenticate");
const { sendError } = require("../helper/errorHandler");

router.get("/", (req, res) => {
  return db
    .raw(`SELECT * FROM products`)
    .then(result => {
      if (!result.rows.length) {
        throw new Error("There are currently no products");
      }
      return result.rows;
    })
    .then(users => {
      return res.json(users);
    })
    .catch(err => {
      sendError(req.originalUrl, res, err);
    });
});

router.post("/new", (req, res) => {
  try {
    authenticate.productHasEmptyFields(req.body);
  } catch (err) {
    return sendError(req.originalUrl, res, err);
  }

  return db
    .raw(`SELECT * FROM products WHERE title = ?`, [req.body.title])
    .then(authenticate.productDoesNotExist)
    .then(() => {
      return db.raw(
        `INSERT INTO products (title, description, inventory, price) VALUES (?,?,?,?) RETURNING *`,
        [
          req.body.title,
          req.body.description,
          req.body.inventory,
          req.body.price
        ]
      );
    })
    .then(result => {
      res.json(...result.rows);
    })
    .catch(err => {
      sendError(req.originalUrl, res, err);
    });
});

router.delete("/:product_id", (req, res) => {
  return db
    .raw(`DELETE FROM products WHERE id = ? RETURNING *`, [
      Number(req.params.product_id)
    ])
    .then(authenticate.productIdExists)
    .then(() => {
      res.json({
        message: `Product id: [${req.params.product_id}] successfully deleted`
      });
    })
    .catch(err => {
      sendError(req.originalUrl, res, err);
    });
});

router.put("/:product_id", (req, res) => {
  try {
    authenticate.productHasEmptyFields(req.body);
  } catch (err) {
    return sendError(req.originalUrl, res, err);
  }

  return db
    .raw(`SELECT * FROM products WHERE id = ?`, [req.params.product_id])
    .then(authenticate.productExists)
    .then(() => {
      return db.raw(
        `UPDATE products SET (title, description, inventory, price) = (?, ?, ?, ?) WHERE id = ? RETURNING *`,
        [
          req.body.title,
          req.body.description,
          req.body.inventory,
          req.body.price,
          req.params.product_id
        ]
      );
    })
    .then(() => {
      return res.json({
        message: `Product id: [${req.params.product_id}] has been updated`
      });
    })
    .catch(err => {
      sendError(req.originalUrl, res, err);
    });
});

router.get("/:product_id", (req, res) => {
  return db
    .raw(`SELECT * FROM products WHERE id = ?`, [req.params.product_id])
    .then(authenticate.productExists)
    .then(user => {
      return res.json(user.rows);
    })
    .catch(err => {
      sendError(req.originalUrl, res, err);
    });
});

module.exports = router;
