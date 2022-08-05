import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../exceptions/badRequestError";
import { validateRequest } from "../middlewares/validateRequest";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from 'jsonwebtoken'
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().notEmpty(),
    body("password").isString().notEmpty().trim(),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new BadRequestError("Email is not valid");
      }

      const isValid = await Password.compare(user.password, password);
      console.log(isValid);
      if (!isValid) {
        throw new BadRequestError("Password is not valid");
      }
      
      const userJwt = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_KEY!
      );

      req.session = { jwt: userJwt };

      res.send(user);
    } catch (error) {
      next(error);
    }
  }
);

export { router as signInRouter };
