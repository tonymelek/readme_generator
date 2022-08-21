const fs = require('fs');
const path = require('path')
//get file names in the directory and exclude index.js
const files = fs.readdirSync(__dirname).filter(a => !a.includes('index'));
//read files and assign to templates
const templates = {};
files.forEach(file => {
    templates[`${file.split('.')[0]}`] = fs.readFileSync(path.join(__dirname, file), 'utf-8');
});

module.exports = templates;