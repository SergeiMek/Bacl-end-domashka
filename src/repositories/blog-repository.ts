import {db} from "../db/db";
import {BlogsBodyType} from "../types/blog/input";


export class BlogRepository {
    static getAllBlogs() {
        return db.blogs
    }

    static getBlogById(id: string) {
        const blog = db.blogs.find(b => b.id === id)
        if (!blog) {
            return null
        }
        return blog
    }

    static createBlog(newBlogParam: BlogsBodyType) {

        const newBlog = {
            id: String(+(new Date())),
            name: newBlogParam.name,
            description: newBlogParam.description,
            websiteUrl: newBlogParam.websiteUrl
        }
        db.blogs.push(newBlog)
        return newBlog
    }

    static updateBlog(id: string, blogBody: BlogsBodyType) {
        const blogIndex = db.blogs.findIndex(v => v.id === id)
        let blog = db.blogs.find(b => b.id === id)
        if (blog) {
            const updateBlog = {
                ...blog,
                /* name: blogBody.name,
                 description: blogBody.description,
                 websiteUrl: blogBody.websiteUrl*/
                ...blogBody
            }
            db.blogs.splice(blogIndex, 1, updateBlog)
            return true
        }
        return false
    }

    static deleteBlog(id: string) {
        for (let i = 0; i < db.blogs.length; i++) {
            if (db.blogs[i].id === id) {
                db.blogs.splice(i, 1)
                return true
            }
        }
        return false
    }
}