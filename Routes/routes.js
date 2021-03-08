const express = require('express')
const messageController = require('../Controllers/MessageController')
const router = express.Router();

router.post('/save-note', messageController.saveNote);
router.post('/get-note/:messageId', messageController.getNote);
router.get('/', (req, res) => {
    res.send("Welcome To Secure Note")
})

module.exports = router;