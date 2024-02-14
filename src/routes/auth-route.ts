import {Response, Router} from "express";
import {RequestWithBody, RequestWithParams} from "../types/common";
import {authValidation} from "../validators/auth-validator";
import {authBodyType} from "../types/auth/output";
import {UsersService} from "../domain/users-service";
import {jwtService} from "../application/jwt-service";
import {accessTokenGuard} from "../middlewares/auth/access.token.guard";
import {QueryUsersRepository} from "../repositories/queryUsersRepository";


export const authRoute = Router({})

authRoute.get('/me', accessTokenGuard, async (req: any, res: Response) => {
    // @ts-ignore
    const userId = req.user.id as string
    if (!userId) res.sendStatus(401)
    const me = await QueryUsersRepository.getMe(userId)
    res.status(200).send(me)
})

authRoute.post('/login', authValidation(), async (req: RequestWithBody<authBodyType>, res: Response) => {

    const loginData = {
        loginOrEmail: req.body.loginOrEmail,
        password: req.body.password
    }

    const user = await UsersService.checkCredential(loginData)

    if (user) {
        const token = await jwtService.createJWT(user)
        res.status(200).send(token)
    } else {
        res.sendStatus(401)
    }


})



