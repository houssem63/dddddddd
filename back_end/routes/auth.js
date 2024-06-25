const express=require('express');
const router=express.Router();
const {LogIn}=require('../controlles/auth');
router.post('/login',LogIn)

module.exports=router;