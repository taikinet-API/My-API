// models/User.js
const pool = require("../db/pool");

module.exports = {
  async findByCredentials(username, password) {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    return rows[0] || null;
  }
};