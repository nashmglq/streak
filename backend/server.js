require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 50001;
const cors = require("cors");
const path = require("path");
const route = require("./routes/route");
const passport = require("./config/passport");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { initNotifyController } = require("./contollers/streak");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(passport.initialize());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", route);

const authenticatedSockets = new Set();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  },
});

io.on("connection", (socket) => {
  const token = socket.handshake.auth?.token?.split(" ")[1];

  if (!token) {
    console.log("❌ No token provided");
    socket.disconnect();
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    authenticatedSockets.add(socket);
    console.log(`✅ User ${decoded.id} connected`);

    socket.on("disconnect", () => {
      authenticatedSockets.delete(socket);
      console.log(`❌ User ${decoded.id} disconnected`);
    });
  } catch (err) {
    console.log("❌ Invalid token");
    socket.disconnect();
  }
});

initNotifyController(io);

server.listen(port, () => console.log(`Server running on port ${port}`));
