"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoute = void 0;
const express_1 = require("express");
const blog_repository_1 = require("../repositories/blog-repository");
const blogs_validator_1 = require("../validators/blogs-validator");
const auth_middleware_1 = require("../middlewares/auth/auth-middleware");
exports.blogRoute = (0, express_1.Router)({});
exports.blogRoute.get('/', (req, res) => {
    res.send(blog_repository_1.BlogRepository.getAllBlogs());
});
exports.blogRoute.get('/:id', (req, res) => {
    const blog = blog_repository_1.BlogRepository.getBlogById(req.params.id);
    if (!blog) {
        res.sendStatus(404);
    }
    return res.send(blog);
});
exports.blogRoute.post('/', auth_middleware_1.authMiddleware, (0, blogs_validator_1.blogPostValidation)(), (req, res) => {
    const newProduct = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    };
    return res.status(201).send(blog_repository_1.BlogRepository.createBlog(newProduct));
});
exports.blogRoute.put('/:id', auth_middleware_1.authMiddleware, (0, blogs_validator_1.blogPostValidation)(), (req, res) => {
    const updateParams = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    };
    let isUpdated = blog_repository_1.BlogRepository.updateBlog(req.params.id, updateParams);
    if (isUpdated) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.blogRoute.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => {
    const id = req.params.id;
    const deleted = blog_repository_1.BlogRepository.deleteBlog(id);
    if (deleted) {
        res.send(204);
    }
    res.send(404);
});
