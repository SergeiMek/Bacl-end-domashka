import {userQueryType} from "../users/output";


export type commentsType = {
    id: string
    content: string
    commentatorInfo: {
        userId: string
        userLogin: string
    },
    createdAt:string
    postId:string
}

export type commentsOutputModel = {
    id: string
    content: string
    commentatorInfo: {
        userId: string
        userLogin: string
    },
    createdAt:string
}
