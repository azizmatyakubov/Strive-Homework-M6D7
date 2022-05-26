import createError from "http-errors";
import { verifyAccessToken } from "./tools.js";

export const JWTAuthMiddleware = async (req, res, next) => {
    if(!req.headers.authorization){
        next(createError(401, 'Please provide email and password'))
    } else {
        try {
            
            const token = req.headers.authorization.replace("Bearer ", "")
            const payload = await verifyAccessToken(token)

            req.user = {
                _id: payload._id,
                role: payload.role,
            }

            next()
        } catch (error) {
            console.log(error)
            // 5. If the token is NOT ok --> jsonwebtoken library should throw some errors, so we gonna catch'em and --> 401
            next(createError(401, "Token not valid!"))
        }
    }
}