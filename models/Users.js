// models/User.js
// modelsではDB操作を行う

const pool = require("../db/pool");

module.exports = {
  async findByCredentials(username, password) {
    // ユーザー名とパスワードでユーザーを検索する
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    return rows[0] || null;
  },

  async createUser(username, password) {
    // 新しいユーザーを作成する
    const [result] = await pool.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password]
    );
    return { id: result.insertId, username };
  }
};