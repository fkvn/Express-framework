// in this one, we don't use any database, just regular object.

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let profiles = [
    {
        username: 'Kevin',
        email: 'kevin@kvn.com',
        url: 'http://kvn.com/fkvn'
    }
]

app.get('/profiles', (req, res) => {
    res.send(profiles)
})

app.get('/profiles/:id', (req, res) => {
    res.send(profiles[req.params.id])
})


app.post('/profiles', (req, res) => {
    // input validation, we can use module "express-validator"
    // using return here to stop the whole request process handling
    // 400: bad request
    if (!req.body.username.trim() || !req.body.email.trim())
        return res.sendStatus(400);

    // you can bind the body to profiles
    profiles.push(req.body)

    // we can also define a new object and get it one by one
    // ******
        // in this case I only need usename and email

        // let newProfile =  {
        //     username: req.body.username,
        //     email: req.body.email
        // }

        // profiles.push(newProfile)
    // ******
    console.log('created', profiles)
    res.sendStatus(201)
})

app.put('/profiles/:id', (req, res) => {
    Object.assign(profiles[req.params.id], req.body)
    console.log('updated', profiles[req.params.id])
    res.sendStatus(204)
})

app.delete('/profiles/:id', (req, res) => {
    profiles.splice(req.params.id, 1)
    console.log('deteled', profiles)
    res.sendStatus(204)
})

app.listen(3000)