import {blogsType} from "../blog/output";

export type postsType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt:string
}

export type postBodyType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export type postOutputModel = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: Array<postsType> | null | void
}