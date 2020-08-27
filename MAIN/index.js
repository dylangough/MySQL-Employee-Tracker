var inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require("../MAIN/connection.js");
var mysql = require("mysql");

function runSearch() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What do you want to do?",
        choices: [
            "Add Employee",
            "Add Role",
            "Add Department",
            "Update Employee Role",
            "View All Of The Departments",
            "View All Of The Roles",
            "View All Of Our Employees",
            "Quit The Application",
        ],
    }).then(function (answer) {
        switch (answer.action) {
            case "Add Employee":
                addEmployee();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Department":
                addDepartment();
                break;
        }
    })
}