import express from "express";

const router = express.Router();

router.post("/api/users/signin", (req,res) => {
    res.send('current user signin')
});

export { router as signInRouter };