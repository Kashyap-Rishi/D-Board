const express=require('express');
const app=express();
const httpServer=require('http').createServer(app);
const {Server}=require('socket.io');
const cors=require("cors");

app.use(cors());


const io= new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
    },
})

let connections=[];

io.on('connection',(socket)=>{
    connections.push(socket);
  
      console.log(`${socket.id} is connected`);

      socket.on("join_room", (data)=>{
        socket.join(data);
      })

      socket.on("send_message" , (data)=>{
        socket.to(data.room).emit("receive_message", data)
      })

      socket.on('draw',(data)=>{
        connections.forEach(con =>{
            if(con.id!=socket.id){
                con.emit('ondraw',{x:data.x,y:data.y});
            }
        })
    })
    socket.on('down',(data)=>{
        connections.forEach(con =>{
            if(con.id!=socket.id){
                con.emit('ondown',{x:data.x,y:data.y});
            }
        })
    })

      socket.on('disconnect', ()=>{
        console.log(`${socket.id} disconnected`);
        connections=connections.filter((con)=>{con.id!==socket.id})
        
      })
     
})



httpServer.listen(8000,()=>{
    console.log("server listening on port 8000");
  
})





