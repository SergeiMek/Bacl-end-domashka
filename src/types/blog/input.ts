export type BlogsParams ={
    id:string
}

export type BlogsQueryType = {
    pageNumber?:number
    pageSize?:number
    sortBy?:string
    sortDirection?:'asc' | 'desc'
}

export type BlogsBodyType ={
    name:string
    description:string
    websiteUrl: string
}

export type SortDataType = {
    searchNameTerm?: string
    sortBy?: string
    sortDirection?: 'asc' | 'desc'
    pageNumber?: number
    pageSize?: number
}

export type newBlogDataType ={
    name:string
    description:string
    websiteUrl:string
}
export type postDataType ={
        title:string
        shortDescription:string
        content:string

}