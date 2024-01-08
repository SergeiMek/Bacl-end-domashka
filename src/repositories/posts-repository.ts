import {blogsCollection, postsCollection} from "../db/db";

import {postBodyType, postsType} from "../types/post/output";
import {postsRoute} from "../routes/posts-route";

export class PostRepository {

    static async createPost(post:postsType) {
        //let {content, shortDescription, title, blogId} = newBlogParam
        /*const newPost = {
            id: String(+(new Date())),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: '',
            createdAt: new Date().toISOString()
        }*/
        const result = await postsCollection.insertOne(post)
        /*return {
            id: newPost.id,
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: '',
            createdAt: newPost.createdAt
        }*/
        return result
    }

    static async updatePost(id:string,updatePost:any) {
        //const postIndex = db.posts.findIndex(v => v.id === id)
       /* const post = postsCollection.findOne({id: id})
        if (post) {
            const updatePost = {
                ...post,
                /!* name: blogBody.name,
                 description: blogBody.description,
                 websiteUrl: blogBody.websiteUrl*!/
                ...postBody
            }
            let result = await postsCollection.updateOne({id: id}, {$set: updatePost})
            if (result.matchedCount === 1) {
                return true
            }
        }
        return false*/
        return await postsCollection.updateOne({id: id}, {$set: updatePost})
    }


    static async deletePost(id: string) {
        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
}