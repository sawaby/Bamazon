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
        supervisor();
    });
}
//supervisor function
var supervisor = function () {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "What do you want to do? ",
            choices: [
                "View Products Sales By Department",
                "Create New Deparment",
                "Quit the Program"
            ]
        }
    ]).then(function (answer) {
        switch (answer.choice) {
            case "View Products Sales By Department":
                salesByDepartment();
                break;
            case "Create New Deparment":
                createDepartment();
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
var createDepartment = function () {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "What is the name of the Department you want to add? "
    },
    {
        name: "cost",
        type: "input",
        message: "What is the overhead cost of the deparment? "
    }
    ]).then(function (answer) {
        connection.query("INSERT INTO departments SET ?", [{
            department_name: answer.name,
            over_head_costs: answer.cost,
        }], function (err, res) {
            if (err) throw err;
            console.log("\NNEW Department ADDED\N")
            salesByDepartment();
        });
    });
}

//add inventory to products
var salesByDepartment = function () {
    connection.query("SELECT * FROM departments", function (err, res) {
        console.table(res);
        //supervisor :
        // connection.query("SELECT products.product_sales, departments.total_sales, departments.total_profit FROM products INNER JOIN departments ON (products.department_name = departments.department_name) ORDER BY departments.department_name;", 
        //     function (err, res) {
        //         if (err) throw err;
        //         for(var i = 0; i<res.length; i++){
        //            res[i].total_sales = res[i].product_sales;
        //            console.log("new result of total sales",res[i].total_sales);
        //         }
        //     });
        supervisor();
    });
}
//calling start function to start the program
start();
