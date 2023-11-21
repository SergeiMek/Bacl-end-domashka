"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const video_route_1 = require("./routes/video-route");
const blog_route_1 = require("./routes/blog-route");
const posts_route_1 = require("./routes/posts-route");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
/*app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.videos.splice(0, db.videos.length)
    db.posts.splice(0, db.posts.length)
    db.blogs.splice(0, db.blogs.length)
    res.sendStatus(204)
})*/
exports.app.use('/videos', video_route_1.videoRoute);
exports.app.use('/blogs', blog_route_1.blogRoute);
exports.app.use('/posts', posts_route_1.postsRoute);
