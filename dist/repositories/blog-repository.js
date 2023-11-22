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
class BlogRepository {
    static getAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            //return blogsCollection.find({}).toArray()
            const result = yield db_1.blogsCollection.find({}).toArray();
            return result.map(m => ({
                id: m.id,
                name: m.name,
                description: m.description,
                websiteUrl: m.websiteUrl,
                createdAt: m.createdAt,
                isMembership: m.isMembership
            }));
        });
    }
    static getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogsCollection.findOne({ id: id });
            if (!blog) {
                return null;
            }
            return {
                id: blog.id,
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt,
                isMembership: blog.isMembership
            };
        });
    }
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
            const result = yield db_1.blogsCollection.insertOne(newBlog);
            return newBlog;
        });
    }
    static updateBlog(id, blogBody) {
        return __awaiter(this, void 0, void 0, function* () {
            //const blogIndex = db.blogs.findIndex(v => v.id === id)
            //let blog = db.blogs.find(b => b.id === id)
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
    static deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.blogsCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    }
}
exports.BlogRepository = BlogRepository;
