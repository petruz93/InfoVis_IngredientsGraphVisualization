var express = require('express')
var app = express()

// GET methods
app.get('/', (req, res) => {
    res.sendFile(`${app.path()}/index.html`)
})

// POST methods


app.listen(3000, () => {
    console.log(`Server is listening on port 3000.`);
})