import {BlogsQueryType, SortDataType} from "../types/blog/input";
import {blogsCollection, postsCollection} from "../db/db";
import {blogOutputModel, blogsType} from "../types/blog/output";
import {postOutputModel, postsType} from "../types/post/output";
import {QueryPostRepository} from "./queryPostRepository";


export class QueryBlogRepository {
    static async getBlogs(sortData: SortDataType): Promise<blogOutputModel> {

        const sortDirection = sortData.sortDirection ?? 'desc'
        const sortBy = sortData.sortBy ?? 'createdAt'
        const searchNameTerm = sortData.searchNameTerm ?? null
        const pageSize = sortData.pageSize ?? 10
        const pageNumber = sortData.pageNumber ?? 1

        let filter = {}

        if (searchNameTerm) {
            filter = {
                name: {
                    $regex: searchNameTerm,
                    $options: 'i'
                }
            }
        }

        const blogs: Array<blogsType> = await blogsCollection
            .find(filter)
            .sort({[sortBy === '' ? 'createdAt' : sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip((+pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray()


        const totalCount = await blogsCollection.countDocuments(filter)

        const pageCount = Math.ceil(totalCount / +pageSize)

        //const result = await blogsCollection.find({}, {projection: {_id: 0}}).toArray()
        return {
            pagesCount: pageCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: this._mapDbBlogToBlogOutputModel(blogs)
        }
    }

    static async getBlogById(id: string): Promise<blogsType | null> {
        const blog = await blogsCollection.findOne({id: id}, {projection: {_id: 0}})
        if (!blog) {
            return null
        }
        return blog
    }

    static async getPostsByBlogId(blogId: string, sortData: BlogsQueryType): Promise<postOutputModel> {

        const sortDirection = sortData.sortDirection ?? 'desc'
        const sortBy = sortData.sortBy ?? 'createdAt'
        const pageSize = sortData.pageSize ?? 10
        const pageNumber = sortData.pageNumber ?? 1


        const posts: Array<postsType> = await postsCollection
            .find({blogId: blogId})
            .sort(sortBy, sortDirection)
            .skip((+pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray()


        const totalCount = await postsCollection.countDocuments({blogId: blogId})

        const pageCount = Math.ceil(totalCount / +pageSize)


        return {
            pagesCount: pageCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: QueryPostRepository.mapDbPostToPostOutputModel(posts)
        }
    }

    static _mapDbBlogToBlogOutputModel(DBBlog: Array<blogsType>): Array<blogsType> {

        return DBBlog.map((b) => {
            return {
                id: b.id,
                name: b.name,
                description: b.description,
                websiteUrl: b.websiteUrl,
                createdAt: b.createdAt,
                isMembership: b.isMembership,
            }
        })
    }
}

