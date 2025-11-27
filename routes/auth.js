// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// ~/auth/login エンドポイントを定義 postメソッド
router.post("/login", authController.login);    // ログインエンドポイント

// ~/auth/register エンドポイントを定義 postメソッド
router.post("/register", authController.register); // ユーザー登録エンドポイント

module.exports = router;                        // ルーターをエクスポート   