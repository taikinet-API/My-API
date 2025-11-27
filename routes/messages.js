// routes/messages.js
const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// ~/messages/:roomId でメッセージ取得・送信を行うエンドポイントを定義
router.get("/:roomId", messageController.getMessagesByRoom);    // 特定のチャットルームのメッセージ取得
// ~/messages/ でメッセージ送信を行うエンドポイントを定義
router.post("/", messageController.sendMessage);                // メッセージ送信

module.exports = router;                                        // `module.exports` を追加してルーターをエクスポート
