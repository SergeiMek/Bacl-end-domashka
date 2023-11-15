"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRepository = void 0;
const db_1 = require("../db/db");
class BlogRepository {
    static getAllBlogs() {
        return db_1.db.blogs;
    }
    static getBlogById(id) {
        const blog = db_1.db.blogs.find(b => b.id === id);
        if (!blog) {
            return null;
        }
        return blog;
    }
    static createBlog(newBlogParam) {
        const newBlog = {
            id: String(+(new Date())),
            name: newBlogParam.name,
            description: newBlogParam.description,
            websiteUrl: newBlogParam.websiteUrl
        };
        db_1.db.blogs.push(newBlog);
        return newBlog;
    }
    static updateBlog(id, blogBody) {
        const blogIndex = db_1.db.blogs.findIndex(v => v.id === id);
        let blog = db_1.db.blogs.find(b => b.id === id);
        if (blog) {
            const updateBlog = Object.assign(Object.assign({}, blog), blogBody);
            db_1.db.blogs.splice(blogIndex, 1, updateBlog);
            return true;
        }
        return false;
    }
    static deleteBlog(id) {
        for (let i = 0; i < db_1.db.blogs.length; i++) {
            if (db_1.db.blogs[i].id === id) {
                db_1.db.blogs.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}
exports.BlogRepository = BlogRepository;
