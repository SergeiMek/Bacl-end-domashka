import {CommentsRepository} from "../repositories/comments-repository";
import {QueryUsersRepository} from "../repositories/queryUsersRepository";
import {QueryCommentsRepository} from "../repositories/queryCommentsRepository";
import {postsCollection} from "../db/db";
import {ResultCode} from "../types/resultCode";
import {Result} from "../types/result.type";
import {postDataType} from "../types/blog/input";
import {QueryPostRepository} from "../repositories/queryPostRepository";
import {PostRepository} from "../repositories/posts-repository";
import {commentsOutputModel, commentsType} from "../types/comments/output";

export class CommentsService {
    static async sendComment(contend: string, userId: string, postId: string) {
        const me = await QueryUsersRepository.getMe(userId)
        if (!me) {
            return null
        }
        const comment = {
            id: String(+(new Date())),
            content: contend,
            commentatorInfo: {
                userId: userId,
                userLogin: me?.login
            },
            createdAt: new Date().toISOString(),
            postId: postId
        }

        await CommentsRepository.createComment(comment)
        return await QueryCommentsRepository.getCommentById(comment.id)
    }

    static async updateComment(commentId: string, contend: string, userId: string): Promise<Result<string>> {

        const comment = await QueryCommentsRepository.getCommentById(commentId)
        if (!comment) {
            return {
                code: ResultCode.NotFound,
                errorMessage: `Comment with ${commentId} not found`
            }
        }
        if (userId != comment.commentatorInfo.userId) {
            return {
                code: ResultCode.Forbidden,
                errorMessage: "Incorrect user"
            }
        }
        const updatePost:commentsOutputModel = {
            ...comment,
            content: contend
        }
        debugger
         await CommentsRepository.updateComment(commentId, updatePost)

        return {
            code: ResultCode.Success,
        }

    }

    static async deleteComment(commentId: string, userId: string): Promise<Result<boolean>> {
        const comment = await QueryCommentsRepository.getCommentById(commentId)
        if (!comment) {
            return {
                code: ResultCode.NotFound,
                errorMessage: `Comment with ${commentId} not found`
            }
        }

        if (userId !== comment.commentatorInfo.userId) {
            return {
                code: ResultCode.Forbidden,
                errorMessage: "Incorrect user"
            }
        }

        const deleteComment = await CommentsRepository.deleteComment(commentId)
        return {
            code: ResultCode.Success,
            data: deleteComment
        }
    }

}
