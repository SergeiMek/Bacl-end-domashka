import {BlogsBodyType, postDataType, SortDataType} from "../types/blog/input";
import {blogsCollection, postsCollection, videosCollection} from "../db/db";
import {blogsType} from "../types/blog/output";
import {blogsRoute} from "../routes/blog-route";
import {InsertOneResult} from "mongodb";
import {QueryBlogRepository} from "./queryBlogRepository";


export class BlogRepository {

    static async createBlog(newBlogParam: BlogsBodyType): Promise<InsertOneResult<blogsType>> {

        const newBlog = {
            id: String(+(new Date())),
            name: newBlogParam.name,
            description: newBlogParam.description,
            websiteUrl: newBlogParam.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        return await blogsCollection.insertOne(newBlog)
    }

    static async updateBlog(id: string, blogBody: BlogsBodyType): Promise<boolean> {
        const blog = await blogsCollection.findOne({id: id})
        if (blog) {
            const updateBlog = {
                ...blog,
                ...blogBody
            }
            const result = await blogsCollection.updateOne({id: id}, {$set: updateBlog})
            if (result.matchedCount === 1) {
                return true
            }
        }
        return false
    }

    static async createPostToBlog(blogId: string, postData: postDataType) {
        const blog = await QueryBlogRepository.getBlogById(blogId)

        const post = {
            id: String(+(new Date())),
            title: postData.title,
            shortDescription: postData.shortDescription,
            content: postData.content,
            blogId: blogId,
            blogName: blog!.name,
            createdAt: new Date().toISOString()
        }

        const res = await postsCollection.insertOne(post)
        return post.id
    }

    static async deleteBlog(id: string) {
        const result = await blogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
}