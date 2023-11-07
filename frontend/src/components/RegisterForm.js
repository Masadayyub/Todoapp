import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await authAPI.register({ username, password });
      setRegistered(true);
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error(error);
    }
  };

  useEffect(() => {
    if (registered) {
      navigate('/login'); 
    }
  }, [registered, navigate]);

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {registered ? (
        <p>Registration successful! Redirecting to login...</p>
      ) : (
        <form onSubmit={handleRegister}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Input a unique username"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Use a password"
            />
          </div>
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
