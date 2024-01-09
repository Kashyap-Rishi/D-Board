
import { useEffect,useState } from 'react';
import io from 'socket.io-client'

const socket=io('http://localhost:8000');

const WhiteBoard = () => {

    const[room,setRoom]=useState("");

    const [message,setMessage]=useState("");
    const [messageReceived,setMessageReceived]=useState("");


    const joinRoom=()=>{
        if(room!=""){
            socket.emit("join_room", room);
        }
    }

    const sendMessage=()=>{
     socket.emit("send_message",{message,room})
    }

    useEffect(()=>{
      socket.on("receive_message",(data)=>{
        setMessageReceived(data.message);
      })
    },[socket])

return(
    <div className="main-c">
        <input placeholder="Room number..." onChange={(event)=>{setRoom(event.target.value)}}/>
        <button onClick={joinRoom}>Join Room</button>
<input placeholder="Message.." onChange={(event)=>{
    setMessage(event?.target.value)
}}/>
<button onClick={sendMessage}>Send message</button>
<h1>My message : {messageReceived}</h1>
    </div>
)
  
}

export default WhiteBoard