import {usersCollection} from "../db/db";
import {InsertOneResult} from "mongodb";
import {userType} from "../types/users/output";


export class UsersRepository {

    static async createUser(userData: userType): Promise<InsertOneResult<userType>> {
        return  await usersCollection.insertOne(userData)
    }

    static async deleteUser(id: string) {
        const result = await usersCollection.deleteOne({id: id})
        return result.deletedCount === 1
    }
}