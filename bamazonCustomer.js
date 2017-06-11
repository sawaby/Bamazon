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
var result;
var start = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        result = res;
        console.table(res)
        order();
    });
}
//order function
var order = function () {
    inquirer.prompt([
        {
            name: "choice",
            type: "input",
            message: "Enter the id of item you want to buy?[Quit with Q]"
        }
    ]).then(function (ans) {
        if (ans.choice.toLowerCase() === "q") {
            //releasing the connection
            connection.end();
        } else {
            id = parseInt(ans.choice);
            //console.log(id);
            inquirer.prompt([
                {
                    name: "units",
                    type: "input",
                    message: "How many units of the product do you want to buy? "
                }
            ]).then(function (answer) {
                console.log("Transaction was susseccful.");
                // console.log(result[id - 1].stock_quantity);
                var units = parseInt(answer.units);
                // console.log(units)
                if (result[id - 1].stock_quantity >= units) {
                    //retrieve price of each product from database
                    var price = parseInt(result[id - 1].price);
                    //find how many products will remain in stock after purchase
                    var quantity = result[id - 1].stock_quantity - units;
                    //the whole cost after purchase
                    var cost = (parseInt(answer.units) * price);
                    //update product sales which shows how many product was sold
                    var sales = parseInt(result[id-1].product_sales)+cost;
                    console.log("The cost of " + units + " units of your purchase was: " + cost);
                    //update database according to new purchase
                    connection.query("UPDATE products SET stock_quantity=?, product_sales=? WHERE item_id=? ", [quantity, sales, id],
                        function (err, res) {
                            if (err) throw err;
                            start();
                        });
                } else {
                    console.log("Insufficient quantity!");
                    start();
                }
            });
        }
    });
}
//calling start function to start the program
start();
