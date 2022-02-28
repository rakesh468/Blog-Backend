import {
  DeleteBlogById,
  EditBlogById,
  CreateBlog,
  GetBlogById,
  GetallBlogs,
} from "../helper.js";
import express from "express";
import { auth } from "../middleware/auth.js";

const router = express.Router();

//get all blogs using get method//
router
  .route("/")
  .get(auth,async (request, response) => {
    const data = await GetallBlogs();
    response.send(data);
  })
  //create blog using post method//
  .post(auth,async (request, response) => {
    const data = request.body;
    const result = await CreateBlog(data);
    response.send(result);
  });

//get all blogs by id using get method//
router
  .route("/:id")
  .get(auth,async (request, response) => {
    const { id } = request.params;
    const blog = await GetBlogById(id);
    response.send(blog);
  })
  //edit blog using put method//
  .put(auth,async (request, response) => {
    const { id } = request.params;
    const data = request.body;
    console.log(data);
    const result = await EditBlogById(id, data);
    response.send(result);
  })
  //delete blog by id using delete method//
  .delete(auth,async (request, response) => {
    const { id } = request.params;
    const result = await DeleteBlogById(id);
    result.deletedCount > 0
      ? response.send(result)
      : response.send({ message: "No matching Blog Found" });
  });

export const BlogsRouter = router;
