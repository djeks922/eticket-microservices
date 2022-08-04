import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/user";
import { RequestValidationError } from "../exceptions/requestValidationError";
import { BadRequestError } from "../exceptions/badRequestError";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().notEmpty(),
    body("password").isString().notEmpty().trim().isLength({ min: 3, max: 16 }),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new BadRequestError("User already exist");
      }

      const user = User.build({ email, password });
      await user.save();

      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  }
);

export { router as signUpRouter };
