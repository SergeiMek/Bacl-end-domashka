import {postOutputModel, postsType} from "../types/post/output";
import {postsCollection} from "../db/db";
import {sorPostData} from "../types/post/input";


export class QueryPostRepository {
    static async getPosts(sortData: sorPostData): Promise<postOutputModel> {

        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10
        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'


        const posts: Array<postsType> = await postsCollection
            .find()
            .sort({[sortBy]: sortDirection === "asc" ? 1 : "desc",createdAt:1})
            .skip((+pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray()


        const totalCount = await postsCollection.countDocuments()

        const pageCount = Math.ceil(totalCount / +pageSize)

        return {
            pagesCount: pageCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: this.mapDbPostToPostOutputModel(posts)
        }
    }

    static async getPostById(id: string): Promise<postsType | null> {
        const post = await postsCollection.findOne({id: id}, {projection: {_id: 0}})
        if (!post) {
            return null
        }
        return post
    }

    static mapDbPostToPostOutputModel(DBPost: Array<postsType>): Array<postsType> {

        return DBPost.map(p => ({
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