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
    static createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.insertOne(post);
            return result;
        });
    }
    static updatePost(id, updatePost) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.postsCollection.updateOne({ id: id }, { $set: updatePost });
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
