const express= require("express")
const mailController= require('../controller/mails')
const authorization = require('../middlewares/authorization')
const router= express.Router();

router.post('/sendmail',authorization.Authorization,mailController.sendmail)
router.get('/getallmail',authorization.Authorization,mailController.getAllMails)
router.get('/getallsentmail',authorization.Authorization,mailController.getAllSentMail)
router.post('/updateemail',authorization.Authorization,mailController.updateRead)
router.delete('/deletemail/:id',authorization.Authorization,mailController.deleteMail)
router.get('/getuserdetails/:id',authorization.Authorization,mailController.getUserDetails)

 module.exports=router;