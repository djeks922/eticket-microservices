import {Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator'
import { RequestValidationError } from '../exceptions/requestValidationError'


export const validateRequest = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        next(new RequestValidationError(errors.array())) 
    }

    next()
}