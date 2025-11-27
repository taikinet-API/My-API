// routes/messages.js
const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/:roomId", messageController.getMessagesByRoom);
router.post("/", messageController.sendMessage);

module.exports = router;
