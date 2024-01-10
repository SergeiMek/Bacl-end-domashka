import {body} from "express-validator";
import {BlogRepository} from "../repositories/blog-repository";
import {inputModelValidation} from "../middlewares/inputModel/input-model-validation";
import {QueryBlogRepository} from "../repositories/queryBlogRepository";


export const loginOrEmailValidation = body('loginOrEmail').isString().withMessage('loginOrEmail')
const passwordValidation = body('password').isString().withMessage('password')


export const authValidation = () => [loginOrEmailValidation,passwordValidation, inputModelValidation]