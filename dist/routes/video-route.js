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
exports.videoRoute = void 0;
const express_1 = require("express");
const output_1 = require("../types/video/output");
const db_1 = require("../db/db");
exports.videoRoute = (0, express_1.Router)({});
//const videos = db.videos
exports.videoRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //res.send(videos)
    const products = yield db_1.videoCollection.find({}).toArray();
    res.send(products);
}));
exports.videoRoute.get('/:id', (req, res) => {
    const id = +req.params.id;
    const video = videos.find((v) => v.id === id);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    res.send(video);
});
exports.videoRoute.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let errors = {
        errorsMessages: []
    };
    let { title, author, availableResolutions } = req.body;
    if (!title || !title.trim() || title.trim().length > 40) {
        errors.errorsMessages.push({ message: "Invalid Title", field: "title" });
    }
    if (!author || !author.trim() || author.trim().length > 20) {
        errors.errorsMessages.push({ message: "Invalid author", field: "author" });
    }
    if (Array.isArray(availableResolutions)) {
        availableResolutions.map((m) => {
            !output_1.AvailableResolutions.includes(m) && errors.errorsMessages.push({
                message: "Invalid availableResolutions",
                field: "availableResolutions"
            });
        });
    }
    else {
        availableResolutions = [];
    }
    if (errors.errorsMessages.length) {
        res.status(400).send(errors);
        return;
    }
    const createdAt = new Date();
    const publicationDate = new Date();
    publicationDate.setDate(createdAt.getDate() + 1);
    const newVideo = {
        id: +(new Date()),
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: availableResolutions
    };
    /* videos.push(newVideo)
     res.status(201).send(newVideo)*/
    const result = yield db_1.videoCollection.insertOne(newVideo);
    res.status(201).send(newVideo);
}));
exports.videoRoute.put('/:id', (req, res) => {
    const id = +req.params.id;
    let errors = {
        errorsMessages: []
    };
    let { title, author, availableResolutions, canBeDownloaded, publicationDate, minAgeRestriction } = req.body;
    if (!title || !title.trim() || title.trim().length > 40) {
        errors.errorsMessages.push({ message: "Invalid Title", field: "title" });
    }
    if (!author || !author.trim() || author.trim().length > 20) {
        errors.errorsMessages.push({ message: "Invalid author", field: "author" });
    }
    if (Array.isArray(output_1.AvailableResolutions)) {
        availableResolutions.map((m) => {
            !output_1.AvailableResolutions.includes(m) && errors.errorsMessages.push({
                message: "Invalid availableResolutions",
                field: "availableResolutions"
            });
        });
    }
    else {
        availableResolutions = [];
    }
    if (typeof canBeDownloaded === "undefined") {
        canBeDownloaded = false;
    }
    if (typeof canBeDownloaded !== "boolean") {
        errors.errorsMessages.push({ message: "Invalid  canBeDownloaded", field: "canBeDownloaded" });
    }
    if (typeof publicationDate !== "string") {
        errors.errorsMessages.push({ message: "Invalid  publicationDate", field: "publicationDate" });
    }
    if (typeof minAgeRestriction !== 'undefined' && typeof minAgeRestriction === 'number') {
        minAgeRestriction < 1 || minAgeRestriction > 18 && errors.errorsMessages.push({
            message: "Invalid minAgeRestriction",
            field: "minAgeRestriction"
        });
    }
    else {
        minAgeRestriction = null;
    }
    if (errors.errorsMessages.length) {
        res.status(400).send(errors);
        return;
    }
    const videoIndex = videos.findIndex(v => v.id === id);
    const video = videos.find(v => v.id === id);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    const updateItem = Object.assign(Object.assign({}, video), { canBeDownloaded,
        minAgeRestriction,
        title,
        author,
        availableResolutions, publicationDate: publicationDate ? publicationDate : video.publicationDate });
    videos.splice(videoIndex, 1, updateItem);
    res.sendStatus(204);
});
exports.videoRoute.delete('/:id', (req, res) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
