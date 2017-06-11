//requiring packages used in this app (mysql and inquirer)
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

//create connection with database server
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "Bamazon"
});
//establish connection
connection.connect(function (err, res) {
    if (err) throw err;
});

var start = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        console.table(res)
        order();
    });
}
//order function
var order = function () {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "What do you want to do? ",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Quit the Program"
            ]
        }
    ]).then(function (answer) {
        switch (answer.choice) {
            case "View Products for Sale":
                showSale();
                break;
            case "View Low Inventory":
                connection.query("SELECT * FROM products WHERE stock_quantity <5", function (err, res) {
                    if (res) {
                        console.table(res);
                        order();
                    } else {
                        console.log("There are no items with low Inventory.");
                         start();
                    }
                });
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addItem();
                break;
            case "Quit the Program":
                connection.end();
                break;
            default:
                start();
        }
    });
}
//adding new item
var addItem = function () {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "What is the name of the product you want to add? "
    },
    {
        name: "department",
        type: "input",
        message: "Which department does the product belong to? "
    },
    {
        name: "price",
        type: "input",
        message: "What is the price of the item? "
    },
    {
        name: "quantity",
        type: "input",
        message: "How many of the items are available for sale? "
    }
    ]).then(function (answer) {
        connection.query("INSERT INTO products SET ?", [{
            product_name: answer.name,
            product_sales: 0,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
        }], function (err, res) {
            if (err) throw err;
            console.log("\NNEW ITEM ADDED\N")
            start();
        });
    });
}
//show inventory which are available for sale
var showSale = function () {
    connection.query("SELECT * FROM products WHERE stock_quantity > 0", function (err, res) {
        console.table(res);
        order();
    });

}
//add inventory to products
var addInventory = function () {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "Which product do you want to update? [Enter product Name] "
    },
    {
        name: "quant",
        type: "input",
        message: "How much stock do you want to add? "
    }
    ]).then(function (ans) {
        var newQuantity;
        connection.query("select stock_quantity from products where product_name=?", [ans.name], function (err, res) {
            if (err) throw err;
            newQuantity = parseInt(res[0].stock_quantity) + parseInt(ans.quant);
            console.log("\nNew Quantity was Successfully added to the Inventory.\n");


            connection.query("UPDATE products SET stock_quantity=? WHERE product_name=?", [newQuantity, ans.name], function (err, res) {
                if (err) throw err;
                connection.query("SELECT * FROM products", function (err, res) {
                    console.table(res);
                    order();
                });
            });
        });
    });
}
//calling start function to start the program
start();
