import express from "express";
import { register, login, updateProfile } from "../controllers/auth.controller";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/sign-up", register);
router.post("/sign-in", login);
router.put("/update-profile", auth, updateProfile);

export default router;
