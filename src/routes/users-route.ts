import {Response, Router} from "express";
import {RequestTypeWithQuery, RequestWithBody, RequestWithParams} from "../types/common";
import {UsersService} from "../domain/users-service";
import {userBodyType} from "../types/users/output";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {userValidation} from "../validators/user-validator";
import {UsersRepository} from "../repositories/users-repository";
import {sortUserData} from "../types/users/input";
import {QueryUsersRepository} from "../repositories/queryUsersRepository";


export const usersRoute = Router({})

usersRoute.get('/', async (req: RequestTypeWithQuery<sortUserData>, res: Response): Promise<any> => {
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
        searchLoginTerm: req.query.searchLoginTerm,
        searchEmailTerm: req.query.searchEmailTerm
    }
    const foundProducts = await QueryUsersRepository.getUser(sortData)

    return res.status(200).send(foundProducts)
})

usersRoute.post('/', authMiddleware, userValidation(), async (req: RequestWithBody<userBodyType>, res: Response) => {
    const newUser = {
        login: req.body.login,
        password: req.body.password,
        email: req.body.email
    }
    const createdUser = await UsersService.createUser(newUser)
    if (!createdUser) {
        res.send(400)
        return
    }
    return res.status(201).send(createdUser)
})
usersRoute.delete('/:id', authMiddleware, async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const id = req.params.id
    const deleted = await UsersRepository.deleteUser(id)
    if (deleted) {
        return res.send(204)
    }
    return res.send(404)
})