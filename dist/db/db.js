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
exports.runDb = exports.commentsCollection = exports.usersCollection = exports.postsCollection = exports.blogsCollection = exports.videosCollection = exports.client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
////MONGO_URL= 'mongodb+srv://serakss19:k65XFMoqDpLc2YXz@express-project.21dn67g.mongodb.net/?retryWrites=true&w=majority'
dotenv_1.default.config();
const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017';
//const mongoURI = process.env.MONGO_URL
if (!mongoURI) {
    throw new Error('! URL doesnt found');
}
exports.client = new mongodb_1.MongoClient(mongoURI);
const db = exports.client.db("blogs");
exports.videosCollection = db.collection("videos");
exports.blogsCollection = db.collection("blogs");
exports.postsCollection = db.collection("posts");
exports.usersCollection = db.collection("users");
exports.commentsCollection = db.collection("comments");
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.connect();
            console.log("Connected successfully to mongo server");
        }
        catch (_a) {
            console.log("Can't connect to db");
            yield exports.client.close();
        }
    });
}
exports.runDb = runDb;
