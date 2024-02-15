import {body, param} from "express-validator";
import {QueryPostRepository} from "../repositories/queryPostRepository";
import {inputModelValidation} from "../middlewares/inputModel/input-model-validation";


const incorrectPostIdValidation = param('id').isString().trim().custom(async (value) => {
    const post =await QueryPostRepository.getPostById(value)
debugger
    if (!post) {
        throw new Error("Incorrect postId")
    }
    return true
}).withMessage("Incorrect postId")


export const contendValidation = body('content').isString().trim().isLength({min: 20, max: 300}).withMessage('Incorrect comment!')
export const commentValidation = ()=>[incorrectPostIdValidation,contendValidation,inputModelValidation]
//export const commentValidation = ()=>[contendValidation,inputModelValidation]
export const updateCommentValidation = ()=>[contendValidation,inputModelValidation]


