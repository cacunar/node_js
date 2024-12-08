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

const actualizarPost = async (id) => {
    try {
        const SQLQuery = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
        const SQLValues = [id];
        const { rows } = await DB.query(SQLQuery, SQLValues);
    
        return rows[0]
      } catch (error) {
        throw error;
      }
}

const eliminarPost = async (id) => {
    try {
        const SQLQuery = "DELETE FROM posts WHERE id = $1"
        const SQLValues = [ id ]
        const { rows } = await DB.query(SQLQuery, SQLValues)

        return rows
    } catch (error) {
        throw error
    }
}



module.exports = {
    agregarPost,
    obtenerPosts,
    actualizarPost,
    eliminarPost
}