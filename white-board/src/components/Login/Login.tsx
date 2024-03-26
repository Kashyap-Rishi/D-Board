import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import useSingleUserData from '../../hooks/data/useSingleUserData'; // Import the hook

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<{ token: string }>;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Use the userData, loading, and error state from useSingleUserData hook
  const { userData, loading, error } = useSingleUserData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password)
      .then(({ token }) => {
        localStorage.setItem('token', token);
        navigate('/rooms-join');
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setErrorMessage(error.message);
      });
  };

  // After successful login, if userData is available, you can do something with it
  if (userData) {
    console.log('User data:', userData);
    // You can navigate or do something else with the userData here
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error.message}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className="signup_user">
        Don't have an account?<Link className="navigate_signup" to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;

