const express = require("express");
const app = express();
const cors = require("cors");

const server = require("http").createServer(app);
const {Server} = require("socket.io");
const { addUser, getUser, removeUser } = require("./utils/users");

const io =new Server(server);

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("server");
});

let roomIdGlobal, imgURLGlobal

io.on('connection',(socket)=>{
  socket.on("userJoined", (data) => {
    const { name, userId, roomId, host, presenter } = data;
    roomIdGlobal = roomId;
    socket.join(roomId);
    const users = addUser({ name, userId, roomId, host, presenter,socketId:socket.id });
    socket.emit("userIsJoined", { success: true, users });
    socket.broadcast.to(roomId).emit("userJoinedMessageBroadCasted", name);
    socket.broadcast.to(roomId).emit("allUsers", users);
    socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
      imgURL: imgURLGlobal,
    });
  });

  socket.on("whiteboardData",(data)=>{
     imgURLGlobal = data;
     socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse",{
      imgURL:data,
   })
  }); 

  socket.on("message",(data)=>{
    const {message}=data;
    const user=getUser(socket.id)
   
    if(user){ 
      removeUser(socket.id);
      socket.broadcast;
    
    socket.broadcast.to(roomIdGlobal).emit("messageResponse",{message,name:user.name})
    }
  })

  socket.on("disconnect",()=>{
    const user=getUser(socket.id)
    if(user){
    removeUser(socket.id)
   
    
    socket.broadcast.to(roomIdGlobal).emit("userLeftMessageBroadCasted", user.name)
    }
  })
})


// serve on port
const PORT = process.env.PORT || 8000;

server.listen(PORT, () =>
  console.log(`server is listening on port:${PORT}`)
);





