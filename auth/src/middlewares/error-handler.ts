import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../exceptions/requestValidationError";
import { DatabaseError } from "../exceptions/databaseError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }
  if (err instanceof DatabaseError) {
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }
  res.status(500).send({
    errors: [{ message: "something went wrong!" }],
  });
};
