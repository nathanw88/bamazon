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
  managerMenu();
});
//function to show menu to manager
function managerMenu(){

  inquirer.prompt([{
    type: "list",
    choices: ["View products for sale.", "View low inventory.", "Update stock.", "Add product.", "Quit"],
    message: "What would you like to do",
    name: "managerChoice"
  }]).then(function(res){

    switch(res.managerChoice){
      // view all  products for sale
      case "View products for sale.":
        console.log("Selecting all products...\n");
        viewProducts("products")
        break;

      // viewing all products that have less stock then the variable lowInventory
      case "View low inventory.":
        var lowInventory = 5
        console.log("Selecting all low inventory items...\n")
        viewProducts("products", `WHERE stock < ${lowInventory}`)
        
        
        break;

// Update Stock
      case "Update stock.":
        updateStock()
        break;
      //inserting a new product into table
      case "Add product.":
        addProduct()
       break; 
      case "Quit":
        connection.end()

  }
  })

}

//function for showing products to manager
function viewProducts(table, statement=""){
  connection.query(`SELECT * FROM ${table} ${statement}`, function(err, response) {
    if (err) throw err;
    console.table(response);
    managerMenu()
})
}

// function for updating stock
function updateStock(){        
  inquirer.prompt([{
    type: "input",
    message: "Enter the id of the item you want change the stock on",
    name:"stockToUpdate"
  },
  {
    type: "input",
    message: "Enter the quantity you want to change stock by",
    name:"quantityToAdd"
  }]).then(function(answer){
 
    var amount = parseInt(answer.quantityToAdd)
    var itemId= parseInt(answer.stockToUpdate)
  
    connection.query(`UPDATE products SET stock = stock + ${amount} WHERE ?`,[{id: itemId}],function(err, result) {
      if(err) throw err
    })

 
      viewProducts("products", `WHERE id = ${itemId}`)


  })
}

// function for adding products to product table
function addProduct(){
  inquirer.prompt([{
    type: "input",
    message: "Enter product name.",
    name: "productName"
  },
  {
    type: "input",
    message: "Enter department name.",
    name: "departmentName"
  },
  {
    type: "input",
    message:"Enter price to charge customers for item.",
    name: "price"

  },
  {
    type: "input",
    message: "stock amount",
    name: "stock"
  }
  ]).then(function(data){
    var sql= `INSERT INTO products (product_name, department_name, price, stock) VALUES (${data.productName}, ${data.departmentName}, ${data.price}, ${data.stock})`
    connection.query(sql, function(err, response){
      if (err) throw err
      viewProducts("products")
    })
  })
}