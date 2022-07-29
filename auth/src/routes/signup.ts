import express from "express";

const router = express.Router();

router.post("/api/users/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || typeof email !== "string") {
    res.status(400).send({ message: "Email invalid", status: 400 });
  }

  res.send({email,password});
});

export { router as signUpRouter };
