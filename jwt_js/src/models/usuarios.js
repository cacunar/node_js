const { DB } = require('../config/db')

const obtenerUsuarios = async (email) => {
    try {
        const SQLQuery = "SELECT * FROM usuarios WHERE email = $1"
        const SQLValues = [email]

        const { rows } = await DB.query(SQLQuery, SQLValues)

        return rows
    } catch (error) {
        throw error
    }
}

const crearUsuarios = async (email, password, rol, lenguage) => {
    try {
        const SQLQuery = "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *";
        const SQLValues = [email, password, rol, lenguage];

        const { rows } = await DB.query(SQLQuery, SQLValues);

        return rows[0]; 
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
};


module.exports = {
    obtenerUsuarios,
    crearUsuarios
}