import { CustomError } from "./customError";

export class DatabaseError extends CustomError {
    reason = 'Error connecting to database'
    statusCode = 500;
    
    constructor () {
        super()

        Object.setPrototypeOf(this, DatabaseError.prototype)
    }

    serializeError(){
        return [
            { message: this.reason}
        ]
    }
}