// FIXME:  switch cases and functions within this file
const inquirer = require("inquirer");
const connection = require("./db/connection");
require("console.table");
// async function to load the main prompts needed
const start = () => {
  inquirer
    .prompt({
      type: "list",
      name: "homeList",
      message: "What are you here to do?",
      choices: [
        "Create/Delete Department",
        "Create/Delete Role",
        "Create/Delete Employee",
        "View Employees",
      ],
    })
    .then((homeList) => {
      // switch cases
      switch (homeList.homeList) {
        // for each case call a function
        case "Create/Delete Department":
          createDepart();
          break;
        case "Create/Delete Role":
          createRole();
          break;
        case "Create/Delete Employee":
          employCreate();
          break;
        case "View Employees":
          viewCrew();
          break;
        default:
          console.log("somethins broke");
      }
    });
};

// functions to
// add/remove department
function createDepart() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department you want to add?",
      name: "name",
    })
    .then((ans) => {
      connection.query(
        "INSERT INTO department SET ?",
        { name: ans.name },
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
}
// add/remove role
function createRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the role of this employee?",
        name: "role",
      },
      {
        type: "input",
        message: "What is the salary of this role?",
        name: "salary",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO department SET ?",
        { title: res.title, salary: res.salary },
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
}
// add/remove employees
function createRole() {
  inquirer
    .prompt({
      type: "list",
      message: "Do you wish to Create or Delete a role?",
      choices: ["Create", "Delete"],
      name: "confirm",
    })
    .then((solution) => {
      inquirer
        .prompt([
          {
            type: "input",
            message: "Employees' First Name:",
            name: "first_name",
          },
          {
            type: "input",
            message: "Employees' Last Name",
            name: "last_name",
          },
        ])
        .then((designation) => {
          connection.query(
            "INSERT INTO department SET ?",
            {
              first_name: designation.first_name,
              last_name: designation.last_name,
            },
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
    });
}
// update department, role, employees

// function logAndRestart(err, data) {
//   if (err) {
//     throw err;
//   } else {
//     console.log(data);
//     start();
//   }
// }
start();
