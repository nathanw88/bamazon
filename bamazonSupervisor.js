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


function supervisorMenu(){

  inquirer.prompt([{
    type: "list",
    choices: ["View product sales by department.", "Add department.", "Quit"],
    message: "What would you like to do",
    name: "supervisorChoice"
  }]).then(function(res){

    switch(res.supervisorChoice){
      // view all  products for sale
      case "View product sales by department.":
        console.log("Selecting all products...\n");
        viewDepartments()
        break;
      case "Add department.":
        console.log("Adding department.")
        addDepartment()
        break;
      case "Quit":
        connection.end()

    }
  })
}

function viewDepartments(){
 connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales from departments left join products on departments.department_name = products.department_name ", function(err, res) {
      if (err) throw err;
      console.table(res);
      supervisorMenu();
  })
 

    }

    function addDepartment(){
      inquirer.prompt([
      {
        type: "input",
        message: "Enter department name.",
        name: "departmentName"
      },
      {
        type: "input",
        message:"Enter the overhead costs for department.",
        name: "overhead"
    
      }
      ]).then(function(data){
        var sql= `INSERT INTO departments (department_name, over_head_costs) VALUES (${data.departmentName}, ${data.overhead})`
        connection.query(sql, function(err, response){
          if (err) throw err
          viewDepartments()
        })
      })
    }

    