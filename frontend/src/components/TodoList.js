import React, { useEffect, useState } from 'react';
import { todoAPI, authAPI } from '../services/api';
import './TodoList.css'; 

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [updateTodoId, setUpdateTodoId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const loggedIn = authAPI.isAuthenticated();

  useEffect(() => {
    const fetchTodos = async () => {
      if (loggedIn) {
        try {
          const userTodos = await todoAPI.getUserTodos();
          setTodos(userTodos);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchTodos();
  }, [loggedIn]);

  const handleCreateTodo = async () => {
    if (loggedIn) {
      if (!newTodo.title || !newTodo.description) {
        setErrorMessage('Please fill all fields.');
        return;
      }

      try {
        await todoAPI.createTodo(newTodo);
        setNewTodo({ title: '', description: '' });
        setShowAddForm(false);
        setErrorMessage('');
        const updatedTodos = await todoAPI.getUserTodos();
        setTodos(updatedTodos);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdate = async (id) => {
    if (loggedIn) {
      if (!updatedTitle || !updatedDescription) {
        setErrorMessage('Please fill all fields.');
        return;
      }

      try {
        await todoAPI.updateTodo(id, {
          title: updatedTitle,
          description: updatedDescription,
        });
        const updatedTodos = await todoAPI.getUserTodos();
        setTodos(updatedTodos);
        setUpdateTodoId(null);
        setUpdatedTitle('');
        setUpdatedDescription('');
        setErrorMessage('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    if (loggedIn) {
      try {
        await todoAPI.deleteTodo(id);
        const filteredTodos = todos.filter((todo) => todo._id !== id);
        setTodos(filteredTodos);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const showUpdateForm = (id) => {
    setUpdateTodoId(id);
    const selectedTodo = todos.find((todo) => todo._id === id);
    setUpdatedTitle(selectedTodo.title);
    setUpdatedDescription(selectedTodo.description);
  };

  return (
    <div>
      <h2>User's Todos</h2>
      {loggedIn && (
        <div>
          {showAddForm ? (
            <div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <input
                type="text"
                placeholder="Title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Description"
                value={newTodo.description}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, description: e.target.value })
                }
              />
              <button onClick={handleCreateTodo}>Submit</button>
              <button onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setShowAddForm(true)}>Add Todo</button>
          )}
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>
                {loggedIn && (
                  <div className="actions">
                    {updateTodoId === todo._id ? (
                      <>
                        <input
                          type="text"
                          placeholder="New Title"
                          value={updatedTitle}
                          onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="New Description"
                          value={updatedDescription}
                          onChange={(e) => setUpdatedDescription(e.target.value)}
                        />
                        <button onClick={() => handleUpdate(todo._id)}>
                          Confirm
                        </button>
                        <button onClick={() => setUpdateTodoId(null)}>Cancel</button>
                      </>
                    ) : (
                      <button onClick={() => showUpdateForm(todo._id)}>
                        Update
                      </button>
                    )}
                    <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
