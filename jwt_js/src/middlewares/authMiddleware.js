const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).send('Token requerido');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).send('Formato de token inválido');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Error al verificar token:', err.message);
      return res.status(401).send('Token inválido');
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
