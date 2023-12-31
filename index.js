const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
      {
        type: 'input',
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
        choices: ["MIT", "GPLv3", "Apache", "BSD 3-clause", "Unlicense"]
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
        message: 'Please enter your GitHub username so others can contact you: ',
        name: 'username',
      },
      {
      type: 'input',
      message: 'Please enter your email address so others can contact you: ',
      name: 'email',
      }
];

const titleQuestion = {
  type: 'input',
  message: 'What is the project title?',
  name: 'title',
}
let title;
let fileName;

// function to write README file
function writeToFile(data) {
    fs.writeFile("README.md", data, (err) =>
  err ? console.error(err) : console.log('Section added!')
);
}

let email;
let username;

function licenseBadge(choice) {
  if(choice === "MIT") {
    fs.writeFile(fileName, "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)")
  } else if (choice === "GPLv3") {
    fs.writeFile(fileName, "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)")
  } else if (choice === "Apache") {
    fs.writeFile(fileName, "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)")
  } else if (choice === "BSD 3-clause") {
    fs.writeFile(fileName, "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)")
  } else if (choice === "Unlicense") {
    fs.writeFile(fileName, "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)")
  }
}

// function to initialize program
function init() {
inquirer
.prompt (titleQuestion)   
.then((response) => {
  title = response;
  writeToFile(generateMarkdown(response))
})
.then(() => {
  for (const question of questions) {
  inquirer
  .prompt (question)   
  .then((response) => {
  if( question.type === "input") {
    question.name === "username" ? writeToFile(`## Questions\n ### ${question.name.charAt(0).toUpperCase()}\n [${response}](https://https://github.com/${response})`) :
    question.name === "email" ? writeToFile(`### ${question.name.charAt(0).toUpperCase()}\n ${response}`) :
    writeToFile(fileName, `## ${question.name.charAt(0).toUpperCase()}\n ${response}`)
  } else if (question.type === "list") {
   licenseBadge(response);
  }
})
}})}

// // function call to initialize program
init();
