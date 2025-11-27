// controllers/authController.js
const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;        // リクエストボディからユーザー名とパスワードを取得

    const user = await User.findByCredentials(username, password);  // ユーザーを検索

    if (!user) {                                    // ユーザーが見つからなければ401エラーを返す
      return res.status(401).json({ error: "ログイン失敗" });
    }                                       
    res.json({ message: "ok", userId: user.id });   // 認証成功時にユーザーIDを返す
  } catch (err) {                                   // err にエラーオブジェクトが入る → これがnullでなければcatch節が実行される
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;        // リクエストボディからユーザー名とパスワードを取得

    // ここでユーザー登録のロジックを実装する（例: DBに新しいユーザーを挿入）
    const user = await User.createUser(username, password);      // ユーザー作成メソッドを呼び出す

    res.json({ message: "ユーザー登録成功" , userId: user.id, username: user.username});    // 登録成功時のレスポンス
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
};