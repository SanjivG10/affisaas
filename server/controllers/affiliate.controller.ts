import { Request, Response } from "express";
import { AffiliateLink } from "../models/affiliateLink.model";
import { Business } from "../models/business.model";
import { Conversion } from "../models/conversion.model";
import { AffiliateLinkDocument } from "../types";
import TrackingCookie from "../models/trackingCookie.model";

export const createAffiliateLink = async (req: Request, res: Response) => {
  try {
    const { businessId } = req.body;
    const userId = req.user?.userId;

    const business = await Business.findById(businessId);
    if (!business) {
      res.status(404).json({ error: "Business not found" });
      return;
    }

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const code = generateAffiliateCode(business.name);
    const affiliateLink = new AffiliateLink({
      businessId,
      userId,
      code,
    });

    await affiliateLink.save();
    res.status(201).json(affiliateLink);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating affiliate link", msg: error });
  }
};

export const getAffiliateLinks = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const links = await AffiliateLink.find({ userId })
      .populate("businessId")
      .sort({ createdAt: -1 });

    res.json(links);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching affiliate links", msg: error });
  }
};

// controllers/affiliate.controller.ts

export const trackClick = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const { trackingId, customerId } = req.body;

    const affiliateLink = await AffiliateLink.findOneAndUpdate(
      { code },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!affiliateLink) {
      res.status(404).json({ error: "Affiliate link not found" });
      return;
    }

    // Create tracking cookie record
    const trackingCookie = new TrackingCookie({
      cookieId: trackingId,
      affiliateCode: code,
      customerIdentifier: customerId,
      expiresAt: new Date(Date.now() + affiliateLink.cookieDuration * 1000),
    });

    await trackingCookie.save();

    res.cookie(
      "affiliate_tracking",
      {
        trackingId,
        customerId,
      },
      {
        maxAge: affiliateLink.cookieDuration * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      }
    );

    res.json({
      success: true,
      message: "Click tracked successfully",
    });
  } catch (error) {
    console.error("Click tracking error:", error);
    res.status(500).json({ error: "Error tracking click" });
  }
};

export const trackConversion = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const { orderId, orderAmount, cookieId, customerIdentifier } = req.body;

    if (!cookieId || !customerIdentifier || !orderId) {
      res.status(400).json({ error: "Missing required tracking information" });
      return;
    }
    const affiliateLink = await AffiliateLink.findOne({ code });

    if (!affiliateLink) {
      res.status(404).json({ error: "Affiliate link not found" });
      return;
    }

    const existingConversion = await Conversion.findOne({
      orderId,
      affiliateCode: code,
      customerIdentifier,
    });

    if (existingConversion) {
      res.status(409).json({ error: "Conversion already tracked" });
      return;
    }

    const cookieData = await TrackingCookie.findOne({ cookieId });
    if (!cookieData) {
      res.status(400).json({ error: "Invalid tracking cookie" });
      return;
    }

    //
    const cookieDurationInMs =
      (affiliateLink?.cookieDuration ?? 30) * 24 * 60 * 60 * 1000;

    const cookieAge = Date.now() - cookieData.createdAt.getTime();
    if (cookieAge > cookieDurationInMs) {
      res.status(400).json({ error: "Tracking cookie expired" });
      return;
    }

    affiliateLink.conversions++;
    await affiliateLink.save();

    const convertedAmount =
      affiliateLink.commissionType === "percentage"
        ? orderAmount * (affiliateLink?.commisionRate ?? 0)
        : affiliateLink?.commissionValue ?? 0;

    const conversion = new Conversion({
      amount: convertedAmount,
      orderId,
      affiliateCode: code,
      business: affiliateLink?.businessId,
      customerIdentifier,
      cookieId,
    });

    await conversion.save();

    if (!affiliateLink) {
      res.status(404).json({ error: "Affiliate link not found" });
      return;
    }

    res.json({
      message: "Conversion tracked successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Error tracking conversion", msg: error });
  }
};

const generateAffiliateCode = (businessName: string): string => {
  const prefix = businessName
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 5);
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${randomStr}`;
};
