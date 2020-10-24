const express = require('express')
const fs = require('fs')
const path = require('path')
const mdWriter = require('./routes/functions/mdwriter')
const app = express()
const PORT = process.env.PORT || 5500
const expbs = require('express-handlebars')

//Identify the use of Handlebars
app.engine('handlebars', expbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')


//Handle the Post request and response
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Adding Static Route
app.use(express.static(path.join(__dirname, 'views')))

//Home Page
app.get('/', (req, res) => {
    res.render('index', {
        'title': 'Home'
    })
})


//Adding POST Endpoint
app.post('/api/generate', (req, res) => {
    const mdText = mdWriter(req.body)
    res.render('download', {
        'title': 'Download README',
        'mdFileText': mdText,
        'mdFilePath': '../output/README.md'
    })
    fs.writeFile(path.join(__dirname, 'views/output', `README.md`), mdText, err => {
        if (err) {
            return console.log(err)
        }
        console.log('README.md file generted successfully')
    })

})

//Initialising the server
app.listen(PORT, () => console.log(`Server is now up and running on port ${PORT}`))