// import and require packages

const express = require('express');
const mysql2 = require('mysql2');
//const Sequelize = require('sequelize')
const inquirer = require('inquirer');
const table = require("console.table");
require('dotenv').config();

// 
const PORT = process.env.PORT || 3001;
const app = express()

//  Express Middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database

//connect using mysql2
function connect() {
    var connection = mysql2.createConnection({
        host: "localhost",
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    return connection;
}





function getTask() {

    inquirer
        .prompt(
            {
                type: 'list',
                name: 'jobs',
                message: 'What do you want to do?',
                choices: [
                    "view",
                    "Add a Department",
                    "Add a Role",
                    "Add an Employee",
                    "Update an Employee Role",
                    "Leave without making a choice",
                ]

            })
        .then(function (result) {

            switch (result.jobs) {
                case "view":
                    view();
                    break;
                case "Add a Role":
                    add("roles");
                    break;
                case "Add a Department":
                    add("departments")
                    break
                case "Add an Employee":
                    add("employees")
                    break
                case "Update":
                    update();
                    break;
                case "Leave without making a choice":
                    return
                    break
                default:
                    console.log("error in selection process")
                    break

            }
        })
}









function view() {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'viewOptions',
                message: "Which Department would you like to view?",
                choices: [
                    "department",
                    "roles",
                    "employee"
                ]
            }
        ).then((result) => {
            var connection = connect();
            var query = "";
            switch (result.viewOptions) {
                case 'department':
                    query = "SELECT * FROM department_db.department ";
                    break;
                case 'roles':
                    query = "SELECT * FROM department_db.roles; ";
                    break;
                case 'employee':
                    query = "Select concat(e.first_name, ' ', e.last_name) as employees, r.title, r.salary from employee e inner join roles as r on e.role_id = r.id";
                    break;
            }
            
            connection.connect((r) => {

                if (r) throw r;
                console.log("connected as id " + connection.threadId);
                connection.query(query, (err, result) => {
                    if (err) throw err;
                    console.log("result: ", result)
                    console.table(result)
                    connection.end();
                    getTask();

                })
            })


        })
}

async function add(tableSelection) {
    var query = "";

    switch (tableSelection) {
        case "roles":
            result = await inquirer.prompt([{
                type: "input",
                name: "title",
                message: "Please enter a title for the role",
            },
            {
                type: "input",
                name: "salary",
                message: "Please enter a salary for the role",
            },
            {
                type: "input",
                name: "department_id",
                message: "Please enter a department_id for the role",

            }])
            console.log("this is your role result", result)
            query = `insert into roles (department_id, salary, title) values (${result.department_id}, ${result.salary}, '${result.title}')`
            executeQuery(query)
            getTask()



            break
        case "departments":
            result = await inquirer.prompt([{
                type: "input",
                name: "name",
                message: "Please enter a name for the department",
            },
            ])
            console.log("this is your department result", result)
            query = `insert into department (department_name) values ('${result.department_name}',)`
            executeQuery(query)
            getTask()
            break
        case "employees":
            result = await inquirer.prompt([{
                type: "input",
                name: "first_name",
                message: "Please enter a first name",
            },
            {
                type: "input",
                name: "last_name",
                message: "Please enter a last name",
            },
            {
                type: "input",
                name: "role_id",
                message: "Please enter a role_id ",

            },
            {
                type: "input",
                name: "manager_id",
                message: "Please enter a manager_id ",

            }
        ])
            console.log("this is your role result", result)
            query = `insert into department_db.employee (first_name, last_name, role_id, manager_id)) values (${result.first_name}, ${result.last_name}, ${result.role_id},${result.manager_id})`
            executeQuery(query)
            getTask()
            break
    }
}

function executeQuery(query) {
    var connection = connect();
    connection.connect((r) => {

        if (r) throw r;
        console.log("connected as id " + connection.threadId);
        connection.query(query, (err, result) => {
            if (err) {
                console.log("Error", err)
                throw err
            };
            if (result.affectedRows > 0) 
            {
                console.log("sucessfully updated table")
            }
            connection.end();
        })
    })
}
getTask();