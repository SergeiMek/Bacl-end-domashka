import {Request, Response, Router} from "express";
import {PostRepository} from "../repositories/posts-repository";
import {RequestTypeWithQuery, RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../types/common";
import {paramsPost, sorPostData} from "../types/post/input";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postBodyType, postsType} from "../types/post/output";
import {postValidation} from "../validators/post-validator";
import {SortDataType} from "../types/blog/input";
import {QueryBlogRepository} from "../repositories/queryBlogRepository";
import {QueryPostRepository} from "../repositories/queryPostRepository";


export const postsRoute = Router({})

postsRoute.get('/', async (req: RequestTypeWithQuery<sorPostData>, res: Response): Promise<any> => {
    const sortData = {
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection
    }
    const foundProducts =   await QueryPostRepository.getPosts(sortData)

    return res.status(200).send(foundProducts)
})

postsRoute.get('/:id', async (req: RequestWithParams<paramsPost>, res: Response) => {
    const post = await QueryPostRepository.getPostById(req.params.id)
    if (!post) {
        res.send(404)
        return
    }
    return res.send(post)
})

postsRoute.post('/', authMiddleware, postValidation(), async (req: RequestWithBody<postBodyType>, res: Response) => {
    const newPost = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId
    }

    return res.status(201).send(await PostRepository.createPost(newPost))
})

postsRoute.put('/:id', authMiddleware, postValidation(), async (req: RequestWithBodyAndParams<paramsPost, postBodyType>, res: Response) => {

    const newPost = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId
    }

    let isUpdated = await PostRepository.updatePost(req.params.id, newPost)

    if (isUpdated) {
        res.send(204)
    } else {
        res.send(404)
    }

})

postsRoute.delete('/:id', authMiddleware, async (req: RequestWithParams<paramsPost>, res: Response) => {
    const id = req.params.id
    const deleted = await PostRepository.deletePost(id)
    if (deleted) {
        return res.send(204)
    }
    return res.send(404)
})