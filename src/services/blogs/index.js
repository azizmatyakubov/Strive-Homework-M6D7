import express from "express";
import blogModel from './model.js'
import createError from 'http-errors'

const blogRouter = express.Router()


blogRouter.post('/', async(req, res, next) => {
    try {
        const newBlog = new blogModel(req.body)
        const { _id } = await newBlog.save()
        res.status(201).send( {_id} )
    } catch (error) {
        console.log(error)
        next(error)
    }
})

blogRouter.get('/', async(req, res, next) => {
    try {
        const blogs = await blogModel.find()
        if(blogs){
            res.status(200).send(blogs)
        }
    } catch (error) {
        next(error)
    }
})

blogRouter.get('/:blogId', async(req, res, next) => {
    try {
        const blog = await blogModel.findById(req.params.blogId)
        if(blog) {
            res.status(200).send(blog)
        }else {
           next(createError(404, `blog with id ${req.params.blogId} not found`))
        }
    } catch (error) {
        next(error)
    }
})

blogRouter.put('/:blogId', async(req, res, next) => {
    try {
        const updatedBlog = await blogModel.findByIdAndUpdate(
            req.params.blogId,
            req.body,
            {new: true, runValidators: true}
        )
        if(updatedBlog) {
            res.send(updatedBlog)
        } else {
            next(createError(404, `blog with id ${req.params.blogId} not found`))
        }
    } catch (error) {
        next(error)
    }
})

blogRouter.delete('/:blogId', async(req, res, next) => {
    try {
        const deletedBlog = await blogModel.findByIdAndDelete(req.params.blogId)
        if(deletedBlog) {
            res.status(203).send('blog is deleted')
        } else {
            next(createError(404, `blog with id ${req.params.id} not found`))
        }
    } catch (error) {
        next(error)
    }
})

// 1. COMMENT POST 
blogRouter.post('/:blogId/comments/', async(req, res, next) => {
    try {
        const comment = {...req.body, date: Date()}
        console.log(comment) 
        const updateBlog = await blogModel.findByIdAndUpdate(req.params.blogId, {$push: {comments: comment}}, {new: true, runValidators: true})
        if(updateBlog) {
            res.status(201).send(updateBlog)
        } else {
            next(createError(404, `blog with id ${req.params.id} not found`))
        }
    } catch (error) {
        next(error)
    }
})

blogRouter.get('/:blogId/comments/', async(req, res, next) => {
    try {
        const blog = await blogModel.findById(req.params.blogId)
        if(blog) {
            res.status(200).send(blog.comments)
        } else {
            next(createError(404, `blog with id ${req.params.id} not found`))
        }
    } catch (error) {
        next(error)
    }
})

blogRouter.get('/:blogId/comments/:commentId', async(req, res, next) => {
    try {
        const blog = await blogModel.findById(req.params.blogId)
        if(blog) {
            const comment = blog.comments.find(comment => comment._id.toString() === req.params.commentId)
            if(comment) {
                res.status(200).send(comment)
            } else {
                next(createError(404, `comment with id ${req.params.commentId} not found`))
            } 
        } else {
            next(createError(404, `Blog with id ${req.params.blogId} not found`))
        }
    } catch (error) {
        next(error)
    }
})


blogRouter.put('/:blogId/comments/:commentId', async(req, res, next) => {
    try {
        const blog = await blogModel.findById(req.params.blogId)
        if(blog) {
            // I will ask blog.comments.toObject === blog.comments
            const index = blog.comments.findIndex(comment => comment._id.toString() === req.params.commentId)
            if(index !== -1) {
                blog.comments[index] = {...blog.comments[index].toObject(), ...req.body}

                await blog.save()
                res.status(200).send(blog)
            } else {
                next(createError(404, `comment with id ${req.params.commentId} not found`))
            }
        } else {
            next(createError(404, `blog with id ${req.params.blogId} not found`))
        }
    } catch (error) {
        next(error)
    }
})


blogRouter.delete('/:blogId/comments/:commentId', async(req, res, next) => {
    try {
        const blog = await blogModel.findByIdAndUpdate(
            req.params.blogId,
            {$pull: {comments: {_id: req.params.commentId}}},
            {new: true}
        )

        if(blog) {
            res.status(204).send({message: 'Deleted'})
        } else {
            next(createError(404, `blog with id ${req.params.blogId} not found`))
        }
    } catch (error) {
        next(error)
    }
})


export default blogRouter