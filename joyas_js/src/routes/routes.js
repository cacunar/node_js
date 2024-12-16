const { Router } = require('express')
const { getJoyas, getJoyasFiltros } = require('../controllers/joyasControllers');

const router = Router()

router.get('/joyas', getJoyas);
router.get('/joyas/filtros', getJoyasFiltros);


module.exports = router



