CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, deparTment_name, price, stock_quantity) 
VALUES ('Frozen', 'Movies', 30, 20),
 ('Moana', 'Movies', 40, 40),
 ('Samsung', 'Information Technology', 800, 888), 
 ('DeLL', 'Information Technology', 840, 900),
 ('Apple', 'Information Technology', 950, 456),
 ('White Board', 'Stationary', 90, 300),
 ('Marker', 'Stationary', 20, 900),
 ('Eraser', 'Stationary', 10, 700),
 ('Socks', 'Dress', 10, 200),
 ('Scarf', 'Dress', 20, 870);
 
 ALTER TABLE products ADD product_sales INT(60) AFTER product_name;
 
UPDATE products SET product_sales= CASE item_id
		WHEN 1 THEN 0
		WHEN 2 THEN 1
		WHEN 3 THEN 0
		WHEN 4 THEN 3
		WHEN 5 THEN 0
		WHEN 6 THEN 0
		WHEN 7 THEN 1
		WHEN 8 THEN 0
		WHEN 9 THEN 3
		WHEN 10 THEN 0
    END
WHERE item_id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10);


CREATE TABLE departments(
	department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs DECIMAL(5,2) NOT NULL,
    total_sales DECIMAL(5,2) ,
    total_profit DECIMAL(5,2),
    PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name, over_head_costs) 
VALUES ('Movies', 200), ('Information Technology', 500), ('Stationary', 200), ('Dress', 100);



SELECT * FROM departments;
SELECT * FROM products;

SELECT products.product_sales, departments.total_sales, departments.total_profit
 from products INNER JOIN departments ON (products.department_name = departments.department_name)
 order by departments.department_name;