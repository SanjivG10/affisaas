// need to create a model for the conversion (amount, date, affiliate, business)

import { Schema, model } from "mongoose";

const conversionSchema = new Schema(
  {
    amount: { type: Number, required: true },
    affiliateCode: { type: String, required: true },
    business: { type: Schema.Types.ObjectId, ref: "Business", required: true },
    orderId: { type: String, required: true },
    cookieId: { type: String, required: true },
    customerIdentifier: { type: String, required: true },
    isProcessed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Conversion = model("Conversion", conversionSchema);
