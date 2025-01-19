import mongoose from "mongoose";
import { TrackingCookieDocument } from "../types";

const trackingCookieSchema = new mongoose.Schema({
  cookieId: { type: String, required: true, unique: true },
  affiliateCode: { type: String, required: true },
  customerIdentifier: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const TrackingCookie =
  mongoose.models.TrackingCookie ||
  mongoose.model<TrackingCookieDocument>(
    "TrackingCookie",
    trackingCookieSchema
  );

export default TrackingCookie;
