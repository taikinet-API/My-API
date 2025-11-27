// controllers/messageController.js
// messages/
const Message = require("../models/Message");

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
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};