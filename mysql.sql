DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

use bamazon_db;

CREATE TABLE products(
	id INT(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(11, 2) NOT NULL,
    stock INT(11) DEFAULT 0,
    PRIMARY KEY(id)
    );
    
SELECT * FROM products;
    
INSERT INTO products (product_name, department_name, price, stock)
  values
    ("Mixed nuts", "Snacks", 21.99, 10),
    ("Toaster", "Kitchen", 12.99, 11),
    ("Football", "Sports", 10.99, 30),
    ("Running shoes", "Shoes", 69.99, 40),
    ("Tent", "Hiking", 89.99, 15),
    ("Backpack", "Hiking", 84.99, 7),
    ("Laptop", "Electronics", 1099.99, 17),
    ("Shirt", "Clothing", 10.99, 0),
    ("Snowboard", "Sports", 186.99, 11),
    ("Blender", "Kitchen", 118.99, 17);

    
    ALTER TABLE products ADD product_sales decimal(55, 2) DEFAULT 0; 