const express = require('express');
const path = require('path');
const router = express.Router();
const UserModel = require('../models/user');
const { SignUp, Login } = require('../controllers/user.controllers');

router.post('/SignUp', SignUp);
router.post('/Login', Login);

module.exports=router;