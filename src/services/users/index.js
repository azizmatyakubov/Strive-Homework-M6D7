import express from "express";
import { adminAuth } from "../../auth/admin.js";
import { basicAuth } from "../../auth/basic.js";
import UserModel from './modal.js'

const UserRouter = express.Router()

UserRouter.post('/',  async(req, res, next) => {
    try {
      const newUser = new UserModel(req.body)
      const { _id } = await newUser.save()
      res.status(201).send(newUser)
    } catch (error) {
        next(error)
    }
})

UserRouter.get('/', basicAuth, adminAuth, async(req, res, next) => {
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