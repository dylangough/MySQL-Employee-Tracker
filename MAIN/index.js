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
            );
        });
}
function addDepartment() {
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "What department would you like to incorporate?",
        },
    ])
        .then(function (answer) {
            var query = "INSERT INTO department (name) VALUE (?)";
            connection.query(query, answer.departmentName, function (err, res) {
                if (err) throw err;
                console.log(`n New Department Add: ${answer.departmentName} \n`);
                runSearch();
            });
        });
}
function addRole() {
    inquirer.prompt([
        {
            name: "departmentID",
            type: "list",
            message: "What department will this role be in? Select 1-Engineering, 2 Sales, 3-HR, 4-IT, 5-Legal",
            choices: [1, 2, 3, 4, 5],
        },
        {
            name: "title",
            type: "input",
            message: "What is the name of this new Role?",
        },
        {
            name: "salary",
            type: "input",
            message: "Enter the salary for this role:",
        },
    ])
        .then(function (answer) {
            var query = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
            connection.query(query, [answer.title, answer.salary, answer.departmentID], function (err, res) {
                if (err) throw err;
                console.log(`\n New Role Added: ${answer.title} \n`);
                runSearch();
            }
            );
        });
}
function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: "currentEmployeeID",
            type: "input",
            message: "What is the ID of the employee you want to update?",
        },
        {
            name: "newRoleTitle",
            type: "input",
            message: "What is the title of the role?",
        },
        {
            name: "newRoleSalary",
            type: "input",
            message: "What is their salary?",
        },
        {
            name: "newRoleDeptID",
            type: "list",
            message: "What department will they belong to? Select 1 for Sales, 2 for Engineering, 3 for Finance, and 4 for Legal",
            choices: [1, 2, 3, 4],
        }
    ])
        .then(function (answer) {
            var query = "UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ?";
            connection.query(query, [answer.newRoleTitle, answer.newRoleSalary, answer.newRoleDeptID, parseInt(answer.currentEmployeeID)],
                function (err, res) {
                    if (err) throw err;
                    console.log(`\n Succeeded in Adding Role \n`);
                    runSearch();
                }
            );
        });
}

function exit() {
    process.exit();
}
module.exports = runSearch;