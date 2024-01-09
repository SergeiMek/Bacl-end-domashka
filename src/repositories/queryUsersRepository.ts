import {postsCollection, usersCollection} from "../db/db";
import {userOutputModel, userQueryType, userType} from "../types/users/output";
import {sortUserData} from "../types/users/input";


export class QueryUsersRepository {
    static async getUser(sortData: sortUserData): Promise<userOutputModel> {
        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10
        const searchLoginTerm = sortData.searchLoginTerm ?? null
        const searchEmailTerm = sortData.searchEmailTerm ?? null


            const user: Array<userType> = await usersCollection
                .find(searchLoginTerm?{login: searchLoginTerm}:searchEmailTerm?{email:searchEmailTerm}:{})
                .sort({[sortBy]: sortDirection === "asc" ? 1 : "desc", createdAt: sortDirection === "asc" ? 1 : "desc"})
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
            items: this.mapDbUserToPostOutputModel(user)
        }
    }

    static async getUserById(id: string): Promise<userQueryType | null> {
        const user = await usersCollection.findOne({id: id}, {projection: {_id: 0, password: 0}})
        if (!user) {
            return null
        }
        return user
    }

    static mapDbUserToPostOutputModel(DBPost: Array<userType>): Array<userQueryType> {

        return DBPost.map(u => ({
            id: u.id,
            login: u.login,
            email: u.email,
            createdAt: u.createdAt,

        }))

    }
}