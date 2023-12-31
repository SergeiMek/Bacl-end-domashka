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
exports.postValidation = exports.titleValidation = void 0;
const express_validator_1 = require("express-validator");
const input_model_validation_1 = require("../middlewares/inputModel/input-model-validation");
const queryBlogRepository_1 = require("../repositories/queryBlogRepository");
const blogIdValidation = (0, express_validator_1.body)('blogId').isString().trim().custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield queryBlogRepository_1.QueryBlogRepository.getBlogById(value);
    if (!blog) {
        throw new Error("Incorrect blogId");
    }
    return true;
})).withMessage("Incorrect blogId");
exports.titleValidation = (0, express_validator_1.body)('title').isString().trim().isLength({ min: 1, max: 30 }).withMessage('Incorrect title!');
const shortDescriptionValidation = (0, express_validator_1.body)('shortDescription').isString().trim().isLength({ min: 1, max: 100 }).withMessage('Incorrect shortDescription!');
const contentValidation = (0, express_validator_1.body)('content').isString().trim().isLength({ min: 1, max: 1000 }).withMessage('Incorrect content!');
const postValidation = () => [blogIdValidation, exports.titleValidation, contentValidation, shortDescriptionValidation, input_model_validation_1.inputModelValidation];
exports.postValidation = postValidation;
