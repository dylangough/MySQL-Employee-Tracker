var inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require("../MAIN/connection.js");
var mysql = require("mysql");
const { exit } = require("process");

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
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "View All Of The Departments":
                viewDepartments();
                break;
            case "View All Of The Roles":
                viewRoles();
                break;
            case "View All Of Our Employees":
                viewEmployees();
                break;
            case "Quit The Application":
                exit();
                break;
        }
    });
}
function viewDepartments() {
    var query = "SELECT name, id FROM employees.department ORDER BY id asc";
    connection.query(query, function (err, res) {
        console.table(res);
        runSearch();
    });
}
function viewEmployees() {
    var query = "SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id;";
    connection.query(query, function (err, res) {
        console.table(res);
        runSearch();
    });
}
function viewRoles() {
    var query = "SELECT role.title, role.salary, department.name FROM role, department WHERE department.id = role.department_id;";
    connection.query(query, function (err, res) {
        console.table(res);
        runSearch();
    });
}
function addEmployee() {
    inquirer.prompt([
        {
        name: "firstName",
        type: "input",
        message: "What is the Employee's first name?",
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the Employee's last name?",
        },
        {
            name: "roleID",
            type: "input",
            message: "What is your Employee's Role ID?",
        },
        {
            name: "managerID",
            type: "input",
            message: "What is their manager ID?",
        },
    ])
    .then(function (answer) {
        var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
        connection.query(
            query,
            [answer.firstName, answer.lastName, answer.roleID, answer.managerID],
            function (err, res) {
                if (err) throw err;
                console.log('Successfully Added Employee to System: ${answer.firstName} ${answer.lastName}');
                runSearch();
            }
        )
    })
}