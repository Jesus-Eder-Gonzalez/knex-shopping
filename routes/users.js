"use strict";

const express = require("express");
const router = express.Router();
const db = require("../db/knex");
const authenticate = require("../helper/authenticate");
const { sendError } = require("../helper/errorHandler");

router.post("/login", (req, res) => {
  return db
    .raw(`SELECT * FROM users WHERE email = ?`, [req.body.email])
    .then(authenticate.userExists)
    .then(authenticate.passwordCorrect.bind(this, req))
    .then(user => {
      return res.json(...user.rows);
    })
    .catch(err => {
      sendError(req.originalUrl, res, err);
    });
});

router.post("/register", (req, res) => {
  return db
    .raw(`SELECT * FROM users WHERE email = ?`, [req.body.email])
    .then(authenticate.userDoesNotExist)
    .then(() => {
      return db.raw(
        `INSERT INTO users (email, password) VALUES (?,?) RETURNING *`,
        [req.body.email, req.body.password]
      );
    })
    .then(result => {
      res.json(...result.rows);
    })
    .catch(err => {
      sendError(req.originalUrl, res, err);
    });
});

router.put("/:user_id/forgot-password", (req, res) => {
  return db
    .raw(`SELECT * FROM users WHERE id = ?`, [req.params.user_id])
    .then(authenticate.userExists)
    .then(() => {
      return db.raw(
        `UPDATE users SET password = (?) WHERE password = (SELECT password FROM users WHERE id = ?) AND id = ? RETURNING *`,
        [req.body.password, req.params.user_id, req.params.user_id]
      );
    })
    .then(user => {
      if (!user) {
        throw new Error("Update failed");
      }
    })
    .then(() => {
      res.json({ message: "New passord created" });
    })
    .catch(err => {
      sendError(req.originalUrl, res, err);
    });
});

router.get("/:user_id", (req, res) => {
  return db
    .raw(`SELECT * FROM users WHERE id = ?`, [req.params.user_id])
    .then(authenticate.userExists)
    .then(user => {
      res.json(...user.rows);
    })
    .catch(err => {
      sendError(req.originalUrl, res, err);
    });
});

router.delete("/:user_id", (req, res) => {
  return db
    .raw(`DELETE FROM users WHERE id = ? RETURNING *`, [
      Number(req.params.user_id)
    ])
    .then(authenticate.userIdExists)
    .then(() => {
      res.json({
        message: `User id: [${req.params.user_id}] successfully deleted`
      });
    })
    .catch(err => {
      sendError(req.originalUrl, res, err);
    });
});

module.exports = router;
