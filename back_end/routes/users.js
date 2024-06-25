const express=require('express');
const router=express.Router();
const {addUser, getAllUser,updateUser, deleteUser,getoneuser}=require('../controlles/user')
router.post('/adduser',addUser)
router.get('/getalluser',getAllUser)
router.put('/updateuser/:id',updateUser)
router.delete('/deleteuser/:id',deleteUser)

router.get('/getoneuser/:id',getoneuser)

module.exports=router;