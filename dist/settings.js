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
const db_1 = require("./db/db");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.delete('/testing/all-data', (req, res) => {
    db_1.db.videos.splice(0, db_1.db.videos.length);
    res.sendStatus(204);
});
debugger;
exports.app.use('/videos', video_route_1.videoRoute);
exports.app.use('/blogs', blog_route_1.blogRoute);
exports.app.use('/posts', posts_route_1.postsRoute);
