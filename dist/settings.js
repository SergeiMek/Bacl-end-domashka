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
const users_route_1 = require("./routes/users-route");
const auth_route_1 = require("./routes/auth-route");
const comments_route_1 = require("./routes/comments-route");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.delete('/testing/all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const res1 = yield db_1.videosCollection.deleteMany({});
    const res2 = yield db_1.blogsCollection.deleteMany({});
    const res3 = yield db_1.postsCollection.deleteMany({});
    const res4 = yield db_1.usersCollection.deleteMany({});
    res.sendStatus(204);
}));
/*const parserMiddleware = bodyParser({})
app.use(parserMiddleware)*/
exports.app.use('/videos', video_route_1.videoRoute);
exports.app.use('/blogs', blog_route_1.blogsRoute);
exports.app.use('/posts', posts_route_1.postsRoute);
exports.app.use('/users', users_route_1.usersRoute);
exports.app.use('/auth', auth_route_1.authRoute);
exports.app.use('/comments', comments_route_1.commentsRoute);
