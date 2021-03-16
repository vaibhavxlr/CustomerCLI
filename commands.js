#!/usr/bin/env node --no-warnings

const program = require("commander");

const {prompt} = require('inquirer');

//Customer Questions
const questions = [
    {
        type : 'input',
        name : 'firstname',
        message : 'Customer First name'
    },
    {
        type : 'input',
        name : 'lastname',
        message : 'Customer last name'
    },
    {
        type : 'input',
        name : 'phone',
        message : 'Customer Phone Number'
    },
    {
        type : 'input',
        name : 'email',
        message : 'Customer email address'
    }

];

const {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
} = require('./index')

program
    .version('1.0.0')
    .description('Client Management System');

// program
//     .command('add <firstname> <lastname> <phone> <email>')
//     .alias('a')
//     .description('Add a customer')
//     .action((firstname, lastname, phone,email) => {
//         addCustomer({firstname, lastname, phone, email});
//     });


//Add command
program
    .command('add')
    .alias('a')
    .description('Add a customer')
    .action(() => {
        prompt(questions).then(answers => addCustomer(answers));
    })

//Find command
program
    .command('find <name>')
    .alias('f')
    .description('Find a customer')
    .action(name => findCustomer(name));

//Update command
program
    .command('update <_id>')
    .alias('u')
    .description('Update a customer')
    .action((_id) => {
        prompt(questions).then(answers => updateCustomer(_id, answers));
    });

//Remove command
program
    .command('remove <_id>')
    .alias('f')
    .description('Remove a customer')
    .action(_id => removeCustomer(_id));


//List command
program
    .command('list')
    .alias('l')
    .description('List customers')
    .action(() => listCustomers());   
program.parse(process.argv);
