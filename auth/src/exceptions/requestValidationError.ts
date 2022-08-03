import { ValidationError } from "express-validator";
import { CustomError } from "./customError";


// interface CustomError {
//     statusCode: number;
//     serializeError(): {
//         message: string;
//         field?: string;
//     }[]
// }


export class RequestValidationError extends CustomError{
    statusCode = 400;


    constructor(public errors: ValidationError[]){
        super('Request validation error')

        Object.setPrototypeOf(this,RequestValidationError.prototype)
    }

    serializeError(){
        return this.errors.map(err => {
            return {
                message: err.msg,
                field: err.param
            }
        })
    }
    con(){
       return  {asdasdsa: 'asdsad'}
    }
}