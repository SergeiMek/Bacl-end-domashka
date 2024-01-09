import {QueryBlogRepository} from "../repositories/queryBlogRepository";

import {UsersRepository} from "../repositories/users-repository";
import {userBodyType} from "../types/users/output";
import {QueryUsersRepository} from "../repositories/queryUsersRepository";

export class UsersService {
    static async createUser(newUserData: userBodyType) {
        const newUser = {
            id: String(+(new Date())),
            login: newUserData.login,
            email: newUserData.email,
            createdAt: new Date().toISOString(),
            password: newUserData.password
        }
        await UsersRepository.createUser(newUser)
        return await QueryUsersRepository.getUserById(newUser.id)

    }

    /*static async creatPostToBlog(blogId: string, postData: postDataType) {
        const post = {
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
        return await QueryPostRepository.getPostById(createdPostId)

    }

    static async updateBlog(id: string, updateParams: BlogsBodyType) {
        return await BlogRepository.updateBlog(id, updateParams)
    }*/
}


