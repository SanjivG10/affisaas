import rateLimit from "express-rate-limit";

export const conversionRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many conversion attempts, please try again later",
});
