const express=require('express');
const router=express.Router();
const verifyToken=require("../midellwers/verify_auth_token")
const {authorize}=require("../midellwers/verify_role")
const {addfiles,searchFiles,downloadfile,todayFiles}=require('../controlles/file');
const upload = require('../midellwers/upload');
router.post('/addfiles',upload,addfiles)
router.get('/search',searchFiles)
router.get('/download/:filename',downloadfile)
router.get('/todayFiles',verifyToken,todayFiles)
 
module.exports=router;   