import {BlogsBodyType, newBlogDataType, postDataType} from "../types/blog/input";
import {BlogRepository} from "../repositories/blog-repository";
import {QueryBlogRepository} from "../repositories/queryBlogRepository";
import {QueryPostRepository} from "../repositories/queryPostRepository";

export class BlogService {
    static async createBlog(newBlogData: newBlogDataType) {
        const newBlog = {
            id: String(+(new Date())),
            name: newBlogData.name,
            description: newBlogData.description,
            websiteUrl: newBlogData.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        await BlogRepository.createBlog(newBlog)
        return await QueryBlogRepository.getBlogById(newBlog.id)

    }
    static async creatPostToBlog(blogId:string,postData:postDataType) {
        const post={
            title: postData.title,
            shortDescription: postData.shortDescription,
            content: postData.content,
            blogId: blogId
        }

        const blog = await QueryBlogRepository.getBlogById(blogId)

        if (!blog) {
            return null
        }
        const createdPostId = await BlogRepository.createPostToBlog(blogId, post)
        return  await QueryPostRepository.getPostById(createdPostId)

    }
    static async updateBlog(id:string,updateParams:BlogsBodyType){
        return await BlogRepository.updateBlog(id, updateParams)
    }
}


