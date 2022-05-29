// import and require packages

const express = require ('express');
const mysql2 = require ('mysql2');
const inquirer = require ('inquirer');
const console_table = require ('console.table');

// 
const PORT = process.env.PORT || 3001;
const app = express()

//  Express Middleware

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'department_db'

},
)