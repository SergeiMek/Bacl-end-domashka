import {NextFunction, Request, Response} from "express";
import {jwtService} from "../../application/jwt-service";
import {QueryUsersRepository} from "../../repositories/queryUsersRepository";

export const accessTokenGuard = async (req:any, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        res.send(401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]
    const userId = await jwtService.getUserIdByToken(token)
    if (userId) {
        req.user = await QueryUsersRepository.getUserById(userId)
        next()

    }else{
        res.send(401)
    }

}