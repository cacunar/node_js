const bcrypt = require('bcrypt');
const { crearUsuarios, obtenerUsuarios } = require('../models/usuarios');

const registerUser = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await crearUsuarios(email, hashedPassword, rol, lenguage);
    res.status(201).send('Usuario registrado exitosamente');
  } catch (error) {
    res.status(500).send('Error al registrar usuario');
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await obtenerUsuarios(req.user.email);
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Error al obtener usuario');
  }
};

module.exports = { registerUser, getUserProfile };
