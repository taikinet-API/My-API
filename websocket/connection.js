// websocket/connection.js
const WebSocket = require("ws");

// 全クライアント一覧
let clients = [];

function initWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);

    ws.on("close", () => {
      clients = clients.filter(c => c !== ws);
    });
  });
}

function broadcastMessageUpdate(roomId) {
  const payload = JSON.stringify({
    type: "message_update",
    roomId,
  });

  clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(payload);
    }
  });
}

module.exports = {
  initWebSocket,
  broadcastMessageUpdate
};