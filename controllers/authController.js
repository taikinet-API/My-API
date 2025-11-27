// controllers/authController.js
const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findByCredentials(username, password);

    if (!user) {
      return res.status(401).json({ error: "ログイン失敗" });
    }

    res.json({ message: "ok", userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
};