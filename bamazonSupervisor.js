const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
//creating connection to database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3307,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
})
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  supervisorMenu();
});