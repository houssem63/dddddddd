const express=require('express');
const router=express.Router();
const {add, gettypes, update, deletefile_type,getone}=require('../controlles/file_type');
const verifyToken=require("../midellwers/verify_auth_token")
const {authorize}=require("../midellwers/verify_role")


router.post('/add',verifyToken,authorize('admin'),add)
router.get('/getall',verifyToken,gettypes)
router.put('/update/:id',verifyToken,authorize('admin'),update)
router.delete('/delete/:id',verifyToken,authorize('admin'),deletefile_type)

router.get('/getone/:id',getone)

module.exports=router;  