const { DB } = require('../config/db')

const agregarPost = async (titulo, url, descripcion) => {
    try {
        const SQLQuery = "INSERT INTO posts VALUES(DEFAULT, $1, $2, $3) RETURNING *"
        const SQLValues = [titulo, url, descripcion]

        const { rows } = await DB.query(SQLQuery, SQLValues)

        return rows
    } catch (error) {
        throw error
    }
}

const obtenerPosts = async () => {
    try {
        const SQLQuery = "SELECT * FROM posts"
        const { rows } = await DB.query(SQLQuery)

        return rows
    } catch (error) {
        throw error
    }
}


module.exports = {
    agregarPost,
    obtenerPosts
}