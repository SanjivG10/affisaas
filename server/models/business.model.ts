import mongoose from "mongoose";
import { BusinessDocument } from "../types";

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String, required: true },
  commission: { type: Number, required: true },
  category: { type: String, required: true },
  logo: { type: String },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export const Business = mongoose.model<BusinessDocument>(
  "Business",
  businessSchema
);
