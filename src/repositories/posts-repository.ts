import {db} from "../db/db";

import {postBodyType} from "../types/post/output";

export class PostRepository {
    static getAllPosts() {
        return db.posts
    }

    static getPostById(id: string) {
        const post = db.posts.find(b => b.id === id)
        if (!post) {
            return null
        }
        return post
    }

    static createPost(newBlogParam: postBodyType) {
        let {content, shortDescription, title, blogId} = newBlogParam
        const newPost = {
            id: String(+(new Date())),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: ''
        }
        db.posts.push(newPost)
        return newPost
    }

    static updatePost(id: string, postBody: postBodyType) {
        const postIndex = db.posts.findIndex(v => v.id === id)
        let post = db.posts.find(b => b.id === id)
        if (post) {
            const updatePost = {
                ...post,
                /* name: blogBody.name,
                 description: blogBody.description,
                 websiteUrl: blogBody.websiteUrl*/
                ...postBody
            }
            db.posts.splice(postIndex, 1, updatePost)
            return true
        }
        return false
    }

    static deletePost(id: string) {
        for (let i = 0; i < db.posts.length; i++) {
            if (db.posts[i].id === id) {
                db.posts.splice(i, 1)
                return true
            }
        }
        return false
    }

}