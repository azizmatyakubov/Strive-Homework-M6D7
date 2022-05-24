import express from "express";
import listendpoints from 'express-list-endpoints'
import cors from 'cors'
import mongoose from 'mongoose'
import blogRouter from "./services/blogs/index.js";
import authorsRouter from "./services/authors/index.js";
import userRouter from "./services/users/index.js";
import { catchAllHandler, forbiddenHandler, unauthorizedHandler } from "./errorHandlers.js";


const server = express()
const port = process.env.PORT || 3002

// -------------------------------Middleware-------------------------
server.use(cors())
server.use(express.json())

// -------------------------------End points-------------------------
server.use('/blogPosts', blogRouter)
server.use('/authors', authorsRouter)
server.use('/users', userRouter)


// -------------------------------Error handlers ---------------------

server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(catchAllHandler)



// -------------------------------Connecting Database ----------------
mongoose.connect(process.env.MONGO_CONNECTION)


mongoose.connection.on("connected", ()=>{
    console.log('Mongo is connected succesfully')

    server.listen(port, ()=>{
        console.table(listendpoints(server))
        console.log(`Server is running on port ${port}`)
    })

})
