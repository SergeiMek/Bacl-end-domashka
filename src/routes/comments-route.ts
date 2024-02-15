import {Response, Router} from "express";
import {RequestWithBodyAndParams, RequestWithParams} from "../types/common";
import {accessTokenGuard} from "../middlewares/auth/access.token.guard";
import {CommentsService} from "../domain/comments-service";
import {ResultCode} from "../types/resultCode";
import {QueryCommentsRepository} from "../repositories/queryCommentsRepository";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postValidation} from "../validators/post-validator";
import {paramsPost} from "../types/post/input";
import {postBodyType} from "../types/post/output";
import {PostService} from "../domain/post-service";
import {updateCommentValidation} from "../validators/comments-validator";


export const commentsRoute = Router({})


commentsRoute.get('/:id', async (req: RequestWithParams<{ id: string }>, res: Response) => {


    const foundComment = await QueryCommentsRepository.getCommentById(req.params.id)
    if (!foundComment) {
       return  res.sendStatus(404)
    }

   return  res.status(200).send(foundComment)
})

commentsRoute.put('/:commentId', accessTokenGuard, updateCommentValidation(), async (req: RequestWithBodyAndParams<{commentId:string}, {content:string}>, res: Response) => {
    // @ts-ignore
    const userId = req.user!.id as string

    let result = await CommentsService.updateComment(req.params.commentId,req.body.content,userId)

    if (result.code === ResultCode.Forbidden) {
        return res.sendStatus(403)
    }
    if (result.code === ResultCode.NotFound) {
        return res.sendStatus(404)
    }

    return res.sendStatus(204)

})

commentsRoute.delete('/:id', accessTokenGuard, async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const commentId = req.params.id
    // @ts-ignore
    const userId = req.user!.id as string
    const result = await CommentsService.deleteComment(commentId, userId)

    if (result.code === ResultCode.Forbidden) {
        return res.sendStatus(403)
    }
    if (result.code === ResultCode.NotFound) {
        return res.sendStatus(404)
    }

    return res.sendStatus(204)

})