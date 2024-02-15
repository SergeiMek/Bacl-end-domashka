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
const post_service_1 = require("../domain/post-service");
const comments_validator_1 = require("../validators/comments-validator");
const comments_service_1 = require("../domain/comments-service");
const access_token_guard_1 = require("../middlewares/auth/access.token.guard");
const queryCommentsRepository_1 = require("../repositories/queryCommentsRepository");
exports.postsRoute = (0, express_1.Router)({});
exports.postsRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sortData = {
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection
    };
    const foundProducts = yield queryPostRepository_1.QueryPostRepository.getPosts(sortData);
    return res.status(200).send(foundProducts);
}));
exports.postsRoute.get('/:id/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield queryPostRepository_1.QueryPostRepository.getPostById(req.params.id);
    if (!post)
        return res.sendStatus(404);
    const sortData = {
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection
    };
    const foundProducts = yield queryCommentsRepository_1.QueryCommentsRepository.getComments(sortData, req.params.id);
    return res.status(200).send(foundProducts);
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
    //return res.status(201).send(await PostRepository.createPost(newPost))
    const createdPost = yield post_service_1.PostService.createPost(newPost);
    if (!createdPost) {
        res.send(400);
        return;
    }
    return res.status(201).send(createdPost);
}));
exports.postsRoute.post('/:id/comments', access_token_guard_1.accessTokenGuard, (0, comments_validator_1.commentValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.user.id;
    const content = req.body.content;
    const postId = req.params.id;
    if (!userId)
        return res.sendStatus(401);
    if (!postId) {
        res.send(404);
        return;
    }
    const comment = yield comments_service_1.CommentsService.sendComment(content, userId, postId);
    if (!comment) {
        res.send(400);
        return;
    }
    /*//return res.status(201).send(await PostRepository.createPost(newPost))
    const createdComment = await PostService.createPost(newPost)
    if (!createdComment) {
        res.send(400)
        return
    }*/
    return res.status(201).send(comment);
}));
exports.postsRoute.put('/:id', auth_middleware_1.authMiddleware, (0, post_validator_1.postValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId
    };
    //let isUpdated = await PostRepository.updatePost(req.params.id, newPost)
    let isUpdated = yield post_service_1.PostService.updatePost(req.params.id, newPost);
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
