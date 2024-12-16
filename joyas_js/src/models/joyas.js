const { DB } = require('../config/db');

const getJoyasQuery = async (limits, page, order_by) => {
    const limit = parseInt(limits) || 10;
    const offset = ((parseInt(page) || 1) - 1) * limit;
    const orderBy = order_by || 'id_ASC';
    const [field, direction] = orderBy.split('_');

    const query = `SELECT * FROM inventario ORDER BY ${field} ${direction} LIMIT $1 OFFSET $2;`;
    const { rows } = await DB.query(query, [limit, offset]);

    return rows.map((joya) => ({
        ...joya,
        links: {
            self: `/joyas/${joya.id}`,
        },
    }));
};

const getJoyasFiltrosQuery = async (precio_min, precio_max, categoria, metal) => {
    const conditions = [];
    const values = [];

    if (precio_min) {
        conditions.push('precio >= $' + (values.length + 1));
        values.push(precio_min);
    }

    if (precio_max) {
        conditions.push('precio <= $' + (values.length + 1));
        values.push(precio_max);
    }

    if (categoria) {
        conditions.push('categoria = $' + (values.length + 1));
        values.push(categoria);
    }

    if (metal) {
        conditions.push('metal = $' + (values.length + 1));
        values.push(metal);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const query = `SELECT * FROM inventario ${whereClause};`;

    const { rows } = await DB.query(query, values);
    return rows;
};

module.exports = { getJoyasQuery, getJoyasFiltrosQuery };