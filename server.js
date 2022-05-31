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
function connect()
{
    var connection = mysql2.createConnection({
        host: "localhost",
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    return connection;
}



// const sequelize = new Sequelize(
//     process.env.DATABASE,
    
//     process.env.MYPASSWORD,
// );


function getTask() {

    console.log("env data", process.env.DB_PASSWORD, process.env.DB_USER)
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
                    console.log("result of inquirer",result);
                    switch (result.jobs) {
                        case "view":
                            view();
                            break;
                        case "add":
                            add();
                            break;
                        case "Update":
                            update();
                            break;
                        case "Leave":
                            leave();
                            return    

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
            switch (result.viewOptions)
            {
                case 'department':
                    query = "";
                    break;
                    case 'roles':
                        query = "";
                        break;
                    case 'employee':
                        query = "Select concat(e.first_name, ' ', e.last_name) as employees, r.title, r.salary from employee e inner join roles as r on e.role_id = r.id";
                        break;
            }
            // some how get from sql and deal with errors
            connection.connect((r) =>{
                
                if (r) throw r;
                console.log("connected as id " + connection.threadId);
                connection.query(query, (err, result) => {
                    if (err) throw err;
                    console.log("result: ", result)
                    console.table(result)
                    connection.end();
                    getTask();

                })
            } )
            

        })
}













function add() {
    inquirer
        .prompt(
            {
                type: 'list',
                name: "db",
                message: 'Which would you like to add?',
                choices: [
                    "Departments",
                    "Roles",
                    "Employees"
                ],
            }
        ).then(function ({ add }) {
            switch (add) {
                case "department":
                    addDepartment()
                    break;
                case "role":
                    addRole()
                    break;
                case 'employee':
                    addEmployee();
                    break;
            }
        })

}
 function addDepartment() {}

 function addRole() {}

 function addEmployee() {}



 function update () {
     inquirer 
     .prompt(
         {
            type: "list",
            name: "update",
            message: "what would you like to update?",
            choices: [
                "role"
            ]
         }
     ).then (function ({update}){
         switch(update) {
             case "role":
                 updateRole();
                 break;
         } 
     })
 }




 function updateRole() {

    getTask();
 }




 function leave () {}

 getTask();