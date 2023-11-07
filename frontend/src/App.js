import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/register"
        element={<RegisterForm setLoggedIn={setLoggedIn} />}
      />
      <Route
        path="/login"
        element={<LoginForm setLoggedIn={setLoggedIn} />}
      />
      <Route
        path="/todolist"
        element={<TodoList loggedIn={loggedIn} />}
      />
    </Routes>
  );
}

export default App;
