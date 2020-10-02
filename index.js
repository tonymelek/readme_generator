//Required Packages for the app.
const fs = require("fs")
const inquirer = require("inquirer")
const util = require('util')
//Make write file Async
const asyncWrite = util.promisify(fs.writeFile);
// array of questions for user
const questions = [
    {
        message: "Please, Enter your project title",
        type: "input"
    },
    {
        message: "Please, Enter the project description",
        type: "input"
    },
    {
        message: "Please, Enter the project's installation procedures",
        type: "input"
    },
    {
        message: "Please, Enter usage instructions",
        type: "input"
    },
    {
        message: "Please, Select License Type",
        type: "list",
        choices: ["GPL V3", "MIT", "MPL V2"]
    },
    {
        message: "Please, Enter contribution guide for this project",
        type: "input"
    },

    {
        message: "Please, Enter tests that can be applied to your project",
        type: "input"
    },
    {
        message: "Please, Enter your e-mail address",
        type: "input"
    },
    {
        message: "Please, Enter your GitHub username",
        type: "input",
        name: "username"
    }
];
const tableOfContents = [
    'Title',
    'Description',
    'Installation',
    'Usage',
    'License',
    'Contributing',
    'Tests',
    'Questions'
]
//Add name to Questions Object
tableOfContents.forEach((item, index) => {
    questions[index].name = item
})
//Licenses Badges
const licenses = {
    "GPL V3": "![License: 'GPL v3'](https://img.shields.io/badge/License-GPLv3-blue.svg)"

    , "MIT": "![License: 'MIT'](https://img.shields.io/badge/License-MIT-yellow.svg)"

    , "MPL V2": "![License:'MPL 2.0'](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)"
}

// function to write README markdown
function mdWriter(responses) {
    return `${licenses[responses.License]}
# ${responses.Title}
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
## Description
${responses.Description}
## Installation
${responses.Installation}
## Usage
${responses.Usage}
## Contributing
${responses.Contributing}
## Tests
${responses.Tests}
## Questions
You are welcome to provide any feedback and/or ask questions.
Please, send any question to my e-mail [${responses.Questions}](mailto:${responses.Questions}) and/or visit my profile on [Github](https://github.com/${responses.username})

## License
The project is protected under ${responses.License},you may need to read through licens conditions`
}



// function to initialize program
async function init() {
    try {
        //Start asking questions to the user
        const responses = await inquirer.prompt(questions)
        //Use user date to write into the README.md
        await asyncWrite(`${responses.Title}.md`, mdWriter(responses))
        console.log("Successfully wrote README.md");
    }
    //Handle error
    catch (err) {
        console.log(err)
    }
}
// function call to initialize program
init();