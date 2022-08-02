import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../exceptions/requestValidationError";
import { DatabaseError } from "../exceptions/databaseError";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().notEmpty(),
    body("password").isString().notEmpty().trim().isLength({min:3,max:16}),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
      throw new RequestValidationError(errors.array())
    }

    const { email, password } = req.body;
    throw new DatabaseError()

    res.send({ email, password });
  }
);

export { router as signUpRouter };
