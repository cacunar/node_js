const { getJoyasQuery, getJoyasFiltrosQuery } = require('../models/joyas');
const { handleError } = require('../helpers/errorHandler');

const getJoyas = async (req, res) => {
    try {
        const { limits, page, order_by } = req.query;
        const joyas = await getJoyasQuery(limits, page, order_by);
        res.json(joyas);
    } catch (error) {
        handleError(res, error, 'Error al obtener las joyas');
    }
};

const getJoyasFiltros = async (req, res) => {
    try {
        const { precio_min, precio_max, categoria, metal } = req.query;
        const joyas = await getJoyasFiltrosQuery(precio_min, precio_max, categoria, metal);
        res.json(joyas);
    } catch (error) {
        handleError(res, error, 'Error al filtrar las joyas');
    }
};

module.exports = { getJoyas, getJoyasFiltros };