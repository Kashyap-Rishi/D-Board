const express=require('express');
const app=express();
const httpServer=require('http').createServer(app);
const io=require('socket.io')(httpServer);

let connections=[];

io.on('connect',(socket)=>{
    connections.push(socket);
      console.log(`${socket.id} is connected`);

      socket.on('disconnect',(socket)=>{
        console.log(`${socket.id} disconnected`);
      })
})

httpServer.listen(8000,()=>{
    console.log("server listening on port 8000");
})





