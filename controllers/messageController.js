// controllers/messageController.js
// messages/
const Message = require("../models/Message");
const { broadcastMessageUpdate } = require("../app");   // ← 追加

exports.getMessagesByRoom = async (req, res) => { 
  try {
    const roomId = req.params.roomId;
    const rows = await Message.findByRoomId(roomId);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { roomId, userId, text } = req.body;
    await Message.insert(roomId, userId, text);

    // WebSocket に通知（同じ部屋のユーザーへ）
    broadcastMessageUpdate(roomId);
    
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};