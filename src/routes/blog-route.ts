import {Router, Request, Response} from "express";
import {BlogRepository} from "../repositories/blog-repository";
import {RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../types/common";
import {BlogsBodyType, BlogsParams} from "../types/blog/input";
import {blogPostValidation} from "../validators/blogs-validator";
import {authMiddleware} from "../middlewares/auth/auth-middleware";


export const blogsRoute = Router({})

blogsRoute.get('/', async (req: Request, res: Response) => {
    const foundProducts = await BlogRepository.getAllBlogs()

    res.send(foundProducts)
})

blogsRoute.get('/:id', async (req: RequestWithParams<BlogsParams>, res: Response) => {
    const blog = await BlogRepository.getBlogById(req.params.id)
    if (!blog) {
        res.sendStatus(404)

    }
    return res.send(blog)
})

blogsRoute.post('/', authMiddleware, blogPostValidation(), async (req: RequestWithBody<BlogsBodyType>, res: Response) => {

    const newProduct = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    }

    const result = await BlogRepository.createBlog(newProduct)


    return res.status(201).send(result)
})


blogsRoute.put('/:id', authMiddleware, blogPostValidation(), async (req: RequestWithBodyAndParams<BlogsParams, BlogsBodyType>, res: Response) => {

    const updateParams = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    }

    let isUpdated = await BlogRepository.updateBlog(req.params.id, updateParams)

    if (isUpdated) {
        res.send(204)
    } else {
        res.send(404)
    }

})

blogsRoute.delete('/:id', authMiddleware, async (req: RequestWithParams<BlogsParams>, res: Response) => {
    const id = req.params.id
    const deleted =await BlogRepository.deleteBlog(id)
    if (deleted) {
      return   res.send(204)
    }
   return  res.send(404)
})