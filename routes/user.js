const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/validate-token');

const usersController = require('../controllers/users');

router.get('/', usersController.getUsers);

router.get('/:id', verifyToken, usersController.getUserById);

router.post('/', usersController.createUser);

router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

router.post('/login', usersController.loginUser);

module.exports = router;