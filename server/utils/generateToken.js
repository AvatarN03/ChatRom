import json from "jsonwebtoken"

export default async function generateToken (userId, res){
    
        const token = json.sign(
            {userId}, 
            process.env.JWT_SECRET,  
            { expiresIn: "7d" }
        )

        res.cookie("jwt", token , {
            maxAge:7*24*60*60*1000,
            httpOnly:true, // the javascript can't read the cookie
            sameSite:"strict", // to prevent the cookie to pass-on
            secure: process.env.NODE_ENV !== 'development'
        })
        return token;

   
}