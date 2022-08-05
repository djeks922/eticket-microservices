import { NextFunction, Request, Response } from "express";
import { CustomError } from "../exceptions/customError";

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }

  res.status(500).send({
    errors: [{ message: "something went wrong!" }],
  });
};
