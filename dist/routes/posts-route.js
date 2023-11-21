"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRoute = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
const auth_middleware_1 = require("../middlewares/auth/auth-middleware");
const post_validator_1 = require("../validators/post-validator");
exports.postsRoute = (0, express_1.Router)({});
exports.postsRoute.get('/', (req, res) => {
    res.send(posts_repository_1.PostRepository.getAllPosts());
});
exports.postsRoute.get('/:id', (req, res) => {
    const post = posts_repository_1.PostRepository.getPostById(req.params.id);
    if (!post) {
        res.send(404);
    }
    return res.send(post);
});
exports.postsRoute.post('/', auth_middleware_1.authMiddleware, (0, post_validator_1.postValidation)(), (req, res) => {
    const newPost = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId
    };
    return res.status(201).send(posts_repository_1.PostRepository.createPost(newPost));
});
exports.postsRoute.put('/:id', auth_middleware_1.authMiddleware, (0, post_validator_1.postValidation)(), (req, res) => {
    const newPost = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId
    };
    let isUpdated = posts_repository_1.PostRepository.updatePost(req.params.id, newPost);
    if (isUpdated) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.postsRoute.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => {
    const id = req.params.id;
    const deleted = posts_repository_1.PostRepository.deletePost(id);
    if (deleted) {
        res.send(204);
    }
    res.send(404);
});
