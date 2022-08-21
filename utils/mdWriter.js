//Licenses Badges
const licenses = {
    "GPL V3": "![License: 'GPL v3'](https://img.shields.io/badge/License-GPLv3-blue.svg)"

    , "MIT": "![License: 'MIT'](https://img.shields.io/badge/License-MIT-yellow.svg)"

    , "MPL V2": "![License:'MPL 2.0'](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)"
}
// function to write README markdown
const mdWriter = (responses) => {
    return `${licenses[responses.license]}
# ${responses.title}
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
## Description
${responses.description}
## Installation
${responses.installation}
## Usage
${responses.usage}
## Contributing
${responses.contribution}
## Tests
${responses.tests}
## Questions
You are welcome to provide any feedback and/or ask questions.
Please, send any question to my e-mail [${responses.email}](mailto:${responses.email}) and/or visit my profile on [Github](https://github.com/${responses.username})

## License
The project is protected under ${responses.license},you may need to read through license conditions`
}

module.exports = mdWriter