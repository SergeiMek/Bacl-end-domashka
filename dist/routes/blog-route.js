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
exports.blogsRoute = void 0;
const express_1 = require("express");
const blog_repository_1 = require("../repositories/blog-repository");
const blogs_validator_1 = require("../validators/blogs-validator");
const auth_middleware_1 = require("../middlewares/auth/auth-middleware");
exports.blogsRoute = (0, express_1.Router)({});
exports.blogsRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProducts = yield blog_repository_1.BlogRepository.getAllBlogs();
    res.send(foundProducts);
}));
exports.blogsRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_repository_1.BlogRepository.getBlogById(req.params.id);
    if (!blog) {
        res.sendStatus(404);
    }
    return res.send(blog);
}));
exports.blogsRoute.post('/', auth_middleware_1.authMiddleware, (0, blogs_validator_1.blogPostValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    };
    const result = yield blog_repository_1.BlogRepository.createBlog(newProduct);
    return res.status(201).send(result);
}));
exports.blogsRoute.put('/:id', auth_middleware_1.authMiddleware, (0, blogs_validator_1.blogPostValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateParams = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    };
    let isUpdated = yield blog_repository_1.BlogRepository.updateBlog(req.params.id, updateParams);
    if (isUpdated) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.blogsRoute.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deleted = yield blog_repository_1.BlogRepository.deleteBlog(id);
    if (deleted) {
        return res.send(204);
    }
    return res.send(404);
}));
