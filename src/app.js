import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()


// we use ".use()" ,methos to work with middlewares & configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credentials: true
}))

app.use(express.json({limit:"16kb"}))                          // to accept or parse data of type JSON
app.use(express.urlencoded({extended:true ,limit: "16kb" }))   // to accept or parse data coming from URL
app.use(express.static("public"))                  // to store files and folders in "public" folder
app.use(cookieParser())                           // to access cookies from user browser 


//routes

import userRouter from "./routes/user.routes.js"


// routes declaration
app.use("/api/v1/users",userRouter)    // we are creating an API of version 1(v1)

// http://localhost:8000/api/v1/users/register


export { app }