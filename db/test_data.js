"use strict";
const db = require("../db/knex");

const users = [
  ["foooz@ball.com", "fooz4life", "2014-03-01", "2018-06-02"],
  ["soccer@ball.com", "soccer4life", "2010-07-01", "2018-06-12"],
  ["real@user.com", "cooluser111", "1970-06-01", "2015-01-24"],
  ["fake@user.com", "lesscooluser", "1992-10-01", "2015-04-13"]
];

const products = [
  ["slinky", "a fun tripping hazard for all ages", 2, 5.32, "2014-03-01", "2018-06-02"],
  ["gak", "squishy fun for all", 30, 14.99, "1990-03-10", "2018-06-12"],
  ["rock", "best pet ever",999, 19.99, "1970-11-05", "2015-01-24"],
  ["TMNT", "heroes in a half shell",20, 6.99, "1992-10-01", "2015-04-13"]
];

const cartMaker = function (){
  let temp = [];
  for(let i=0; i<10; i++){
    let user_id = Math.ceil(Math.random()*4);
    let product_id = Math.ceil(Math.random()*4);
    console.log(user_id,' ',product_id);
    temp.push([user_id, product_id])
  }
  return temp;
}

const carts = cartMaker();

const users_insert = `INSERT INTO users (email, password, created_at,updated_at) VALUES (?,?,?,?)`;
const products_insert = `INSERT INTO products (title, description, inventory, price, created_at, updated_at) VALUES (?,?,?,?,?,?)`;
const carts_insert = `INSERT INTO cart (user_id, products_id) VALUES (?,?)`;

const insertRow = function(insertStr, data) {
  console.log(data);
  return db.raw(insertStr, [...data]).catch(err => console.log("error: ", err));
};

users.forEach(user => insertRow.apply(this,[users_insert, user]));
products.forEach(product => insertRow.apply(this,[products_insert, product]));
carts.forEach(cart => insertRow.apply(this,[carts_insert, cart]));
