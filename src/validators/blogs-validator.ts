import {body} from "express-validator";
import {inputModelValidation} from "../middlewares/inputModel/input-model-validation";
import { titleValidation } from "./post-validator";


const nameValidation = body('name').isString().trim().isLength({min: 1, max: 15}).withMessage('Incorrect name!')
const descriptionValidation = body('description').isString().trim().isLength({min: 1, max: 500}).withMessage('Incorrect description!')
const websiteUrlValidation = body('websiteUrl').isString().trim().isLength({min: 1, max: 100})
    .matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$').withMessage('Incorrect websiteUrl!')


const shortDescriptionValidation = body('shortDescription').isString().trim().isLength({min: 1, max: 100}).withMessage('Incorrect shortDescription!')
const contentValidation = body('content').isString().trim().isLength({min: 1, max: 1000}).withMessage('Incorrect content!')

export const blogPostValidation = () => [  websiteUrlValidation,descriptionValidation,nameValidation, inputModelValidation]
export const createdPostInBlogValidation = () => [  titleValidation,shortDescriptionValidation,contentValidation, inputModelValidation]