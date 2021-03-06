import express from "express";
import {MongoClient} from "mongodb";
import { BlogsRouter} from "./Routes/Blogs.js";
import { userRouter } from "./Routes/users.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()

const app=express();

const PORT=process.env.PORT;

//cors is a middleware to accese the data//
app.use(cors());

//converting data into json using express.json()=>middlware//
app.use(express.json())



const MONGO_URL=process.env.MONGO_URL;

async function Connection(){
    const client=new MongoClient(MONGO_URL)
    console.log("Mongodb Connected")
    await client.connect();
    return client;
}
 
//Making client as Global Variable//
 export const client=await Connection();

//server welcome page//
app.get("/",(request,response)=>{
    response.send("Helllo world ")
})

app.use("/blogs",BlogsRouter);
app.use("/users",userRouter);

//app listening to port 8100//
app.listen(PORT,()=>console.log("App Running in ",PORT))

