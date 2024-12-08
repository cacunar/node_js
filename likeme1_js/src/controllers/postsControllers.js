const Posts = require("../models/posts")

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

/* --PARTE 2 DESAFIO --- */

const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const r = await Posts.actualizarPost(id);
        res.status(200).json(r)
    } catch (error) {
        res.status(500).json({
            msg: 'Server error',
            error: error.message
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const r = await Posts.eliminarPost(id)
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
    createPost,
    updatePost,
    deletePost
}