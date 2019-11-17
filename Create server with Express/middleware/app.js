const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')



// ******* middleware ***********
// every request has to go through middleware (in-order) first before reaching to any endpoints
// In order words, middleware defines "rules" for all routes (request)

// first middleware usijng body-parser
// for the body-part json, it doesn't require you to configure it.
// for other types, they might require some configurations, such as the next middleware - morgan
app.use(bodyParser.json())


// second middleware using morgan which requires some configurations
// morgan takes 'dev' as a footprint of server-side logging
// with morgan 'dev' middleware, the format of log will be better. It might contains the status, speed, and so on.
// you also can define your own format with morgan module
app.use(morgan('dev'))

// third middleware
app.use((req, res, next) => {
    // log of method and url
    console.log(`${req.method}: ${req.url}`)
    next()
})

// forth middleware
// you can define middleware variable and call it many times without implementing again.
const secondMiddleware = (req, res, next) => {
    //if the request query contains api_key parameter
    // for example: localhost:3000/?api_key=<anything> -> 200, OK
    // for example: localhost:3000/ -> 401, Not authorized
    if(req.query.api_key) {
        next()
    }
    else {
        res.status(401).send({msg: 'Not authorized'})
    }
}
app.use(secondMiddleware)



// ******* routes (endpoints)***********

// define root route
app.get('/', (req, res) => {

    // similar to 'end' event we learn from Node core
    // for json response
    res.send({msg: 'hello world'})
})

app.get('/accounts', (req, res) => {
    // for json response
    res.send({msg: 'accounts'})
})

//****** we also can define middleware for specific endpoint (route/request)
app.get('/account', (req, res, next) => { // define middleware
    // in this case, the request url must contain both api_key and inlinemiddleware variable
    // so for this endpoint, it's gone through all defined middlewares above
    if(req.query.inlineMiddleware) {
        console.log('accounts inline middleware')
        next()
    }
    else {
        res.status(401).send({msg: 'Not authorized for second middleware'})
    }
}, (req, res) => {  // result after passing all 3 middlewares
    res.send({msg: 'account for first and second middleware'})
})

//******* let's define another inline middleware here to test the last middlware for deteching errors
app.get('/transactions', (req, res,next) => {
    if(req.query.approved) {
        console.log('approved')
        next()
    }
    else {
        console.log('not approved')
        next(new Error('oopps'))
    }
}, (req, res) => {
    res.send({msg: 'transactions'})
})

//***** test body-parser middleware with a post endpoint
// run command: curl -d '{"key":"value"}' http://localhost:3000/transactions?api_key=1 -i -H 'Content-Type: application/json'
app.post('/transactions', (req, res, next) => {
    console.log(req.body)
    res.send({msg: 'Post - transactions'})
})

//***** we can also define middleware here, usually for detech error
app.use((error, req, res, next) => {
    res.status(500).send(error)
})


app.listen(3000)