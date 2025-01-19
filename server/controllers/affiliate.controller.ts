import { Request, Response } from "express";
import { AffiliateLink } from "../models/affiliateLink.model";
import { Business } from "../models/business.model";
import { Conversion } from "../models/conversion.model";
import { AffiliateLinkDocument } from "../types";

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

export const trackClick = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const link = await AffiliateLink.findOneAndUpdate(
      { code },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!link) {
      res.status(404).json({ error: "Affiliate link not found" });
      return;
    }

    res.json(link);
  } catch (error) {
    res.status(500).json({ error: "Error tracking click", msg: error });
  }
};

export const trackConversion = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const { orderId, orderAmount } = req.body;
    const affiliateLink = await AffiliateLink.findOneAndUpdate(
      { code },
      { $inc: { conversions: 1 } },
      { new: true }
    );

    const convertedAmount = orderAmount * (affiliateLink?.commisionRate ?? 0);

    const conversion = new Conversion({
      amount: convertedAmount,
      orderId,
      affiliateCode: code,
      business: affiliateLink?.businessId,
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
