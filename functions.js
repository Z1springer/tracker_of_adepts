//  switch cases and functions within this file
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
        "Update Info",
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
        case "Update Info":
          updtRole();
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
// add department
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
// add role
function createRole() {
  connection.query("SELECT * FROM department;", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          message: "Job Title:",
          name: "role",
          default: "Menial Worker",
        },
        {
          type: "input",
          message: "What is the salary of this role?",
          name: "salary",
          default: 0,
        },
        {
          type: "list",
          message: "Please choose a department:",
          choices: res.map((department) => ({
            name: department.name,
            value: department.id,
          })),
          name: "departName",
        },
      ])
      .then((res) => {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: res.role,
            salary: res.salary,
            department: res.departName,
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
// add/remove employees
function employCreate() {
  inquirer
    .prompt({
      type: "list",
      message: "Do you wish to Create or Delete an Employee?",
      choices: ["Create", "Delete"],
      name: "confirm",
    })
    .then((confirmation) => {
      if (confirmation.confirm === "Create") {
        connection.query("SELECT * FROM role", function (err, res) {
          if (err) throw err;
          connection.query("SELECT * FROM employee", function (err, emp) {
            const employeeList = emp.map((manager) => ({
              name: manager.first_name + " " + manager.last_name,
              value: manager.id,
            }));
            employeeList.push({ name: "none", value: 0 });
            if (err) throw err;
            inquirer
              .prompt([
                {
                  type: "input",
                  message: "Employees' First Name:",
                  name: "first_name",
                  default: "Johan",
                },
                {
                  type: "input",
                  message: "Employees' Last Name",
                  name: "last_name",
                  default: "Schmitt",
                },
                {
                  type: "list",
                  message: "What is the role of this Employee?",
                  choices: res.map((employee) => ({
                    name: employee.title,
                    value: employee.id,
                  })),
                  name: "role",
                },
                {
                  type: "list",
                  message: "Who is the Manager of this Employee?",
                  choices: employeeList,
                  name: "manager",
                },
              ])
              .then((designation) => {
                connection.query(
                  "INSERT INTO employee SET ?",
                  {
                    first_name: designation.first_name,
                    last_name: designation.last_name,
                    role_id: designation.role,
                    manager_id: designation.manager,
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
        });
      } else {
        connection.query("SELECT * FROM employee", function (err, res) {
          if (err) throw err;
          inquirer
            .prompt({
              type: "list",
              message: "Please Choose the Employee you wish to Terminate",
              choices: res.map((adept) => ({
                name: adept.first_name + " " + adept.last_name,
                value: adept.id,
              })),
              name: "delete",
              default: "Johan Schmitt",
            })
            .then((input) => {
              connection.query(
                "DELETE FROM employee WHERE ?",
                { id: input.delete },
                function (err, res) {
                  if (err) throw err;
                  console.log("yay it works!");
                  start();
                }
              );
            });
        });
      }
    });
}
// update department, role, employees
function updtRole() {
  connection.query("SELECT * FROM employee", function (err, emp) {
    if (err) throw err;
    // a connection to make a list of possible roles
    connection.query("SELECT * FROM role", function (err, res) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            // a list of inquire questions that let you narrow down the list of employees
            type: "list",
            message: "Who's role would you like to update?",
            name: "updtEmployeeName",
            choices: emp.map((empler) => ({
              name: empler.first_name + " " + empler.last_name,
              value: empler.id,
            })),
          },
          {
            type: "list",
            message: "What is the new role you want to give them?",
            name: "updtNewRole",
            choices: res.map((roler) => ({
              name: roler.title,
              value: roler.id,
            })),
          },
        ])
        .then((wut) => {
          // Another connection to update the role for the selected employee
          console.log(
            `[{ role_id: ${wut.updtNewRole} }, { id: ${wut.updtEmployeeName} }],`
          );
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [{ role_id: wut.updtNewRole }, { id: wut.updtEmployeeName }],
            function (err, ret) {
              if (err) throw err;
              console.log("worked it did...");
              start();
            }
          );
        });
    });
  });
}
// view all employees, roles, and departments
function viewCrew() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to view?",
      choices: ["Employees", "Roles", "Departments", "Back"],
      name: "viewChoice",
    })
    .then((fun) => {
      if (fun.viewChoice === "Employees") {
        connection.query(
          "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id AS employee, role.title FROM role LEFT JOIN employee ON employee.role_id = role.id ORDER BY id",
          function (err, res) {
            if (err) throw err;
            console.table(res);
            viewCrew();
          }
        );
      } else if (fun.viewChoice === "Roles") {
        connection.query(
          "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department = department.id;",
          function (err, res) {
            if (err) throw err;
            console.table(res);
            viewCrew();
          }
        );
      } else if (fun.viewChoice === "Departments") {
        connection.query("SELECT * FROM department", function (err, data) {
          if (err) throw err;
          console.table(data);
          viewCrew();
        });
      } else {
        start();
      }
    });
}

start();
