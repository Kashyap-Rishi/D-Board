// components/Signup.tsx
import React, { useState } from 'react';

interface SignupProps {
  onSignup: (name: string, email: string, password: string) => void; // Update the type
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const [name, setName] = useState(''); // Change to name
  const [email, setEmail] = useState(''); // Add email state
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(name, email, password); // Pass name, email, and password
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Change to setName
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Add setEmail
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
