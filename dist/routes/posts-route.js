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
exports.postsRoute = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
const auth_middleware_1 = require("../middlewares/auth/auth-middleware");
const post_validator_1 = require("../validators/post-validator");
const queryPostRepository_1 = require("../repositories/queryPostRepository");
exports.postsRoute = (0, express_1.Router)({});
exports.postsRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sortData = {
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection
    };
    return yield queryPostRepository_1.QueryPostRepository.getPosts(sortData);
}));
exports.postsRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield queryPostRepository_1.QueryPostRepository.getPostById(req.params.id);
    if (!post) {
        res.send(404);
        return;
    }
    return res.send(post);
}));
exports.postsRoute.post('/', auth_middleware_1.authMiddleware, (0, post_validator_1.postValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId
    };
    return res.status(201).send(yield posts_repository_1.PostRepository.createPost(newPost));
}));
exports.postsRoute.put('/:id', auth_middleware_1.authMiddleware, (0, post_validator_1.postValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId
    };
    let isUpdated = yield posts_repository_1.PostRepository.updatePost(req.params.id, newPost);
    if (isUpdated) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.postsRoute.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deleted = yield posts_repository_1.PostRepository.deletePost(id);
    if (deleted) {
        return res.send(204);
    }
    return res.send(404);
}));
