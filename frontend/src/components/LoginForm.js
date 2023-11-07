import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './LoginForm.css';

const LoginForm = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await authAPI.login({ username, password });

      if (response) {
        localStorage.setItem('token', response);
        console.log("the token recieved after login is  ",response)
        setLoggedIn(true);
        navigate('/todolist');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('Invalid username or password. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      {error && <p className="login-error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
