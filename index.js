const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'employee_db',
});

// Connect to the database
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the database');
  startApp();
});

// Function to display main menu and handle user choices
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
        // Add cases for other actions
        case 'Exit':
          connection.end();
          break;
      }
    });
}

// Function to view all departments
function viewDepartments() {
  // Execute a query to retrieve department data from the database
  connection.query('SELECT * FROM department', (err, departments) => {
    if (err) throw err;
    console.table(departments);
    startApp();
  });
}

// Function to view all roles
function viewRoles() {
  // Execute a query to retrieve role data from the database
  connection.query('SELECT * FROM role', (err, roles) => {
    if (err) throw err;
    console.table(roles);
    startApp();
  });
}

// Function to view all employees
function viewEmployees() {
  // Execute a query to retrieve employee data from the database
  connection.query('SELECT * FROM employee', (err, employees) => {
    if (err) throw err;
    console.table(employees);
    startApp();
  });
}

// Function to add a department
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
      // Execute a query to insert the new department into the database
      connection.query('INSERT INTO department (name) VALUES (?)', [answer.name], err => {
        if (err) throw err;
        console.log('Department added successfully!');
        startApp();
      });
    });
}

// Add functions for other actions (addRole, addEmployee, updateEmployeeRole, etc.)

// Start the application
startApp();
