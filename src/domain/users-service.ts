import {QueryBlogRepository} from "../repositories/queryBlogRepository";

import {UsersRepository} from "../repositories/users-repository";
import {userBodyType} from "../types/users/output";
import {QueryUsersRepository} from "../repositories/queryUsersRepository";
import {authBodyType} from "../types/auth/output";

export class UsersService {
    static async createUser(newUserData: userBodyType) {
        const newUser = {
            id: String(+(new Date())),
            login: newUserData.login,
            email: newUserData.email,
            createdAt: new Date().toISOString(),
            password: newUserData.password
        }
        await UsersRepository.createUser(newUser)
        return await QueryUsersRepository.getUserById(newUser.id)

    }
   static async checkCredential(loginData:authBodyType){
        const user = await UsersRepository.findByLoginOrEmail(loginData.loginOrEmail)
       if(!user) return false
       if(user.password !== loginData.password){
           return false
       }
       return true

   }
}


