import mongoose from "mongoose";
import { AffiliateLinkDocument } from "../types";

const affiliateLinkSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    link: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    commisionRate: { type: Number, default: 0 },
    // we need to add orderId
  },
  { timestamps: true }
);

export const AffiliateLink = mongoose.model<AffiliateLinkDocument>(
  "AffiliateLink",
  affiliateLinkSchema
);
