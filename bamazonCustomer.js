const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
var product= {}
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3307,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});

// running this will display all the items for sale
function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
  //function for picking what you want to buy.
    function whatToBuy() {

      inquirer.prompt([
        {
          type: "input",
          message: "Please enter the id of the item you would like to buy",
          name: "id"
        }
      ]).then(function(response){
    
        if(parseInt(response.id) === NaN){
          console.log("Please enter a number correlating to the id of an item.") 
          readProducts()
          
         
        }

        else{
       
          var index = (parseInt(response.id -1));
          product = res[index]
          console.log(product)
        
          if(product.stock === 0){
            console.log("Sorry we are out of that item.")         
            readProducts()
          
          }
          else{
            quantityToBuy(response.id)
          }
        }
      })
    }
    
    whatToBuy()
  
    
  });
  
}


//function for prompting user for how many items they would like to buy
function quantityToBuy(id){
  inquirer.prompt([
    {
      type: "input",
      message: "Please enter the quantity of the item you would like to buy",
      name: "quantity"
    }
  ]).then(function(res){
    // check if enough stock is left 
    if(res.quantity > 0){
    if(res.quantity > product.stock){
      //if not enough stock log phrase letting customer know that you are out of stock
      console.log("insufficient stock for that, we appreciate your understanding.")
      inquirer.prompt([
        {
          type: "list",
          message: `Would you like to buy the ${product.stock} ${product.product_name} we have left?`,
          choices: ["Yes, please", "No, thanks", "Buy different amount" ],
          name: "userChoice"
        }
      ]).then(function(response){
        switch (response.userChoice){
          case "Yes, please":
          cart(id, product.stock)
          break;
          case "No, thanks":
          readProducts()
          break;
          case "Buy different amount":
          quantityToBuy(id)
          break;
          default:
          console.log("Error with insufficent stock.")
        }
      })
    }
    else if(res.quantity <= product.stock){
      cart( id, res.quantity)

    }
  }
  else {
    console.log("Please enter a number greater then 0.")
    quantityToBuy(id)
  }

  })


}

//cart tells customers total price and confirms purchase
function cart(id, quantity){
  var total = (product.price * quantity)
  inquirer.prompt([
    {
      type: "list",
      message: `Your total comes to $${total} please confirm purchase. `,
      choices: ["Yes, please", "No, thanks"],
      name: "userChoice"
    }
  ]).then(function(res){
    switch (res.userChoice){

      case "Yes, please":
      console.group(`Thanks for buying ${quantity} ${product.product_name}`)
      updateStock(id, -quantity)
      break;

      case "No, thanks":
      readProducts()
      break;

      default:
      console.log("Error cart")
      
    }
  })

}
//function for updating stock after customer confirms purchase
function updateStock(itemid, quantity){
  connection.query(`UPDATE products SET stock = stock + ${quantity} WHERE ?`,
    [
      {
        id: itemid
      }
    ],function(err, res) {
     
    
    readProducts()
     
    }
  )


}







