// need to create a model for the conversion (amount, date, affiliate, business)

import { Schema, model } from "mongoose";

const conversionSchema = new Schema(
  {
    amount: Number,
    affiliate: String,
    orderId: String,
    business: String,
  },
  { timestamps: true }
);

export const Conversion = model("Conversion", conversionSchema);
