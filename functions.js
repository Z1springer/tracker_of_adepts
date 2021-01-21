// TODO:  switch cases and functions within this file
const inquirer = require("inquirer");
const { createConnection } = require("mysql");
require("console.table");
// async function to load the main prompts needed
const start = () => {
  inquirer
    .prompt({
      type: "input",
      message: "Would you like to add a department?",
      name: "depCode",
    })
    .then((ans) => {
      connection.query(
        "SELECT * FROM department WHERE name = ?",
        [name],
        function (err, data) {
          if (err) {
            throw err;
          } else {
            console.table(data);
            start();
          }
        }
      );
    });
  // switch cases
  // for each case call a function
};

// functions to
// add/remove department

// add/remove role

// add/remove employees

// update department, role, employees

function logAndRestart(err, data) {
  if (err) {
    throw err;
  } else {
    console.log(data);
    // launch main function here
  }
}
