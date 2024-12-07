const Posts = '../models/posts'

const getPosts = async (req, res) => {
    try {
        const r = await Posts.obtenerPosts()
        res.status(200).json(r)
    } catch (error) {
        res.status(500).json({
            msg: 'Server error',
            error: error.message
        })
    }
}

const createPost = async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body 
        const r = await Posts.agregarPost(titulo, url, descripcion)
        res.status(200).json(r)
    } catch (error) {
        res.status(500).json({
            msg: 'Server error',
            error: error.message
        })
    }
}

module.exports = {
    getPosts,
    createPost
}