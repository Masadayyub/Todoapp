const Todo = require('../models/Todo');

const getUserTodos = async (req, res) => {
  const userId = req.user.id;

  try {
    const todos = await Todo.find({ userId });
    console.log("users fetched todos are ",todos, "against id . . ",userId )
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user todos' });
  }
};

const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const todo = new Todo({ title, description, userId });
    await todo.save();
    console.log(todo, "is created successfully for user against userId_ ",userId)

    res.status(201).json({ message: 'Todo created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create todo' });
  }
};

const updateTodo = async (req, res) => {
  const { title, description } = req.body;
  const todoId = req.params.id;

  try {
    await Todo.findByIdAndUpdate(todoId, { title, description });
    res.status(200).json({ message: 'Todo updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update todo' });
  }
};

const deleteTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    await Todo.findByIdAndDelete(todoId);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete todo' });
  }
};

module.exports = { getUserTodos, createTodo, updateTodo, deleteTodo };
