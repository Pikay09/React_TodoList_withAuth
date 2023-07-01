import mongoose from "mongoose";
import { Router } from "express";
import { responseList } from "../config/response-list.js";
import { Todo } from "../models/todo.models.js";
import { User } from "../models/user.models.js";
import {authenticateUser} from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/all/todos', async(req,res)=>{
  try{
   const todos = await Todo.find()
   res.status(200).json({todos})
  }catch(err){
    res.status(400).json({error: err, message: responseList.BAD_REQUEST });
  }
})

router.get("/todos", authenticateUser, async (req, res) => {
  try {
    //TODO: only display loggedIn user todo
    const todos = await Todo.find({ user: req.user._id});
    res.status(200).json({ todos });
  } catch (e) {
    res.status(400).json({ message: responseList.BAD_REQUEST });
  }
});

router.post("/todos",authenticateUser, async (req, res) => {
  try {
    //TODO: add loggedIn user id todo and push todo to user
    console.log(req.user._id)
    const todo = new Todo({...req.body, user: req.user._id} );
    await todo.save();
    await User.findByIdAndUpdate(req.user._id, { $push: { todos: todo._id } });
    res.status(201).json({ message: responseList.CREATED_SUCCESS });
  } catch (e) {
    res.status(400).json({ message: responseList.BAD_REQUEST });
  }
});

router.delete("/todos/:id", async (req, res) => {
  if (!req.params.id || !mongoose.isObjectIdOrHexString(req.params.id)) {
    return res.status(400).json({ message: responseList.BAD_REQUEST });
  }
  try {
    await Todo.findByIdAndDelete(req.params.id);
    //TODO Remove from User todo array
    res.status(200).json({ message: responseList.DELETED_SUCCESS });
  } catch (e) {
    res.status(400).json({ message: responseList.DELETED_FAILED });
  }
});

router.patch("/todos/:id", async (req, res) => {
  if (!req.params.id || !mongoose.isObjectIdOrHexString(req.params.id)) {
    return res.status(400).json({ message: responseList.BAD_REQUEST });
  }
  try {
    await Todo.findByIdAndUpdate(req.params.id, {isCompleted: req.body.isCompleted});
    //TODO Remove from User todo array
    res.status(200).json({ message: responseList.UPDATE_SUCCESS });
  } catch (e) {
    res.status(400).json({ message: responseList.DELETED_FAILED });
  }
});

router.get("/test" , (req,res)=>{
  console.log(req.user)
  res.send("All good")
})

export default router;
