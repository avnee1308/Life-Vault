const express = require('express');
const multer  = require('multer')
const router = express.Router();
const DocumentModel = require('../models/document');
const {createDoc,viewDocs,getDoc,updateDoc,deleteDoc,getDocCategory} = require('../controllers/document.controllers');
const {verifyTokenAndAuthenticateUser} = require('../auth/jwt')
const upload = require('../middleware/UploadDocument');

router.post('/create', verifyTokenAndAuthenticateUser, upload.single("document"), createDoc);
router.get('/view', verifyTokenAndAuthenticateUser, viewDocs);
router.get('/get/:id', verifyTokenAndAuthenticateUser, getDoc);
router.patch('/update/:id', verifyTokenAndAuthenticateUser, updateDoc);
router.delete('/delete/:id', verifyTokenAndAuthenticateUser, deleteDoc);
router.get('/get/category/:category', verifyTokenAndAuthenticateUser, getDocCategory);

module.exports=router;