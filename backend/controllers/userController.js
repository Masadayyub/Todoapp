const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');
const Todo = require('../models/Todo');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please input all fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ username, password: hashedPassword });
    await user.save();

    return res.status(201).json({ username, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Registration failed' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const user = await User.findOne({ username });
    console.log(user, "is user")

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); 

    res.status(200).json({ token });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
};

module.exports = { register, login };
