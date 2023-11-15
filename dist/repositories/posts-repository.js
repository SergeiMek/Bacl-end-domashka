"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const db_1 = require("../db/db");
class PostRepository {
    static getAllPosts() {
        return db_1.db.posts;
    }
    static getPostById(id) {
        const post = db_1.db.posts.find(b => b.id === id);
        if (!post) {
            return null;
        }
        return post;
    }
    static createPost(newBlogParam) {
        let { content, shortDescription, title, blogId } = newBlogParam;
        const newPost = {
            id: String(+(new Date())),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: ''
        };
        db_1.db.posts.push(newPost);
        return newPost;
    }
    static updatePost(id, postBody) {
        const postIndex = db_1.db.posts.findIndex(v => v.id === id);
        let post = db_1.db.posts.find(b => b.id === id);
        if (post) {
            const updatePost = Object.assign(Object.assign({}, post), postBody);
            db_1.db.posts.splice(postIndex, 1, updatePost);
            return true;
        }
        return false;
    }
    static deletePost(id) {
        for (let i = 0; i < db_1.db.posts.length; i++) {
            if (db_1.db.posts[i].id === id) {
                db_1.db.posts.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}
exports.PostRepository = PostRepository;
