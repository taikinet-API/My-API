// models/Message.js
// modelsではDB操作を行う
const pool = require("../db/pool");

module.exports = {
    // 指定されたチャットルームIDのメッセージを取得する
  async findByRoomId(roomId) {
    const [rows] = await pool.query(
      `SELECT 
        m.id,
        u.username AS user,
        m.text,
        m.created_at
        FROM messages m
        JOIN users u ON m.user_id = u.id
        WHERE m.room_id = ?
        ORDER BY m.created_at ASC`,
      [roomId]
    );
    return rows;
  },
    // 新しいメッセージを挿入する
  async insert(roomId, userId, text) {
    await pool.query(
      "INSERT INTO messages (room_id, user_id, text) VALUES (?, ?, ?)",
      [roomId, userId, text]
    );
  }
};