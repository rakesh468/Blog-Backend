import { client } from "./index.js";
import bcrypt from "bcrypt";



async function DeleteBlogById(id) {
  return await client.db("Blog").collection("Blogs").deleteOne({ id: id });
}

async function EditBlogById(id, data) {
  return await client
    .db("Blog")
    .collection("Blogs")
    .updateOne({ id: id }, { $set: data });
}

async function CreateBlog(data) {
  return await client.db("Blog").collection("Blogs").insertOne(data);
}

async function GetBlogById(id) {
  return await client.db("Blog").collection("Blogs").findOne({ id: id });
}

async function GetallBlogs() {
  return await client.db("Blog").collection("Blogs").find().toArray();
}

async function CreateUser(data){
  return await client.db("Blog").collection("users").insertOne(data);
}

async function Getuserbyemail(email){
  return await client.db("Blog").collection("users").findOne({email:email})
}
async function Genpassword(password){
  const no_of_rounds=10;
  const salt=await bcrypt.genSalt(no_of_rounds);
  console.log(salt);
  const hashedpassword=await bcrypt.hash(password,salt);
  return hashedpassword;
}

export { DeleteBlogById, EditBlogById, CreateBlog, GetBlogById, GetallBlogs,Genpassword,CreateUser,Getuserbyemail }
