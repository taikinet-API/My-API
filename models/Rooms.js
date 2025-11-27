const pool = require("../db/pool");

module.exports = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM chat_rooms");
    return rows;
  }
};