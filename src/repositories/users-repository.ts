import {usersCollection} from "../db/db";
import {InsertOneResult} from "mongodb";
import {userType} from "../types/users/output";
import {authBodyType} from "../types/auth/output";


export class UsersRepository {

    static async createUser(userData: userType): Promise<InsertOneResult<userType>> {
        return await usersCollection.insertOne(userData)
    }

    static async deleteUser(id: string) {
        const result = await usersCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }

    static async findByLoginOrEmail(loginOrEmail: string): Promise<userType | null> {
        const user = await usersCollection.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]})
        return user
    }
}