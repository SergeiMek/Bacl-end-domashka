import {commentsOutputModel, commentsType} from "../types/comments/output";
import {commentsCollection, postsCollection} from "../db/db";


export class CommentsRepository {

    static async createComment(comment:commentsType) {
        return await commentsCollection.insertOne(comment)

    }
    static async deleteComment(id:string){
        const result = await commentsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
    static async updateComment(id:string,contend:commentsOutputModel) {

        return await commentsCollection.updateOne({id: id}, {$set: contend})
    }
}