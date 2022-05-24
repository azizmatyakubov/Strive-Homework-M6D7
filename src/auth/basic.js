import createError from "http-errors"
import UsersModel from '../services/users/modal.js'
import atob from "atob"

export const basicAuth = async(req, res, next) => {
    if (!req.headers.authorization) {
        next(createError(401, "Please provide credentials in Authorization header!"))
    } else {
        const base64Credential = req.headers.authorization.split(" ")[1]
        const [email, password] = atob(base64Credential).split(":")
       
        const user = await UsersModel.checkCredentials(email, password)
        if(user){
            req.user = user
            next()
        } else {
            next(createError(401, 'Credentials are wrong'))
        }
    }
}