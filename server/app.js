var express = require('express')
var app = express()

// Set public folder as root
app.use(express.static('public'))

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`))

// GET methods
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

// POST methods


app.listen(3000, () => {
    console.log(`Server is listening on port 3000.`);
})