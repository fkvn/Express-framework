const express = require('express')
const app = express()

// define the root route
app.get('/', (req, res) => {

    // similar to 'end' event we learn from Node core

    // for normal response (text)
    // res.send('hello world')


    // for json response
    res.send({msg: 'hello world'})
})

app.listen(3000)