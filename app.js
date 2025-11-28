// ------------------------------------------------------------
// app.js（アプリのエントリーポイント）
// ------------------------------------------------------------

const express = require("express");
const cors = require("cors");
const http = require("http");             
const { initWebSocket } = require("./websocket/connection");

// ルート
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const roomRoutes = require("./routes/rooms");

const app = express();

// ミドルウェア
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/rooms", roomRoutes);

// HTTPサーバーを作成し、Express を載せる
const server = http.createServer(app);

// WebSocket サーバーを初期化
initWebSocket(server);

const PORT = 3000;

// ❗ ここが重要：server.listen を使う
server.listen(PORT, () => {
  console.log(`API + WebSocket running on port ${PORT}`);
});