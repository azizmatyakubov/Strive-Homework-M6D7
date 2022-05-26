import express from "express";
import { adminAuth } from "../../auth/admin.js";
import { basicAuth } from "../../auth/basic.js";
import { JWTAuthMiddleware } from "../../auth/token.js";
import { generateAccessToken } from "../../auth/tools.js";
import UserModel from './modal.js'

const UserRouter = express.Router()

UserRouter.post('/register', async(req, res, next) => {
    try {
      const newUser = new UserModel(req.body)
      const { _id } = await newUser.save()
      res.status(201).send(newUser)
    } catch (error) {
        next(error)
    }
})

UserRouter.post('/login', async (req, res, next) => {
    try {
      const {email, password} = req.body
      const user = await UserModel.checkCredentials(email, password)

      if(user) {
          const accessToken = await generateAccessToken({_id: user._id, role: user.role})
          res.send({accessToken})
      } else {
          res.status(401).send("Credentials are incorrect")
      }

    } catch (error) {
        next(error)
    }
})


UserRouter.get('/', JWTAuthMiddleware, adminAuth, async(req, res, next) => {
    try {
      const users = await UserModel.find()
      res.status(200).send(users)
    } catch (error) {
        next(error)
    }
})

UserRouter.get('/:userId', basicAuth, async(req, res, next) => {
    try {
      
    } catch (error) {
        next(error)
    }
})

UserRouter.put('/:userId', basicAuth, async(req, res, next) => {
    try {
      
    } catch (error) {
        next(error)
    }
})

UserRouter.delete('/:userId', basicAuth, async(req, res, next) => {
    try {
      
    } catch (error) {
        next(error)
    }
})



export default UserRouter