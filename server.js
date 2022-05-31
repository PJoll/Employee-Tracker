// import and require packages

const express = require('express');
const mysql2 = require('mysql2');
const Sequelize = require('sequelize')
const inquirer = require('inquirer');
const table = require("console.table");

// 
const PORT = process.env.PORT || 3001;
const app = express()

//  Express Middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.MYPASSWORD,
);


function getTask() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'jobs',
                message: 'What do you want to do?',
                choices: [
                    "View all Departments",
                    "View all Roles",
                    "View all Employees",
                    "Add a Department",
                    "Add a Role",
                    "Add an Employee",
                    "Update an Employee Role",
                    "Leave without making a choice",
                ]

            }
                .then(function ({ jobs }) {
                    switch (jobs) {
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
        ])
}









function view() {
    inquirer
        .prompt(
            {
                type: "list",
                name: "db",
                message: "Which Department would you like to view?",
                choices: [
                    "Departments",
                    "Roles",
                    "Employees"
                ]
            }
        ).then(function({db}){
            // some how get from sql and deal with errors

            console.table(data)
            getTask();
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




 function updateRole() {}