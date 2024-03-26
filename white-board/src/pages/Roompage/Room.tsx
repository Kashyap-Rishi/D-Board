import { useEffect, useRef, useState } from "react"
import WhiteBoard from "../../components/Whiteboard/WhiteBoard";
import ChatRoom from "../../components/ChatRoom/ChatRoom";

import './room.css'



import { Socket } from 'socket.io-client';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../homeComponents/footer/Footer";


interface JoinedUsers {
  name: string;
  userId: string;
  roomId: string;
  host: boolean;
  presenter: boolean;
}

interface Props {
  user: {
    name: string;
    userId: string;
    roomId: string;
    host: boolean;
    presenter: boolean;
  };
  socket: Socket;
  users: JoinedUsers[];
  setUsers: React.Dispatch<React.SetStateAction<JoinedUsers[]>>;
}

interface Element {
  type: string;
  offsetX: number;
  height: number;
  width: number;
  offsetY: number;
  path: number[][];
  stroke: string;
}

const Room = ({ user, socket, users, setUsers }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [elements, setElements] = useState<Element[]>([]);
  const [history, setHistory] = useState<Element[][]>([]);
  const [openedUserTab, setOpenedUserTab] = useState(false);
  const [openedChatTab, setOpenedChatTab] = useState(false);

  useEffect(() => {
    
      socket.emit("leaveRoom", user);
      const updatedUsers = users.filter((u) => u.userId !== user.userId);
      setUsers(updatedUsers);
    
  }, []);
  useEffect(() => {
    socket.on("allUsers", (updatedUsers) => {
      setUsers(updatedUsers);
    });
  
    return () => {
      socket.off("allUsers");
    };
  }, [socket, setUsers]);
  

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setElements([]);
  };

  const undoOperation = () => {
    setHistory((prevHistory) => {
      const updatedHistory: Element[][] = [...prevHistory, elements];
      return updatedHistory;
    });

    setElements((prevElements) => prevElements.slice(0, prevElements.length - 1));
  };

  const redoOperation = () => {
    setElements((prevElements) => [
      ...prevElements,
      ...history[history.length - 1],
    ]);

    setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
  };

  const leaveRoom = async  () => {
    localStorage.removeItem('chatMessages');
    await socket.emit("leaveRoom", { userId: user.userId, roomId: user.roomId }); 
    window.history.back(); 
  };

// const handleDownload = () => {
//   const whiteboardContainer = document.querySelector('.canvas-box');

//   if (whiteboardContainer) {
//     html2pdf(whiteboardContainer, {
//       margin: 0,
//       filename: 'whiteboard.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
//     });
//   }
// };


  return (
    <div>
       <Navbar/>
<div className="heading-room">
<div className="leave-room-button">
        <button className="leave-room-button" onClick={leaveRoom}>Leave Room</button>
      </div>
      <div className="user-chat-room">
      <button type="button"
      onClick={()=>setOpenedUserTab(true)}>
        Users
      </button>
 
      {
       openedUserTab && (
        
          <div
          className="side-box1"
          style={{width:"250px", left: "0%"}}>
            <button type="button" onClick={()=>setOpenedUserTab(false)}>
              Close
            </button>
       
            <div className="user-display1">
            {users.map((usr, index) => (
  <p key={index} className="side-box-users1">
    {usr.name}
    { user.userId === usr.userId && " (You)"}
   </p>
))}

            </div>
          </div>
        )
      }
      
          <button type="button" onClick={()=>setOpenedChatTab(true)}>
              Chat
            </button>
          {
       openedChatTab && (
<ChatRoom setOpenedChatTab={setOpenedChatTab} socket={socket} userName={user.name}/>
        )

        
      }
      </div>
      <div className="main-head-room">
         <h1>Imagine, Sketch, Create
          <span>[Users online : {users.length}]</span>
         </h1>
         </div>
         </div>



         
         {user?.presenter && (
  <div className="board-elements">
    <div className="tool-options">
      <div className="tool-option">
        <input
          type="radio"
          id="pencil"
          name="tool"
          value="pencil"
          checked={tool === "pencil"}
          onChange={(e) => setTool(e.target.value)}
        />
        <label htmlFor="pencil" className="tool-label">Pencil</label>
      </div>
      <div className="tool-option">
        <input
          type="radio"
          id="line"
          name="tool"
          value="line"
          checked={tool === "line"}
          onChange={(e) => setTool(e.target.value)}
        />
        <label htmlFor="line" className="tool-label">Line</label>
      </div>
      <div className="tool-option">
        <input
          type="radio"
          id="rect"
          name="tool"
          value="rect"
          checked={tool === "rect"}
          onChange={(e) => setTool(e.target.value)}
        />
        <label htmlFor="rect" className="tool-label">Rect</label>
      </div>
      <div className="tool-option">
        <input
          type="radio"
          id="ellipse"
          name="tool"
          value="ellipse"
          checked={tool === "ellipse"}
          onChange={(e) => setTool(e.target.value)}
        />
        <label htmlFor="ellipse" className="tool-label">Ellipse</label>
      </div>
    </div>
    <div className="color-picker">
      <label htmlFor="color" className="color-label">Select Color : </label>
      <input
        type="color"
        id="color"
        className="color-input"
        onChange={(e) => setColor(e.target.value)}
      />
    </div>

    <div className="operation-buttons">
      <button
        className="undo-button"
        disabled={elements.length === 0}
        onClick={undoOperation}
      >
        Undo
      </button>
      <button
        className="redo-button"
        disabled={history.length < 1}
        onClick={redoOperation}
      >
        Redo
      </button>
    </div>
    <div className="clear-button">
      <button className="clear-canvas-button" onClick={handleClearCanvas}>Clear Canvas</button>
    </div>
  </div>           
)}

        

          <div className="canvas-box1">

            <WhiteBoard canvasRef={canvasRef} ctxRef={ctxRef}
            elements={elements}
            setElements={setElements}
            color={color}
          tool={tool}
          user={user}
          socket={socket}
            />
          </div>

          {/* <div className="dnld-btn">
            <button onClick={handleDownload}>Download</button>
          </div> */}
<Footer/>
    </div>
  )
}

export default Room