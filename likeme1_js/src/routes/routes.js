const { Router } = require('express')
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/postsControllers')


const router = Router()

router.get('/posts', getPosts)
router.post('/posts', createPost)
router.put('/posts/like/:id', updatePost)
router.delete('/posts/:id', deletePost)

module.exports = router