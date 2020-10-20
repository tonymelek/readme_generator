const express = require('express')
const fs = require('fs')
const path = require('path')
const mdWriter = require('./routes/functions/mdwriter')
const app = express()
const PORT = process.env.PORT || 5000

//Read download.html
let download;
fs.readFile(path.join(__dirname, 'public', 'download.html'), 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        download = data
    }
})

//Handle the Post request and response
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Adding Static Route
app.use(express.static(path.join(__dirname, 'public')))

//Adding route for the download page
app.get('/download', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'download.html'))
})
//Adding route for the temp page
app.get('/temp', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'temp.html'))
})

//Adding POST Endpoint
app.post('/api/generate', (req, res) => {
    const mdText = mdWriter(req.body)

    fs.writeFile(path.join(__dirname, 'public/output', `README.md`), mdText, err => {
        if (err) {
            return console.log(err)
        }
        else {
            let downloadHTML = download
            downloadHTML = downloadHTML.replace('{{mdFileText}}', mdText)
            downloadHTML = downloadHTML.replace('{{mdFilePath}}', `./output/README.md`)
            fs.writeFile(path.join(__dirname, 'public', 'temp.html'), downloadHTML, err => {
                if (err) {
                    return console.log(err);
                } else {
                    console.log('file generted successfully')
                    res.redirect('/temp')
                }
            })

        }
    })
})



//Initialising the server
app.listen(PORT, () => console.log(`Server is now up and running on port ${PORT}`))