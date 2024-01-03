import {body} from "express-validator";
import {BlogRepository} from "../repositories/blog-repository";
import {inputModelValidation} from "../middlewares/inputModel/input-model-validation";
import {QueryBlogRepository} from "../repositories/queryBlogRepository";

const blogIdValidation = body('blogId').isString().trim().custom(async (value) => {
    const blog =await QueryBlogRepository.getBlogById(value)

    if (!blog) {
        throw new Error("Incorrect blogId")
    }
    return true
}).withMessage("Incorrect blogId")

export const titleValidation = body('title').isString().trim().isLength({min: 1, max: 30}).withMessage('Incorrect title!')
const shortDescriptionValidation = body('shortDescription').isString().trim().isLength({min: 1, max: 100}).withMessage('Incorrect shortDescription!')
const contentValidation = body('content').isString().trim().isLength({min: 1, max: 1000}).withMessage('Incorrect content!')

export const postValidation = () => [blogIdValidation, titleValidation,contentValidation ,shortDescriptionValidation, inputModelValidation]