const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/jwtMiddleware'); // Import the JWT middleware
const { register, login } = require('../controllers/userController');

// Register
router.post('/register', register);

// Login
router.post('/login', login);
module.exports = router;
