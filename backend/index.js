import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose";
import cors from 'cors'

import userController from "./controllers/user.controller.js"
import todoController from "./controllers/todo.controller.js"
import {responseList} from "./config/response-list.js";


const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
    origin: process.env.CORS_OPTIONS,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }))
app.use(express.json())
app.use(express.urlencoded())
mongoose.connect(process.env.MONGODB).then(() => {
    console.log('mongodb connected!')
})

app.use("/api/v1", userController)
app.use("/api/v2", todoController)

/**
    @method GET, POST, DELETE, PUT, PATCH
    @description catches all undefined endpoints
    @returns object
 */
app.all("*", (req, res) => {
    res.status(404).json({ message: responseList.NOT_FOUND})
})


app.listen(PORT, () => {
    console.log(`running on ${PORT}`)
})
