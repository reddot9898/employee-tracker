const mysql = require('mysql2');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'employee_db',
});


connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the database');
  startApp();
});

function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ])
    .then(answer => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;

        case 'Exit':
          connection.end();
          break;
      }
    });
}


function viewDepartments() {

  connection.query('SELECT * FROM department', (err, departments) => {
    if (err) throw err;
    console.table(departments);
    startApp();
  });
}


function viewRoles() {

  connection.query('SELECT * FROM role', (err, roles) => {
    if (err) throw err;
    console.table(roles);
    startApp();
  });
}


function viewEmployees() {

  connection.query('SELECT * FROM employee', (err, employees) => {
    if (err) throw err;
    console.table(employees);
    startApp();
  });
}


function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new department:',
      },
    ])
    .then(answer => {

      connection.query('INSERT INTO department (name) VALUES (?)', [answer.name], err => {
        if (err) throw err;
        console.log('Department added successfully!');
        startApp();
      });
    });
}


startApp();
