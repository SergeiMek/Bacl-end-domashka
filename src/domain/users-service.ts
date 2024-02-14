import {UsersRepository} from "../repositories/users-repository";
import {userBodyType} from "../types/users/output";
import {QueryUsersRepository} from "../repositories/queryUsersRepository";
import {authBodyType} from "../types/auth/output";
import bcrypt from 'bcryptjs'

export class UsersService {
    static async createUser(newUserData: userBodyType) {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(newUserData.password, passwordSalt)

        const newUser = {
            id: String(+(new Date())),
            login: newUserData.login,
            email: newUserData.email,
            createdAt: new Date().toISOString(),
            passwordSalt,
            passwordHash
        }
        await UsersRepository.createUser(newUser)
        return await QueryUsersRepository.getUserById(newUser.id)

    }

    static async checkCredential(loginData: authBodyType) {
        const user = await UsersRepository.findByLoginOrEmail(loginData.loginOrEmail)
        if (!user) return false
        const passwordHash = await this._generateHash(loginData.password,user.passwordSalt)
        if (user.passwordHash !== passwordHash) {
            return false
        }
        return user

    }

    static async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    }
}


