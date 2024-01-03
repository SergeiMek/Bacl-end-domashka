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
exports.PostRepository = void 0;
const db_1 = require("../db/db");
class PostRepository {
    /* static getPostById(id: string) {
         const post = postsCollection.findOne({id: id}, {projection: {_id: 0}})
         if (!post) {
             return null
         }
         return post
     }*/
    static createPost(newBlogParam) {
        return __awaiter(this, void 0, void 0, function* () {
            let { content, shortDescription, title, blogId } = newBlogParam;
            const newPost = {
                id: String(+(new Date())),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: '',
                createdAt: new Date().toISOString()
            };
            const result = yield db_1.postsCollection.insertOne(newPost);
            return {
                id: newPost.id,
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                blogId: newPost.blogId,
                blogName: '',
                createdAt: newPost.createdAt
            };
        });
    }
    static updatePost(id, postBody) {
        return __awaiter(this, void 0, void 0, function* () {
            //const postIndex = db.posts.findIndex(v => v.id === id)
            const post = db_1.postsCollection.findOne({ id: id });
            if (post) {
                const updatePost = Object.assign(Object.assign({}, post), postBody);
                let result = yield db_1.postsCollection.updateOne({ id: id }, { $set: updatePost });
                if (result.matchedCount === 1) {
                    return true;
                }
            }
            return false;
        });
    }
    static deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    }
}
exports.PostRepository = PostRepository;
