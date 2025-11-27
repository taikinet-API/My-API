const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

// ~/rooms/ でチャットルーム一覧を取得するエンドポイントを定義
router.get("/", roomController.getAllRooms);

module.exports = router;