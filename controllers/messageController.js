// controllers/messageController.js
// messages/
const Message = require("../models/Messages");
const { broadcastMessageUpdate } = require("../websocket/connection");

exports.getMessagesByRoom = async (req, res) => { 
  try {
    const roomId = req.params.roomId;
    const rows = await Message.findByRoomId(roomId);
    // Swift 用に整形
    const formatted = rows.map(r => ({
      id: r.id,
      user: r.user_id,       // ← 本当は JOIN で username を返すべき
      text: r.text,
      created_at: r.created_at
    }));
    
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const { userId, text } = req.body;
    await Message.insert(roomId, userId, text);

    // WebSocket に通知（同じ部屋のユーザーへ）
    broadcastMessageUpdate(roomId);

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};