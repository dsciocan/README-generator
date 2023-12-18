const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
    {
        type: 'input',
        message: 'What is the project title?',
        name: 'title',
      },
      {
        type: 'editor',
        message: 'Add a short description: ',
        name: 'description',
      },
      {
        type: 'input',
        message: 'Add a table of contents: ',
        name: 'contents',
      },  
      {
        type: 'input',
        message: 'Add installation requirements: ',
        name: 'installation',
      },
      {
        type: 'input',
        message: 'Explain product usage: ',
        name: 'usage',
      },
      {
        type: 'list',
        message: 'Add licensing information: ',
        name: 'license',
        choices: ["MIT", "GNU GPLv3", "Apache", "BSD 3-clause", "Unlicense"]
      },
      {
        type: 'input',
        message: 'Tell others how they can contribute to the project: ',
        name: 'contributing',
      },
      {
        type: 'input',
        message: 'Add testing information: ',
        name: 'testing',
      },
      {
        type: 'input',
        message: 'Let others know how they can reach you for questions: ',
        name: 'questions',
      },
];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
  err ? console.error(err) : console.log('Success!')
);
}


// function to initialize program
function init() {

}

// // function call to initialize program
init();
