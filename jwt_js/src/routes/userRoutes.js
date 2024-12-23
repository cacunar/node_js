const { Router } = require('express')
const { getUserProfile , registerUser } = require('../controllers/userControllers')
const verifyToken = require('../middlewares/authMiddleware');

const router = Router()

router.post('/usuarios', registerUser)
router.get('/usuarios', verifyToken, getUserProfile )

module.exports = router