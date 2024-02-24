const express= require("express")
const loginController= require('../controller/login')
const router= express.Router();

router.post('/login',loginController.loginUser)

 module.exports=router;