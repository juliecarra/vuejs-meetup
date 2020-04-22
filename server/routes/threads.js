const express = require('express');
const router = express.Router();

const ThreadsCtrl = require('../controllers/threads');
const AuthCtrl = require("../middlewares/auth");

router.get('', ThreadsCtrl.getThreads);
router.post('/',  AuthCtrl.isLoggedIn, ThreadsCtrl.createThread);

module.exports = router;
