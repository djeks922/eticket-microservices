import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../exceptions/notAuthorizddError";

interface JwtPayload{
    id: string;
    email: string;
}

declare global{
    namespace Express{
        interface Request{
            user?: JwtPayload
        }
    }
}

export const authMiddleware = async (
  req: Request ,
  res: Response,
  next: NextFunction
) => {
  try {
    if(!req.session?.jwt){
        return next(new NotAuthorizedError())
    }

    const payload = jwt.verify(req.session.jwt,process.env.JWT_KEY!) as JwtPayload
    req.user = payload
    next()
  } catch (error) {
    next(error);
  }
};
