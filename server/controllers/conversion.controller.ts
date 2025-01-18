import { Request, Response } from "express";
import { Conversion } from "../models/conversion.model";

export const createConversion = async (req: Request, res: Response) => {
  try {
    const { amount, affiliate, business } = req.body;
    const conversion = new Conversion({ amount, affiliate, business });
    await conversion.save();
    res.status(201).json(conversion);
  } catch (error) {
    res.status(500).json({ error: "Error creating conversion", msg: error });
  }
};
