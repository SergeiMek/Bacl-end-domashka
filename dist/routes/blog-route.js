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
const blog_service_1 = require("../domain/blog-service");
const queryBlogRepository_1 = require("../repositories/queryBlogRepository");
exports.blogsRoute = (0, express_1.Router)({});
exports.blogsRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sortData = {
        searchNameTerm: req.query.searchNameTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    };
    const foundProducts = yield queryBlogRepository_1.QueryBlogRepository.getBlogs(sortData);
    res.send(foundProducts);
}));
exports.blogsRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield queryBlogRepository_1.QueryBlogRepository.getBlogById(req.params.id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    return res.status(200).send(blog);
}));
exports.blogsRoute.get('/:id/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    };
    const id = req.params.id;
    const blog = yield queryBlogRepository_1.QueryBlogRepository.getBlogById(id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    const posts = yield queryBlogRepository_1.QueryBlogRepository.getPostsByBlogId(id, sortData);
    return res.status(200).send(posts);
}));
/*blogsRoute.post('/:id/posts', authMiddleware, createdPostInBlogValidation(), async (req: RequestWithBodyAndParams<{ id: string }, postDataType>, res: Response) => {
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content

    const blogId = req.params.id

    const blog = await QueryBlogRepository.getBlogById(blogId)


    if (!blog) {
        res.sendStatus(404)
        return
    }

    const createdPostId = await BlogRepository.createPostToBlog(blogId, {title, shortDescription, content})

    const post = await QueryPostRepository.getPostById(createdPostId)
    if (!post) {
        res.sendStatus(404)
        return
    }
    res.status(201).send(post)

})*/
exports.blogsRoute.post('/', auth_middleware_1.authMiddleware, (0, blogs_validator_1.blogPostValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlogData = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    };
    const blog = yield blog_service_1.BlogService.createBlog(newBlogData);
    if (!blog) {
        res.status(400);
        return;
    }
    return res.status(201).send(blog);
}));
exports.blogsRoute.put('/:id', auth_middleware_1.authMiddleware, (0, blogs_validator_1.blogPostValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateParams = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    };
    //let isUpdated = await BlogRepository.updateBlog(req.params.id, updateParams)
    let isUpdated = yield blog_service_1.BlogService.updateBlog(req.params.id, updateParams);
    if (isUpdated) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.blogsRoute.post('/:id/posts', auth_middleware_1.authMiddleware, (0, blogs_validator_1.createdPostInBlogValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, shortDescription, content } = req.body;
    const post = yield blog_service_1.BlogService.creatPostToBlog(id, { title, shortDescription, content });
    if (!post) {
        res.send(404);
        return;
    }
    res.status(201).send(post);
}));
exports.blogsRoute.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deleted = yield blog_repository_1.BlogRepository.deleteBlog(id);
    if (deleted) {
        return res.send(204);
    }
    return res.send(404);
}));
