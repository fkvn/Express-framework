const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const errorHandler = require('errorhandler')
const routes = require('./routes')



// in-memory model
let store = {
    posts: [
        {
            name: 'Top 10 ES6 features',
            url: 'https://webapplog.com/es6',
            text: 'This essay will give you a quick instroduction to ES6',
            comments: [
                {text: 'Cruel...var {house, mouse} = No type optimization at all'},
                {text: 'I think you\'re undervaluing the benefit of \'let\' and \'const\' '},
                {text: '(p1, p2) => { ... }, I understand this, thank you!'}

            ]
        }
    ]
}

// initilization
let app = express()

// middleware
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorHandler())
app.use((req, res, next) => {
    req.store = store
    next()
})

// routes

app.get('/posts', routes.posts.getPosts)
app.post('/posts', routes.posts.addPost)
app.get('/posts/:postId', routes.posts.getPost)
app.put('/posts/:postId', routes.posts.updatePost)
app.delete('/posts/:postId', routes.posts.removePost)

app.get('/posts/:postId/comments', routes.comments.getComments)
app.post('/posts/:postId/comments', routes.comments.addComment)
app.get('/posts/:postId/comments/:commentId', routes.comments.getComment)
app.put('/posts/:postId/comments/:commentId', routes.comments.updateComment)
app.delete('/posts/:postId/comments/:commentId', routes.comments.removeComment)

app.listen(3000)