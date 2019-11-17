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