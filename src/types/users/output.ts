import {postsType} from "../post/output";

export type userBodyType = {
    login: string
    password: string
    email: string
}

export type userType = {
    id: string
    login: string
    email: string
    createdAt: string
    password: string
}

export type userQueryType ={
    id:string
    login:string
    email:string
    createdAt:string
}

export type userOutputModel = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: Array<userQueryType> | null | void
}