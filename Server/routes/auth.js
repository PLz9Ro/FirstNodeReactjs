const authController = require("../Controller/authController");
const express = require('express');
const router = express.Router();

router.post('/login', authController.LoginUser);

// Endpoint đăng ký
router.post('/register', authController.registerUser);
router.post('/refresh',authController.requestRefreshToken);
module.exports = router;
