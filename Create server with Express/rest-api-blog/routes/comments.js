module.exports = {
    getComments(req, res) {
        return res.status(200).send(req.store.posts[req.params.postId].comments)
    },
    addComment(req, res) {
        let newComment = req.body
        let comments = req.store.posts[req.params.postId].comments
        let id = comments.length
        comments.push(newComment)
        return res.status(201).send({id})
    },
    getComment(req, res) {
        return res.status(200).send(req.store.posts[req.params.postId].comments[req.params.commentId])
    },
    updateComment(req, res) {
        Object.assign(req.store.posts[req.params.postId].comments[req.params.commentId], req.body)
        return res.status(202).send(req.store.posts[req.params.postId].comments[req.params.commentId])
    },
    removeComment(req, res) {
        req.store.posts[req.params.postId].comments.splice(req.params.commentId, 1)
        return res.sendStatus(204)
    }
}