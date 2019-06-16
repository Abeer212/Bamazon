var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  products();
});

function products() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    promptForPurchase(res);
  });
}

function promptForPurchase(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message:
          "What item would you like to purchase? Please choose the ID. [Press Q to Quit]",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      checkIfUserWantsToQuit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);
      if (product) {
        promptUserForQuantity(product);
      } else {
        console.log("\nWe currently do not have that item.");
        products();
      }
    });
}

function promptUserForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like? [Press Q to Quit]",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      checkIfUserWantsToQuit(val.quantity);
      var quantity = parseInt(val.quantity);
      if (quantity > product.stock_quantity) {
        console.log("\nSorry we're all sold out!");
        products();
      } else {
        makePurchase(product, quantity);
      }
    });
}

function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      console.log(
        "\nThank you for your purchase of " +
          quantity +
          " " +
          product.product_name +
          "'s!"
      );
      products();
    }
  );
}

function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;
}

function checkIfUserWantsToQuit(choice) {
  if (choice.toLowerCase() === "q") {
    console.log("Thank you for shopping with Bamazon!");
    process.exit(0);
  }
}
