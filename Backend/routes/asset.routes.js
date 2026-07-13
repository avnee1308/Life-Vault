const express = require('express');
const path = require('path');
const router = express.Router();
const UserModel = require('../models/user');
const AssetModel = require('../models/asset');
const {createAsset, getAssets, updateAsset, deleteAsset, viewAsset} = require('../controllers/asset.controllers');

router.post('/create', createAsset);
router.get('/get', getAssets);
router.patch('/update', updateAsset); //by id
router.delete('/delete/:id', deleteAsset); // by id
router.get('/view', viewAsset); // by id or filter by category
// Archive Asset
// Favourite Asset

module.exports=router;