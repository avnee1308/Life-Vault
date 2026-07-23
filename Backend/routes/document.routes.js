const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router();
const DocumentModel = require('../models/document');
const {createDoc,viewDocs,getDoc,updateDoc,deleteDoc,getDocCategory} = require('../controllers/document.controllers');
const {verifyTokenAndAuthenticateUser} = require('../auth/jwt')

router.post('/create', verifyTokenAndAuthenticateUser, createDoc);
router.post('/upload', verifyTokenAndAuthenticateUser, upload.array('photos', 12), uploadDoc);
router.get('/view', verifyTokenAndAuthenticateUser, viewDocs);
router.get('/get/:id', verifyTokenAndAuthenticateUser, getDoc);
router.patch('/update/:id', verifyTokenAndAuthenticateUser, updateDoc);
router.delete('/delete/:id', verifyTokenAndAuthenticateUser, deleteDoc);
router.get('/get/category/:category', verifyTokenAndAuthenticateUser, getDocCategory);

module.exports=router;