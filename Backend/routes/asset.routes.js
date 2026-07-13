const express = require('express');
const path = require('path');
const router = express.Router();
const UserModel = require('../models/user');
const AssetModel = require('../models/asset');
const { SignUp } = require('../controllers/asset.controllers');

router.post('/create', createAsset);
router.get('/get', getAssets);
router.patch('/update', updateAsset); //by id
router.delete('/delete', deleteAsset); // by id
router.get('/view', viewAsset); // by id

module.exports=router;