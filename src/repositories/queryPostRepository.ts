import {postsType} from "../types/post/output";


export class QueryPostRepository {

    static mapDbPostToPostOutputModel(DBPost: Array<postsType>):Array<postsType> {

       return  DBPost.map(p => ({
            id: p.id,
            title: p.title,
            shortDescription: p.shortDescription,
            content: p.content,
            blogId: p.blogId,
            blogName: p.blogName,
            createdAt: p.createdAt
        }))

    }
}