import {sorCommentsData} from "../types/comments/input";
import {blogsCollection, commentsCollection} from "../db/db";
import {commentsOutputModel, commentsType} from "../types/comments/output";
import {blogsType} from "../types/blog/output";


export class QueryCommentsRepository {
    static async getComments(sortData: sorCommentsData,postId:string): Promise<any> {

        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10
        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'
        let filter = {}

        if (postId) {
            filter = {
                postId: {
                    $regex: postId,
                    $options: 'i'
                }
            }
        }

        const comment: Array<commentsType> = await commentsCollection
            .find(filter)
            .sort({[sortBy]: sortDirection === "asc" ? 1 : "desc",createdAt:sortDirection === "asc" ? 1 : "desc"})
            .skip((+pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray()


        const totalCount = await commentsCollection.countDocuments(filter)

        const pageCount = Math.ceil(totalCount / +pageSize)

        return {
            pagesCount: pageCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: this.mapDbCommentsToCommentsOutputModel(comment)
        }
    }

    static async getCommentById(id: string): Promise<commentsOutputModel | null> {
        const comment = await commentsCollection.findOne({id: id})
        if (!comment) {
            return null
        }
        return {
            id: comment.id,
            content: comment.content,
            commentatorInfo:{
                userId:comment.commentatorInfo.userId,
                userLogin:comment.commentatorInfo.userLogin
            },
            createdAt: comment.createdAt
        }
    }

    static mapDbCommentsToCommentsOutputModel(DBPost: Array<commentsType>): Array<commentsOutputModel> {

        return DBPost.map(c => ({
            id: c.id,
            content: c.content,
            commentatorInfo:{
                userId:c.commentatorInfo.userId,
                userLogin:c.commentatorInfo.userLogin
            },
        createdAt: c.createdAt
        }))

    }
}