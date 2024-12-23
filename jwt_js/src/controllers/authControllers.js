const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { obtenerUsuarios } = require('../models/usuarios');
require('dotenv').config();

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = (await obtenerUsuarios(email))[0];
    if (!user) {
      return res.status(401).send('Usuario no encontrado');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).send('Credenciales inválidas');
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).send('Error en el servidor');
  }
};

module.exports = { login };