import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError } from "../exceptions/badRequestError";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validateRequest";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().notEmpty(),
    body("password").isString().notEmpty().trim().isLength({ min: 3, max: 16 }),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new BadRequestError("User already exist");
      }

      const user = User.build({ email, password });
      await user.save();

      const userJwt = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_KEY!
      );

      req.session = { jwt: userJwt };

      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  }
);

export { router as signUpRouter };
