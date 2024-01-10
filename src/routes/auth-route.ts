import {Response, Router} from "express";
import {RequestWithBody} from "../types/common";
import {authValidation} from "../validators/auth-validator";
import {authBodyType} from "../types/auth/output";
import {UsersService} from "../domain/users-service";


export const authRoute = Router({})


authRoute.post('/login', authValidation(), async (req: RequestWithBody<authBodyType>, res: Response) => {

    const loginData = {
        loginOrEmail: req.body.loginOrEmail,
        password: req.body.password
    }

    const checkResult = await UsersService.checkCredential(loginData)

    if (!checkResult) {
        res.sendStatus(401)
        return
    }

   return  res.sendStatus(204)

})



