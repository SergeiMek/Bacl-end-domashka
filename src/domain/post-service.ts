import {BlogsBodyType, newBlogDataType, postDataType} from "../types/blog/input";
import {BlogRepository} from "../repositories/blog-repository";
import {QueryBlogRepository} from "../repositories/queryBlogRepository";
import {QueryPostRepository} from "../repositories/queryPostRepository";
import {postBodyType} from "../types/post/output";
import {PostRepository} from "../repositories/posts-repository";
import {postsCollection} from "../db/db";

export class PostService {
    static async createPost(newPost: postBodyType) {
        const post = {
            id: String(+(new Date())),
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: '',
            createdAt: new Date().toISOString()
        }
        await PostRepository.createPost(post)
        return await QueryPostRepository.getPostById(post.id)

    }
    static async updatePost(postId:string,postData:postDataType) {

        const post = QueryPostRepository.getPostById(postId)
        if (post) {
            const updatePost = {
                ...post,
                ...postData
            }
            let result = await PostRepository.updatePost(postId,updatePost)
            if (result.matchedCount === 1) {
                return true
            }
    }
        return false
    }

}


