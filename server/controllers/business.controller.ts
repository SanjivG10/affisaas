import { Request, Response } from "express";
import { Business } from "../models/business.model";

export const createBusiness = async (req: Request, res: Response) => {
  try {
    const { name, description, website, commission, category, logo } = req.body;
    const ownerId = req.user?.userId;

    const business = new Business({
      name,
      description,
      website,
      commission,
      category,
      logo,
      ownerId,
    });

    await business.save();
    res.status(201).json(business);
  } catch (error) {
    res.status(500).json({ error: "Error creating business", msg: error });
  }
};

export const getBusinesses = async (req: Request, res: Response) => {
  try {
    const businesses = await Business.find().populate("ownerId", "name email");
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ error: "Error fetching businesses", msg: error });
  }
};

export const getBusinessById = async (req: Request, res: Response) => {
  try {
    const business = await Business.findById(req.params.id).populate(
      "ownerId",
      "name email"
    );

    if (!business) {
      res.status(404).json({ error: "Business not found" });
      return;
    }

    res.json(business);
  } catch (error) {
    res.status(500).json({ error: "Error fetching business", msg: error });
  }
};

export const updateBusiness = async (req: Request, res: Response) => {
  try {
    const { name, description, website, commission, category, logo } = req.body;
    const business = await Business.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user?.userId },
      { name, description, website, commission, category, logo },
      { new: true }
    );

    if (!business) {
      res.status(404).json({ error: "Business not found" });
      return;
    }

    res.json(business);
  } catch (error) {
    res.status(500).json({ error: "Error updating business", msg: error });
  }
};
