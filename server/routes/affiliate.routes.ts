import express from "express";
import {
  createAffiliateLink,
  getAffiliateLinks,
  trackClick,
  trackConversion,
} from "../controllers/affiliate.controller";
import { auth } from "../middleware/auth";
import { conversionRateLimit } from "../middleware/rate-limit";

const router = express.Router();

router.get("/", auth, getAffiliateLinks);
router.post("/", auth, createAffiliateLink);
router.post("/:code/click", trackClick);
router.post("/:code/convert", conversionRateLimit, trackConversion);

export default router;
