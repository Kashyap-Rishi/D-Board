// Forms.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import CreateRoomForm from './CreateRoomForm/Createroom';
import JoinRoomForm from './JoinRoomForm/Joinroom';
import useAuth from '../../hooks/auth/useAuth';
import Navbar from '../Navbar/Navbar';
import './forms.css';

interface Props {
  uuid: () => string;
  socket: Socket;
  setUser: (user: { name: string; userId: string; roomId: string; host: boolean; presenter: boolean }) => void;
}

const Forms: React.FC<Props> = ({ uuid, socket, setUser }) => {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate('/login');
    return null; 
  }

  return (
    <>
      <Navbar />
      <div className="forms-container">
        <div className="user-info">
          {/* Add user info content here if needed */}
        </div>
        <div className="form-section">
          <h1>Create Room</h1>
          <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} />
        </div>
        <div className="form-section">
          <h1>Join Room</h1>
          <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser} />
        </div>
      </div>
    </>
  );
};

export default Forms;

