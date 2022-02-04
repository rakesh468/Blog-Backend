import express  from "express";
import { Genpassword,Getuserbyemail,CreateUser } from "../helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router=express.Router();

router.post("/signup",async(request,response)=>{
    const {firstname,lastname,email,password}=request.body;
    const userfromdb=await Getuserbyemail(email)
    if(userfromdb){
        response.send({message:"Email Id already Exists"});
        return;
    }
    if(password.length < 8){
        response.send({message:"Password is too Short"});
        return;
    }
 const hashedpassword=await Genpassword(password)
 console.log(hashedpassword);
 const result=await CreateUser({firstname,lastname,email,password:hashedpassword})
 response.send(result);  

})


router.post("/login",async(request,response)=>{
    const {email,password}=request.body;
    const userfromdb=await Getuserbyemail(email)
    if(!userfromdb){
        response.status(401).send({message:"Invalid Credentails"})
        return;
    }
    const storedpassword=userfromdb.password;
    const matchpassword=await bcrypt.compare(password,storedpassword)
    if(matchpassword){
        const token=jwt.sign({id:userfromdb._id},process.env.SECRET_KEY,{expiresIn:"1d"})
        response.status(200).send({message:"Successful Login",token:token})
    }
    else{
        response.send({message:"Invaild Credentials"})
    }
});


export const userRouter=router;
