// Createroom.tsx
import { useState } from "react";
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import './createroom.css'; // Import modular CSS

interface Props {
  uuid: () => string;
  socket: Socket;
  setUser: (user: { name: string; roomId: string; userId: string; host: boolean; presenter: boolean }) => void;
}

const Createroom: React.FC<Props> = ({ uuid, socket, setUser }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const roomData = {
      name,
      userId: uuid(),
      roomId,
      host: true,
      presenter: true
    };
    setUser(roomData);
    navigate(`/${roomId}`);
    socket.emit("userJoined", roomData);
  };

  return (
    <form className="createroom-form">
      <div className="input-group">
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          value={roomId}
          type="text"
          placeholder="Generate room code"
          readOnly // Make the input read-only
        />
        <div className="button-group">
          <button type="button" onClick={() => setRoomId(uuid())}>Generate</button>
          <button type="button">Copy</button>
        </div>
      </div>
      <button className="solo-button" type="submit" onClick={handleCreateRoom}>Generate Room</button>
    </form>
  );
}

export default Createroom;
