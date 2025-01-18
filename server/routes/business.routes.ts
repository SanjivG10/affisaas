import express from "express";
import {
  createBusiness,
  getBusinesses,
  getBusinessById,
  updateBusiness,
} from "../controllers/business.controller";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/", auth, createBusiness);
router.get("/", auth, getBusinesses);
router.put("/:id", auth, updateBusiness);
router.get("/:id", auth, getBusinessById);

export default router;
