const express = require('express');
const todoController = require('../controllers/ToDoController');
const authenticateToken = require('../middleware/jwtMiddleware'); // Import the JWT middleware

const router = express.Router();

router.get('/', authenticateToken, todoController.getUserTodos);
router.post('/', authenticateToken, todoController.createTodo);
router.put('/:id', authenticateToken, todoController.updateTodo);
router.delete('/:id', authenticateToken, todoController.deleteTodo);

module.exports = router;
