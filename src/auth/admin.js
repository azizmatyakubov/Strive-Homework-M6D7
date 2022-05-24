import createError from "http-errors"

export const adminAuth = (req, res, next) => {
    if(req.user.role === 'Admin') {
        next()
    } else {
        next(createError(403, 'Only Admins'))
    }
}