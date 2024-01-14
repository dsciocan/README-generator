const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
    {
      type: 'input',
      message: 'What is the project title?',
      name: 'title'
    },
    {
        type: 'input',
        message: 'Add a short description: ',
        name: 'description',
      },
      {
        type: 'list',
        message: 'Add a table of contents: ',
        name: 'contents',
        choices:["Yes", "No"]
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


function capitaliseTitle(title) {
  const firstLetter = title.charAt(0)
  const firstLetterCap = firstLetter.toUpperCase()
  const remainingLetters = title.slice(1)
  const capitalisedWord = firstLetterCap + remainingLetters;
  return capitalisedWord;
}

// function to write README file
function writeToFile() {
  inquirer
  .prompt (questions)   
  .then((answers) => {
    let contents = [];
    for (const element in answers) {
      if(answers[element] != "" && element != "title" && element != "description" && element != "contents" && element != "email") {
        if(element === "username") { 
        contents.push("questions")
        } else {
        contents.push(element)
        }
      }
    }

    for(const answer in answers) {
      if(answers[answer] != "") {
        const content = answers[answer].replace(/  /g, " \n\n ");
        if(answer === "contents" && content === "Yes" ) {
          fs.appendFileSync("README.md", `## Table of Contents\n\n`) 
          contents.forEach((section) => fs.appendFileSync("README.md", `[${capitaliseTitle(section)}](#${section})\n\n`))
        }
        answer === "title" ?  fs.appendFileSync("README.md", `# ${content}\n`) :
        answer === "license" ? fs.appendFileSync("README.md", `## License\n [![License: ${content}](https://img.shields.io/badge/License-${content}-blue.svg)](https://opensource.org/licenses/${content})\n`) :
        answer === "username" ?  fs.appendFileSync("README.md", `## Questions\n For questions, contact me through the methods below:\n\n GitHub: [${content}](https://github.com/${content})\n\n`) :
        answer === "email" ?  fs.appendFileSync("README.md",`Email: ${content}\n`) :
        answer != "contents"? fs.appendFileSync("README.md",`## ${capitaliseTitle(answer)}\n ${content}\n`) :
        console.log("")
      }
    }
 })
}


function init() {
  console.log("This is a program that generates content for a README file by taking in user content.");
  console.log("Just write the content for each section then press Enter.")
  console.log("During user input for each section, use double space where a line break should go and it will be formatted automatically.");
  console.log("To skip a section, please leave it blank.")
  writeToFile()
}
// // function call to initialize program
init()

