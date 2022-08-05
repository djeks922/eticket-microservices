import express from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = express.Router();

router.get("/api/users/currentuser", authMiddleware, async (req, res) => {
  res.send({ currentUser: req.user });
});

export { router as currentUserRouter };
