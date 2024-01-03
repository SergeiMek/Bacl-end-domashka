import {newBlogDataType, postDataType} from "../types/blog/input";
import {BlogRepository} from "../repositories/blog-repository";
import {PostRepository} from "../repositories/posts-repository";

export class BlogService {
    static async createBlog(newBlogData: newBlogDataType) {
         await BlogRepository.createBlog(newBlogData)
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