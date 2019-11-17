module.exports = {
    getPosts(req, res) {
        return res.status(200).send(req.store.posts)
    },
    addPost(req, res) {
        id = req.store.posts.length
        req.store.posts.push(req.body)
        return res.status(201).send({id}) 
    },
    getPost(req, res) {
        return res.status(200).send(req.store.posts[req.params.postId])
    },
    updatePost(req, res) {
        Object.assign(req.store.posts[req.params.postId], req.body)
        return res.status(202).send(req.store.posts[req.params.postId])
    },
    removePost(req, res) {
        req.store.posts.splice(req.params.postId, 1)
        return res.sendStatus(204)
    }
}