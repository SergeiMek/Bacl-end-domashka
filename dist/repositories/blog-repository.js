"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRepository = void 0;
const db_1 = require("../db/db");
const queryBlogRepository_1 = require("./queryBlogRepository");
class BlogRepository {
    static createBlog(newBlogParam) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: String(+(new Date())),
                name: newBlogParam.name,
                description: newBlogParam.description,
                websiteUrl: newBlogParam.websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            return yield db_1.blogsCollection.insertOne(newBlog);
        });
    }
    static updateBlog(id, blogBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogsCollection.findOne({ id: id });
            if (blog) {
                const updateBlog = Object.assign(Object.assign({}, blog), blogBody);
                const result = yield db_1.blogsCollection.updateOne({ id: id }, { $set: updateBlog });
                if (result.matchedCount === 1) {
                    return true;
                }
            }
            return false;
        });
    }
    static createPostToBlog(blogId, postData) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield queryBlogRepository_1.QueryBlogRepository.getBlogById(blogId);
            const post = {
                id: String(+(new Date())),
                title: postData.title,
                shortDescription: postData.shortDescription,
                content: postData.content,
                blogId: blogId,
                blogName: blog.name,
                createdAt: new Date().toISOString()
            };
            const res = yield db_1.postsCollection.insertOne(post);
            return post.id;
        });
    }
    static deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    }
}
exports.BlogRepository = BlogRepository;
