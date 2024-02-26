const jwt = require("jsonwebtoken");
const user = require("../model/user");

const Authorization=async (req,res,next)=>{
    try {
         const localKey= req.header('Authorization')

         console.log(localKey)
         const activeUser= await jwt.verify(localKey,"secretkey");
         console.log(activeUser)
         user.findByPk(activeUser.userId).then((result)=>{
            req.user=result;
            next(); 
         })
    } catch (error) {
        res.status(401).json({success: false})
    }
   

}

module.exports={
    Authorization,
}