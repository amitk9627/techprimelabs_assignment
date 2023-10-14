const jwt=require('jsonwebtoken');
const Users=require('../model/users.js');
// security check
// 1 extract jwt token from header
// 2 validate the expiry of jwt token
// 3 validate the jwt token is correct
const authMiddleware=async (req,res,next)=>{

    // extract jwt token from header
    const token = req.headers.authorization;
    if(!token){
        return res.json({
            status:false,
            message:"token is missing"
        })
    }

    // validate the expiry of jwt token
    const decodedToken= jwt.decode(token);
    const now=Math.floor(Date.now()/1000);
    const expiry=decodedToken.exp;
    if(now>expiry){
        return res.json({
            status:false,
            message:"token is expried"
        })
    }

    // validate the jwt token is correct
    const user= await Users.findById(decodedToken.userId); 
   
    if(user.token!==token || !user.token){
        return res.json({
            status:false,
            message:"please login to access this resource"
        })
    }
   
    req.user=user;
    next();
}
module.exports=authMiddleware;