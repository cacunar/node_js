const { Router } = require('express')
const { getPosts, createPost } = require('../controllers/postsControllers')


const router = Router()

router.get('/posts', getPosts)
router.post('/posts', createPost)

module.exports = router