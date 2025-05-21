import jwt from "jsonwebtoken"
import User from "../models/auth.model.js";

const protectedAuth = async (req, res, next)=>{
    
    try {
        const  token = await req.cookies.jwt;
        if(!token){
            return res.status(401).json({msg: 'Unauthorized, token not provided'});
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({msg: 'Unauthorized, invalid token'});
        }
    
        const user = await User.findById(decoded.userId).select("-password");
        if(!user)
        {
            return res.status(401).json({msg: 'Unauthorized, user not found'});
        }
    
        req.user = user;
        next(); 
    } catch (error) {
        console.log("Middleaware Error", error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

export default protectedAuth;