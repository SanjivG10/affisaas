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
    commissionType: {
      type: String,
      enum: ["percentage", "amount"],
      default: "percentage",
    },
    commissionValue: { type: Number, default: 0 },
    name: { type: String, required: true },
    uniqueLink: { type: String, required: true, unique: true },
    cookieDuration: { type: Number, default: 30 },
  },
  { timestamps: true }
);

affiliateLinkSchema.index({ uniqueLink: 1 }, { unique: true });

export const AffiliateLink = mongoose.model<AffiliateLinkDocument>(
  "AffiliateLink",
  affiliateLinkSchema
);
