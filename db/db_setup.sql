\c postgres;

DROP DATABASE IF EXISTS knex_shopping;

DROP USER IF EXISTS knex_shopping_user;

CREATE USER knex_shopping_user WITH PASSWORD 'password';
CREATE DATABASE knex_shopping WITH OWNER knex_shopping_user;

\c knex_shopping knex_shopping_user;

CREATE TABLE users
(
  id SERIAL NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE products
(
  id SERIAL NOT NULL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  inventory INTEGER NOT NULL DEFAULT 0,
  price DECIMAL(8,2),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE cart
(
  id SERIAL NOT NULL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id),
  products_id INTEGER NOT NULL REFERENCES products (id),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);