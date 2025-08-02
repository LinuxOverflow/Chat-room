const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const usersFilePath = "./users.json";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const loadUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("register", async (data) => {
    const { username, password } = data;
    const users = loadUsers();

    if (users[username]) {
      socket.emit("register-fail", { message: "Username already exists." });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      users[username] = hashedPassword;
      saveUsers(users);
      socket.emit("register-success", { message: "Registration successful!" });
    }
  });

  socket.on("login", async (data) => {
    const { username, password } = data;
    const users = loadUsers();

    if (users[username]) {
      const match = await bcrypt.compare(password, users[username]);
      if (match) {
        socket.username = username;
        socket.emit("login-success", { message: "Login successful!" });
      } else {
        socket.emit("login-fail", { message: "Invalid username or password." });
      }
    } else {
      socket.emit("login-fail", { message: "Invalid username or password." });
    }
  });

  socket.on("join-room", (room) => {
    if (socket.currentRoom) {
      socket.leave(socket.currentRoom);
    }

    socket.currentRoom = room;
    socket.join(room);

    // Notify others in the room about the new user
    socket.to(room).emit("user-joined", { username: socket.username, room });
  });

  socket.on("message", (data) => {
    const { room, message } = data;

    if (!socket.username || !room) {
      socket.emit("error", { message: "You are not authenticated or in a valid room." });
      return;
    }

    const messageData = { username: socket.username, message };
    socket.broadcast.to(room).emit("message", messageData);
    socket.emit("self-message", messageData);
  });

  socket.on("disconnect", () => {
    console.log(socket.username ? `${socket.username} disconnected.` : "An unauthenticated user disconnected.");
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
