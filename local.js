const express = require('express');
const fs = require('fs');
const app = express();
const compiler = require('./utils/handlebars');
const templates = require('./templates');
const mdWriter = require('./utils/mdWriter');

//Handle the Post request and response
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    const homePage = fs.readFileSync('./templates/index.html', 'utf-8');
    res.send(homePage);
});
app.post('/', (req, res) => {
    const event = {
        template: 'download',
        emailBodyArgs: { ...req.body }
    }
    const mdText = mdWriter(event.emailBodyArgs)
    const compile = compiler(templates[event.template])
    const message = compile({ 'mdFileText': mdText });
    res.send(message)
});
app.listen(5000)


