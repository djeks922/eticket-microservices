import { CustomError } from "./customError";


export class NotAuthorizedError extends CustomError{
    statusCode = 401;
    message = 'Not Authorized'
    constructor(){
        super('Not Authorized')

        Object.setPrototypeOf(this,NotAuthorizedError.prototype)
    }

    serializeError() {
        return [{message: this.message}]
    }

}