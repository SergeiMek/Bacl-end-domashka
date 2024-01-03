import {resolveSrv} from "dns";

export type blogsType = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt:string
    isMembership:boolean
}

export type blogOutputModel = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: Array<blogsType> | null
}
