import {Response, Router} from "express";
import {BlogRepository} from "../repositories/blog-repository";
import {
    RequestTypeWithQuery,
    RequestWithBody,
    RequestWithBodyAndParams,
    RequestWithParams,
    RequestWithParamsAndQuery
} from "../types/common";
import {BlogsBodyType, BlogsParams, BlogsQueryType, postDataType, SortDataType} from "../types/blog/input";
import {blogPostValidation, createdPostInBlogValidation} from "../validators/blogs-validator";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {BlogService} from "../domain/blog-service";
import {QueryBlogRepository} from "../repositories/queryBlogRepository";
import {QueryPostRepository} from "../repositories/queryPostRepository";


export const blogsRoute = Router({})

blogsRoute.get('/', async (req: RequestTypeWithQuery<SortDataType>, res: Response) => {
    const sortData = {
        searchNameTerm: req.query.searchNameTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }

    const foundProducts = await QueryBlogRepository.getBlogs(sortData)

    res.send(foundProducts)
})

blogsRoute.get('/:id', async (req: RequestWithParams<BlogsParams>, res: Response) => {
    const blog = await QueryBlogRepository.getBlogById(req.params.id)
    if (!blog) {
        res.sendStatus(404)
        return
    }
    return res.status(200).send(blog)
})

blogsRoute.get('/:id/posts', async (req: RequestWithParamsAndQuery<BlogsParams, BlogsQueryType>, res: Response) => {

    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }
    const id = req.params.id
    const blog = await QueryBlogRepository.getBlogById(id)

    if (!blog) {
        res.sendStatus(404)
        return
    }

    const posts = await QueryBlogRepository.getPostsByBlogId(id, sortData)

    return res.status(200).send(posts)
})

/*blogsRoute.post('/:id/posts', authMiddleware, createdPostInBlogValidation(), async (req: RequestWithBodyAndParams<{ id: string }, postDataType>, res: Response) => {
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content

    const blogId = req.params.id

    const blog = await QueryBlogRepository.getBlogById(blogId)


    if (!blog) {
        res.sendStatus(404)
        return
    }

    const createdPostId = await BlogRepository.createPostToBlog(blogId, {title, shortDescription, content})

    const post = await QueryPostRepository.getPostById(createdPostId)
    if (!post) {
        res.sendStatus(404)
        return
    }
    res.status(201).send(post)

})*/

blogsRoute.post('/', authMiddleware, blogPostValidation(), async (req: RequestWithBody<BlogsBodyType>, res: Response) => {

    const newBlogData = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    }

    const blog = await BlogService.createBlog(newBlogData)
    if(!blog){
        res.status(400)
        return
    }

    return res.status(201).send(blog)
})


blogsRoute.put('/:id', authMiddleware, blogPostValidation(), async (req: RequestWithBodyAndParams<BlogsParams, BlogsBodyType>, res: Response) => {

    const updateParams = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    }

    //let isUpdated = await BlogRepository.updateBlog(req.params.id, updateParams)
    let isUpdated = await BlogService.updateBlog(req.params.id, updateParams)

    if (isUpdated) {
        res.send(204)
    } else {
        res.send(404)
    }

})

blogsRoute.post('/:id/posts', authMiddleware,createdPostInBlogValidation(), async (req: RequestWithBodyAndParams<BlogsParams, postDataType>, res: Response) => {
    const id = req.params.id
    const {title, shortDescription, content} = req.body


    const post = await BlogService.creatPostToBlog(id, {title, shortDescription, content})

    if (!post) {
        res.send(404)
        return
    }
    res.status(201).send(post)
})

blogsRoute.delete('/:id', authMiddleware, async (req: RequestWithParams<BlogsParams>, res: Response) => {
    const id = req.params.id
    const deleted = await BlogRepository.deleteBlog(id)
    if (deleted) {
        return res.send(204)
    }
    return res.send(404)

})