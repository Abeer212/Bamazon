DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(20,2) NOT NULL,
  stock_quantity INT(20) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jordan 1", "Sneakers", 180.00, 12),
  ("Jordan 3", "Sneakers", 200.00, 7),
  ("Jordan 11", "Sneakers", 170.00, 14),
  ("Nike Air Max", "Sneakers", 120.00, 25),
  ("Slim Fit Chinos", "Apparel", 35.00, 40),
  ("Basic Black Tee", "Apparel", 15.50, 120),
  ("Yankees Fitted", "Accessories", 17.25, 150),
  ("Yankees Dad Hat", "Accessories", 14.95, 234),
  ("Rough Jeans", "Apparel", 37.75, 55),
  ("Hot Dog Socks", "Accessories", 7.95, 568);
