/* 
    * Please check out the other directories before playing around with this folder

    * The order suggestion:
        * 1. hello-world
        * 2. middleware
        * 3. rest-api
        * 4. rest-api-store
        * 5. rest-api-blog
*/

/* importing modules */
const express = require('express')
const app = express();

/*  middleware  */
app.use((req, res, next) => {
    res.setHeader('x-server-date', new Date());
    return next();
})

/* Handling errors in Express 
   * This way will return a gracefull HTTP error 500
   * To be on the safe side, always use next for errors in routes
   * Put the return -> no other code is executed afterwards
*/
app.get('/next', (req, res, next) => {
    setTimeout(() => {
        return next(new Error('Something is wrong'));
    }, 1000);
})

/* routes */
app.get('/', (req, res, next) => {
    return res.send('Hello from Express');
});

app.get('/time', (req, res, next) => {
    return res.send(new Date().toDateString());
});

// req.query is getting query from url
app.get('/hello', (req, res, next) => {
    if (!req.query.name) {
        return res.status(400).end("Bad request");
    }
    return res.send(`Hello ${req.query.name}`);
});

app.get('/user/:name', (req, res, next) => {
    return res.send(`User profile of ${req.params.name}`);
});

app.listen(3000);
