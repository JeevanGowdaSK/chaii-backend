// require('dotenv').config({path: './env'})

import path from "path";
import dotenv from "dotenv"

import connectDB from "./db/index.js";
import {app} from './app.js'



dotenv.config({
    path:'./env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!!",err);
})






/*
import express from "express";
const app = express()

// the below written is an IIFE(Immediately Invoked Function Expression) which is used to connect to the database
// the ";" at the start is used to prevent errors in case the previous file does not end with a semicolon
// the async function is used to connect to the database and the await keyword is used to wait for the connection to be established
// the try-catch block is used to handle errors that may occur during the connection process
;(async() => {
    try{
         await  mongoose.connect('${process.env.MONGO_URI}/${DB_NAME}')
         app.on("error",() => {
            console.log("Error connecting to database")
            throw error
        })

        app.listen(process.env.PORT,() => {
            console.log(`Server is running on port ${process.env.PORT}`)
        }
        )
    }catch(error){
        console.log("Error connecting to database", error)
        throw error
    }
})()
*/