import {Request, Response, Router} from "express";
import {PostRepository} from "../repositories/posts-repository";
import {
    RequestTypeWithQuery,
    RequestWithBody,
    RequestWithBodyAndParams,
    RequestWithParams,
    RequestWithParamsAndQuery
} from "../types/common";
import {paramsPost, sorPostData} from "../types/post/input";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postBodyType, postsType} from "../types/post/output";
import {postValidation} from "../validators/post-validator";
import {SortDataType} from "../types/blog/input";
import {QueryBlogRepository} from "../repositories/queryBlogRepository";
import {QueryPostRepository} from "../repositories/queryPostRepository";
import {PostService} from "../domain/post-service";
import {commentValidation, contendValidation} from "../validators/comments-validator";
import {CommentsService} from "../domain/comments-service";
import {accessTokenGuard} from "../middlewares/auth/access.token.guard";
import {sorCommentsData} from "../types/comments/input";
import {QueryCommentsRepository} from "../repositories/queryCommentsRepository";


export const postsRoute = Router({})

postsRoute.get('/', async (req: RequestTypeWithQuery<sorPostData>, res: Response): Promise<any> => {
    const sortData = {
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection
    }
    const foundProducts = await QueryPostRepository.getPosts(sortData)

    return res.status(200).send(foundProducts)
})

postsRoute.get('/:id/comments', async (req: RequestWithParamsAndQuery<{
    id: string
}, sorCommentsData>, res: Response): Promise<any> => {
    const post = await QueryPostRepository.getPostById(req.params.id)
    if (!post) return res.sendStatus(404)
    const sortData = {
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection
    }

    const foundProducts = await QueryCommentsRepository.getComments(sortData, req.params.id)

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

    //return res.status(201).send(await PostRepository.createPost(newPost))
    const createdPost = await PostService.createPost(newPost)
    if (!createdPost) {
        res.send(400)
        return
    }
    return res.status(201).send(createdPost)
})

postsRoute.post('/:id/comments', accessTokenGuard, commentValidation(), async (req: RequestWithBodyAndParams<{
    id: string
}, { content: string }>, res: Response) => {

    // @ts-ignore
    const userId = req.user!.id as string
    const content = req.body.content
    const postId = req.params.id
    if (!userId) return res.sendStatus(401)
    if (!postId) {
       return  res.sendStatus(404)

    }

    const comment = await CommentsService.sendComment(content, userId, postId)

    if (!comment) {
       return  res.sendStatus(400)

    }
    /*//return res.status(201).send(await PostRepository.createPost(newPost))
    const createdComment = await PostService.createPost(newPost)
    if (!createdComment) {
        res.send(400)
        return
    }*/
    return res.status(201).send(comment)
})

postsRoute.put('/:id', authMiddleware, postValidation(), async (req: RequestWithBodyAndParams<paramsPost, postBodyType>, res: Response) => {

    const newPost = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId
    }

    //let isUpdated = await PostRepository.updatePost(req.params.id, newPost)
    let isUpdated = await PostService.updatePost(req.params.id, newPost)

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