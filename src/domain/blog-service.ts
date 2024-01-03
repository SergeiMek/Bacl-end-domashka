import {newBlogDataType, postDataType} from "../types/blog/input";
import {BlogRepository} from "../repositories/blog-repository";
import {PostRepository} from "../repositories/posts-repository";
import {QueryBlogRepository} from "../repositories/queryBlogRepository";

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

        const blog = await BlogRepository.getBlogById(blogId)

        if (!blog) {
            return null
        }
        const id = await PostRepository.createPost(post)/// запрос в бд
        //const post = await queryPostRepository.createPostToBlog(id) ///получает правильные посты

       /* if(!post){
            return null
        }
        return post*/
    }
}