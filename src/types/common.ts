import {Request} from "express";

export type RequestWithParams<P> = Request<P, {}, {}, {}>
export type RequestWithParamsAndQuery<P,Q> = Request<P, {}, {}, Q>
export type RequestWithBody<B> = Request<{}, {}, B, {}>
export type RequestWithBodyAndParams<P, B> = Request<P, {}, B, {}>
export type RequestTypeWithQuery<Q> = Request<{}, {}, {}, Q>

export type errorType = {
    errorsMessages: ErrorMessageType[]
}

type ErrorMessageType = {
    field: string
    message: string
}