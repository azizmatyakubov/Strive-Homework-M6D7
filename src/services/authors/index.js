import express from "express";
import createError from "http-errors";
import AuthorModal from './modal.js'

const AuthorRouter = express.Router()

AuthorRouter.post('/', async(req, res, next) => {
    try {
        const newAuthor = new AuthorModal(req.body)
        const {_id} = await newAuthor.save()
        res.status(201).send({_id})
    } catch (error) {
        next(error)
    }
})

AuthorRouter.get('/', async(req, res, next) => {
    try {
        const authors = await AuthorModal.find()
        res.status(200).send(authors) 
    } catch (error) {
        next(error)
    }
})

AuthorRouter.get('/:authorId', async(req, res, next) => {
    try {
        const author = await AuthorModal.findById(req.params.authorId)
        if(author) {
            res.status(200).send(author)
        } else {
            next(createError(404, `author with id ${req.params.authorId} not found`))
        }
    } catch (error) {
        next(error)
    }
})

AuthorRouter.put('/:authorId', async(req, res, next) => {
    try {
        const updatedAuthor = await AuthorModal.findByIdAndUpdate(
            req.params.authorId,
            req.body,
            {
                new: true, runValidators: true
            }
        )
        if(updatedAuthor) {
            res.status(200).send(updatedAuthor)
        } else {
            next(createError(404, `author with id ${req.params.authorId} not found`))
        }
    } catch (error) {
        next(error)
    }
})

AuthorRouter.delete('/:authorId', async(req, res, next) => {
    try {
        const author = await AuthorModal.findByIdAndDelete(req.params.authorId)
        if(author) {
            res.status(204).send()
        } else {
            next(createError(404, `author with id ${req.params.authorId} not found`))
        }
    } catch (error) {
        next(error)
    }
})





export default AuthorRouter
