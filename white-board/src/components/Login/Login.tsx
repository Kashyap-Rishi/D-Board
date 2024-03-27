import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';


interface LoginProps {
  onLogin: (email: string, password: string) => Promise<{ token: string }>;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password)
      .then(({ token }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        navigate('/rooms-join');
      })
      .catch((error) => {
        console.error('Login failed:', error);
   
      });
  };



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

      <p className="signup_user">
        Don't have an account?<Link className="navigate_signup" to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;

