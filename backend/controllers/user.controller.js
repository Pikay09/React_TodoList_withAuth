import { Router } from "express";
import { responseList } from "../config/response-list.js";
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import {authenticateUser} from "../middlewares/auth.middleware.js";
import dotenv from 'dotenv'
dotenv.config()

const router = Router();

const {SECRET} = process.env

/**
 * @description Used to get most up-to-date information on user
 */
router.get("/user", authenticateUser, async (req, res) => {
  try {
    req.user.password = ""
    res.status(200).json(req.user);
  } catch (e) {
    res.status(400).json({ message: responseList.BAD_REQUEST });
  }
});

/**
 * @description Used to authenticate user
 */
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    //something should be done here
    if (!user) {
      return res.status(400).json({ message: responseList.USER_NOT_FOUND });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: responseList.USER_PASSWORD_ERROR });
    }
    // const token = jwt.sign({user_id: user._id}, "something_secret", { expiresIn: 36})
    const token = jwt.sign({user_id: user._id}, SECRET)
    res.status(200).json({ token, user:req.user });
  } catch (e) {
    console.log(e)
    res.status(400).json({ message: responseList.BAD_REQUEST });
  }
});

/**
 * @description Used to save user date to database
 */
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hashSync(req.body.password, 10); //hash password.
    const userDataToSave = {
      // username: req.body.username,
      // lastName: req.body.lastName,
      username: req.body.username, //username was missing
      password: hashedPassword,
    };
    const user = new User(userDataToSave);
    await user.save();
    const token = jwt.sign({user_id: user._id}, SECRET)
    res.status(200).json({ message: responseList.CREATED_SUCCESS, token });
  } catch (e) {
    res.status(400).json({ message: responseList.BAD_REQUEST });
  }
});

export default router;
