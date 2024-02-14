import {userType} from "../types/users/output";
import jwt from "jsonwebtoken"

export const jwtService = {
    async createJWT(user: userType) {
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET || '123', {expiresIn: '1h'})

        return {
            accessToken: token
        }
    },
    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, process.env.JWT_SECRET || '123')
            return result.userId
        } catch (error) {
            return null
        }
    }
}