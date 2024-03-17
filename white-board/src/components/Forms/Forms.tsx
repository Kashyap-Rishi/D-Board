import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './forms.css';
import { Socket } from 'socket.io-client';
import CreateRoomForm from './CreateRoomForm/Createroom';
import JoinRoomForm from './JoinRoomForm/Joinroom';
import useAuth from '../../hooks/auth/useAuth';// Import the custom hook

interface Props {
  uuid: () => string;
  socket: Socket;
  setUser: (user: { name: string; userId: string; roomId: string; host: boolean; presenter: boolean }) => void;
}

const Forms: React.FC<Props> = ({ uuid, socket, setUser }) => {
  const isLoggedIn = useAuth(); // Use the custom hook to check authentication
  const navigate = useNavigate(); // Hook for navigation
  const handleLogout = () => {
    console.log('Logout button clicked'); // Debugging
    try {
      localStorage.removeItem('token'); // Remove JWT token from localStorage
      console.log('JWT token removed from localStorage'); // Debugging
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };
  
  // Debugging
  console.log('isLoggedIn:', isLoggedIn);
  if (!isLoggedIn) {
    // If not logged in, redirect to the login page
    navigate('/login');
    return null; // To prevent rendering the component
  }

  // Fetch user details from wherever it's stored after authentication
  const userDetails = {
    name: 'User ', // Replace with actual user's name
  };

  return (
    <div className="main-cont">
      <div className="user-info">
        <h2>Welcome, {userDetails.name}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="sub-cont">
        <h1>Create Room</h1>
        <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} />
      </div>
      <div className="sub-cont">
        <h1>Join Room</h1>
        <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser} />
      </div>
    </div>
  );
};

export default Forms;
