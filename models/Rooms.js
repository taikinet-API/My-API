// models/Rooms.js
// modelsではDB操作を行う

const pool = require("../db/pool");

module.exports = {
    // すべてのチャットルームを取得する
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM chat_rooms");
    return rows;
  }
};