import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating user", msg: error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in", msg: error });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, businessName, domain } = req.body;
    const userId = req.user?.userId;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, businessName, domain },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error updating profile", msg: error });
  }
};
