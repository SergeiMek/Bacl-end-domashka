import {BlogsBodyType} from "../types/blog/input";
import {blogsCollection, videosCollection} from "../db/db";
import {blogsType} from "../types/blog/output";
import {blogsRoute} from "../routes/blog-route";


export class BlogRepository {
    static async getAllBlogs(): Promise<Array<blogsType>> {
        //return blogsCollection.find({}).toArray()
        const result = await blogsCollection.find({}).toArray()
        return result.map(m => ({
            id: m.id,
            name: m.name,
            description: m.description,
            websiteUrl: m.websiteUrl,
            createdAt: m.createdAt,
            isMembership: m.isMembership

        }))
    }

    static async getBlogById(id: string): Promise<blogsType | null> {
        const blog = await blogsCollection.findOne({id: id})
        if (!blog) {
            return null
        }
        return {
            id: blog.id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
    }

    static async createBlog(newBlogParam: BlogsBodyType): Promise<blogsType> {

        const newBlog = {
            id: String(+(new Date())),
            name: newBlogParam.name,
            description: newBlogParam.description,
            websiteUrl: newBlogParam.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const result = await blogsCollection.insertOne(newBlog)
        return newBlog
    }

    static async updateBlog(id: string, blogBody: BlogsBodyType): Promise<boolean> {
        //const blogIndex = db.blogs.findIndex(v => v.id === id)
        //let blog = db.blogs.find(b => b.id === id)
        const blog = await blogsCollection.findOne({id: id})
        if (blog) {
            const updateBlog = {
                ...blog,
                /* name: blogBody.name,
                 description: blogBody.description,
                 websiteUrl: blogBody.websiteUrl*/
                ...blogBody
            }
            const result = await blogsCollection.updateOne({id: id}, {$set: updateBlog})
            if (result.matchedCount === 1) {
                return true
            }
        }
        return false
    }

    static async deleteBlog(id: string) {
        const result = await blogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
}