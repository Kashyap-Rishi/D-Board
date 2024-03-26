const express = require("express");
const cors = require("cors");
const http = require("http");
const userDataRoutes = require("./routes/data/userData");
const { Server } = require("socket.io");
const connectToDatabase = require("./db/db");
const authRoutes = require("./routes/auth/auth");
const verifyToken = require("./routes/middlewares/tokenVerification");
const socketLogic = require("./sockets/socketServer");

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

connectToDatabase(process.env.MONGO_USERNAME, process.env.MONGO_PASSWORD);

const server = http.createServer(app);
const io = new Server(server);

app.use("/auth", authRoutes);
app.use("/users", userDataRoutes);

app.post("/verifyToken", verifyToken, (req, res) => {
    res.status(200).json({ message: "Token is valid" });
});

socketLogic(io);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () =>
    console.log(`Server is listening on port: ${PORT}`)
);






