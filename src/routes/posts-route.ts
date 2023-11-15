import {Request, Response, Router} from "express";
import {PostRepository} from "../repositories/posts-repository";
import {RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../types/common";
import {paramsPost} from "../types/post/input";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postBodyType} from "../types/post/output";
import {postValidation} from "../validators/post-validator";


export const postsRoute = Router({})

postsRoute.get('/', (req: Request, res: Response) => {

    res.send(PostRepository.getAllPosts())
})

postsRoute.get('/:id', (req: RequestWithParams<paramsPost>, res: Response) => {
    const post = PostRepository.getPostById(req.params.id)
    if (!post) {
        res.send(404)
    }
    return res.send(post)
})

postsRoute.post('/', authMiddleware, postValidation(), (req: RequestWithBody<postBodyType>, res: Response) => {
    const newPost = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId
    }

    return res.status(201).send(PostRepository.createPost(newPost))
})

postsRoute.put('/:id', authMiddleware, postValidation(), (req: RequestWithBodyAndParams<paramsPost, postBodyType>, res: Response) => {

    const newPost = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId
    }

    let isUpdated = PostRepository.updatePost(req.params.id, newPost)

    if (isUpdated) {
        res.send(204)
    } else {
        res.send(404)
    }

})

postsRoute.delete('/:id', authMiddleware, postValidation(), (req: RequestWithParams<paramsPost>, res: Response) => {
    const id = req.params.id
    const deleted = PostRepository.deletePost(id)
    if (deleted) {
        res.send(204)
    }
    res.send(404)
})