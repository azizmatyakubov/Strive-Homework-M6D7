import express from "express";
import listendpoints from 'express-list-endpoints'
import cors from 'cors'
import mongoose from 'mongoose'
import blogRouter from "./services/blogs/index.js";
import authorsRouter from "./services/authors/index.js";


const server = express()
const port = process.env.PORT || 3002

// -------------------------------Middleware-------------------------
server.use(cors())
server.use(express.json())

// -------------------------------End points-------------------------
server.use('/blogPosts', blogRouter)
server.use('/authors', authorsRouter)


// -------------------------------Error handlers ---------------------



// -------------------------------Connecting Database ----------------
mongoose.connect(process.env.MONGO_CONNECTION)


mongoose.connection.on("connected", ()=>{
    console.log('Mongo is connected succesfully')

    server.listen(port, ()=>{
        console.table(listendpoints(server))
        console.log(`Server is running on port ${port}`)
    })

})
