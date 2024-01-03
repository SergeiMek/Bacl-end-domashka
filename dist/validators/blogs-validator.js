"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createdPostInBlogValidation = exports.blogPostValidation = void 0;
const express_validator_1 = require("express-validator");
const input_model_validation_1 = require("../middlewares/inputModel/input-model-validation");
const post_validator_1 = require("./post-validator");
const nameValidation = (0, express_validator_1.body)('name').isString().trim().isLength({ min: 1, max: 15 }).withMessage('Incorrect name!');
const descriptionValidation = (0, express_validator_1.body)('description').isString().trim().isLength({ min: 1, max: 500 }).withMessage('Incorrect description!');
const websiteUrlValidation = (0, express_validator_1.body)('websiteUrl').isString().trim().isLength({ min: 1, max: 100 })
    .matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$').withMessage('Incorrect websiteUrl!');
const shortDescriptionValidation = (0, express_validator_1.body)('shortDescription').isString().trim().isLength({ min: 1, max: 100 }).withMessage('Incorrect shortDescription!');
const contentValidation = (0, express_validator_1.body)('content').isString().trim().isLength({ min: 1, max: 1000 }).withMessage('Incorrect content!');
const blogPostValidation = () => [websiteUrlValidation, descriptionValidation, nameValidation, input_model_validation_1.inputModelValidation];
exports.blogPostValidation = blogPostValidation;
const createdPostInBlogValidation = () => [post_validator_1.titleValidation, shortDescriptionValidation, contentValidation, input_model_validation_1.inputModelValidation];
exports.createdPostInBlogValidation = createdPostInBlogValidation;
