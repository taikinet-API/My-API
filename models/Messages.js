// models/Message.js
const pool = require("../db/pool");

module.exports = {
  async findByRoomId(roomId) {
    const [rows] = await pool.query(
      "SELECT * FROM messages WHERE room_id = ? ORDER BY created_at ASC",
      [roomId]
    );
    return rows;
  },

  async insert(roomId, userId, text) {
    await pool.query(
      "INSERT INTO messages (room_id, user_id, text) VALUES (?, ?, ?)",
      [roomId, userId, text]
    );
  }
};