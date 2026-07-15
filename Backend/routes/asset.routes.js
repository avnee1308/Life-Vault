const express = require('express');
const path = require('path');
const router = express.Router();
const UserModel = require('../models/user');
const AssetModel = require('../models/asset');
const {createAsset, getAssets, updateAsset, deleteAsset, viewAsset} = require('../controllers/asset.controllers');
const { verifyTokenAndAuthenticateUser } = require('../auth/jwt');

router.post('/create', verifyTokenAndAuthenticateUser , createAsset);
router.get('/get',verifyTokenAndAuthenticateUser, getAssets);
router.patch('/update/:id',verifyTokenAndAuthenticateUser, updateAsset); //by id
router.delete('/delete/:id', verifyTokenAndAuthenticateUser, deleteAsset); // by id
router.get('/view/:id',verifyTokenAndAuthenticateUser, viewAsset); // by id or filter by category
// Archive Asset
// Favourite Asset

module.exports=router;