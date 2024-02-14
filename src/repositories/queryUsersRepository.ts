import {usersCollection} from "../db/db";
import {meQueryType, userOutputModel, userQueryType, userType} from "../types/users/output";
import {sortUserData} from "../types/users/input";


export class QueryUsersRepository {
    static async getUser(sortData: sortUserData): Promise<userOutputModel> {
        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10
        const searchLoginTerm = sortData.searchLoginTerm ?? null
        const searchEmailTerm = sortData.searchEmailTerm ?? null

        let filter = {}

        if (searchLoginTerm) {
            filter = {
                login: {
                    $regex: searchLoginTerm,
                    $options: 'i'
                }
            }
        }
        if (searchEmailTerm) {
            filter = {
                email: {
                    $regex: searchEmailTerm,
                    $options: 'i'
                }
            }
        }
        if (searchEmailTerm && searchLoginTerm) {
            filter = {
                $or: [{
                    email: {
                        $regex: searchEmailTerm,
                        $options: 'i'
                    }
                },
                    {
                        login: {
                            $regex: searchLoginTerm,
                            $options: 'i'
                        }
                    }]


            }
        }

        const user: Array<userType> = await usersCollection
            .find(filter)
            .sort({[sortBy]: sortDirection === "asc" ? 1 : "desc", createdAt: sortDirection === "asc" ? 1 : "desc"})
            .skip((+pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray()


        const totalCount = await usersCollection.countDocuments(filter)

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
        const user = await usersCollection.findOne({id: id}, {projection: {_id: 0, passwordSalt: 0, passwordHash: 0}})
        if (!user) {
            return null
        }
        return user
    }

    static async getMe(id: string): Promise<meQueryType | null> {
        const user = await usersCollection.findOne({id: id})
        if (!user) {
            return null
        }
        return {
            email: user.email,
            login: user.login,
            userId: user.id
        }
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