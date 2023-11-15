import {Router, Request, Response} from "express";
import {BlogRepository} from "../repositories/blog-repository";
import {RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../types/common";
import {BlogsBodyType, BlogsParams} from "../types/blog/input";
import {blogPostValidation} from "../validators/blogs-validator";
import {authMiddleware} from "../middlewares/auth/auth-middleware";


export const blogRoute = Router({})

blogRoute.get('/', (req: Request, res: Response) => {

    res.send(BlogRepository.getAllBlogs())
})

blogRoute.get('/:id', (req: RequestWithParams<BlogsParams>, res: Response) => {
    const blog = BlogRepository.getBlogById(req.params.id)
    if (!blog) {
        res.sendStatus(404)

    }
    return res.send(blog)
})

blogRoute.post('/', authMiddleware, blogPostValidation(), (req: RequestWithBody<BlogsBodyType>, res: Response) => {
    const newProduct = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    }

    return res.status(201).send(BlogRepository.createBlog(newProduct))
})

blogRoute.put('/:id', authMiddleware, blogPostValidation(), (req: RequestWithBodyAndParams<BlogsParams, BlogsBodyType>, res: Response) => {

    const updateParams = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    }

    let isUpdated = BlogRepository.updateBlog(req.params.id, updateParams)

    if (isUpdated) {
        res.send(204)
    } else {
        res.send(404)
    }

})

blogRoute.delete('/:id', authMiddleware, (req: RequestWithParams<BlogsParams>, res: Response) => {
    const id = req.params.id
    const deleted = BlogRepository.deleteBlog(id)
    if (deleted) {
        res.send(204)
    }
    res.send(404)
})