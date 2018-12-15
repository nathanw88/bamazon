-- create Mysql bamazon
-- create table products
 -- /////////////// table colums
-- id primary key not null
-- product_name "" not null
-- department_name "" not null
-- price(cost to customer) double not null
-- stock quantity int

-- add 10 mock product rows

DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

use bamazon_db;

CREATE TABLE products(
	id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(11) NOT NULL,
    deparment_name VARCHAR(11) NOT NULL,
    price DECIMAL(11, 2) NOT NULL,
    PRIMARY KEY(id)
    );
    
    SELECT * FROM products
    
       
INSERT INTO products (product_name, department_name, price)
  values
    ("item_1", "department_1", 1.99),
    ("item_2", "department_2", 2.99),
    ("item_3", "department_3", 3.99),
    ("item_4", "deparment_4", 4.99),
    ("item_5", "deparment_5", 5.99),
    ("item_6", "deparment_6", 6.99),
    ("item_7", "deparment_7", 7.99),
    ("item_8", "deparment_8", 8.99),
    ("item_9", "deparment_9", 9.99),
    ("item_10", "deparment_10", 10.99);