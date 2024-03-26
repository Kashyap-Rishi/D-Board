// Joinroom.tsx
import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import './joinroom.css';

interface Props {
  socket: Socket;
  uuid: () => string;
  setUser: (user: { name: string; roomId: string; userId: string; host: boolean; presenter: boolean }) => void;
}

const Joinroom: React.FC<Props> = ({ socket, setUser, uuid }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRoomJoin = (e: React.FormEvent) => {
    e.preventDefault();

    const roomData = {
      name,
      userId: uuid(),
      roomId,
      host: true,
      presenter: false
    };
    setUser(roomData);
    navigate(`/${roomId}`);
    socket.emit("userJoined", roomData);
  };

  return (
    <form className="joinroom-form">
      <div className="joinroom-input-group">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="joinroom-input"
        />
      </div>
      <div className="joinroom-input-group">
        <input
          type="text"
          placeholder="Enter room code"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="joinroom-input"
        />
      </div>
      <button type="submit" onClick={handleRoomJoin} className="joinroom-button">Join Room</button>
    </form>
  );
};

export default Joinroom;
