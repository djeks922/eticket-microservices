import { CustomError } from "./customError";


export class NotFoundError extends CustomError{
    statusCode = 404;

    constructor(){
        super('Not Founded!')

        Object.setPrototypeOf(this,NotFoundError.prototype)
    }


    serializeError(): { message: string; field?: string | undefined; }[] {
        return [
            {
                message: this.message
            }
        ]
    }

}