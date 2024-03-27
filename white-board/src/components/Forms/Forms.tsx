// Forms.tsx
import { useState, useEffect } from 'react';
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
  const [pdfData, setPdfData] = useState([]);

  // Function to fetch saved works from the server
  const fetchSavedWorks = async () => {
    try {
      const response = await fetch('https://drawingboard.onrender.com/api/files');
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data",data);
        setPdfData(data); // Set PDF data in state
      } else {
        console.error('Failed to fetch saved works:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching saved works:', error);
    }
  };

  // Fetch saved works when component mounts
  useEffect(() => {
    fetchSavedWorks();
  }, []);

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="forms-container">
      
        <div className="form-section">
          <h1>Create Room</h1>
          <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} />
        </div>
        <div className="form-section">
          <h1>Join Room</h1>
          <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser} />
        </div>
      </div>
      <div className="savedWorks">
        {pdfData.map((pdf: any) => (
          <embed key={pdf._id} src={pdf.imageData}  width="100%" height="500px" />
        ))}
      </div>
    </>
  );
};

export default Forms;
