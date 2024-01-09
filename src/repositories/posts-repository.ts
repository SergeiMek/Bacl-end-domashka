import {blogsCollection, postsCollection} from "../db/db";

import {postBodyType, postsType} from "../types/post/output";
import {postsRoute} from "../routes/posts-route";

export class PostRepository {

    static async createPost(post:postsType) {

        const result = await postsCollection.insertOne(post)

        return result
    }

    static async updatePost(id:string,updatePost:any) {

        return await postsCollection.updateOne({id: id}, {$set: updatePost})
    }


    static async deletePost(id: string) {
        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
}