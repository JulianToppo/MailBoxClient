const express= require("express")
const mailController= require('../controller/mails')
const authorization = require('../middlewares/authorization')
const router= express.Router();

router.post('/sendmail',authorization.Authorization,mailController.sendmail)

 module.exports=router;