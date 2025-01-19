import { Document } from "mongoose";

export interface UserDocument extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  website?: string;
  domain?: string;
  plan: "free" | "pro" | "enterprise";
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface BusinessDocument extends Document {
  id: string;
  name: string;
  description: string;
  website: string;
  commission: number;
  category: string;
  logo?: string;
  ownerId: string;
  createdAt: Date;
}

export interface AffiliateLinkDocument extends Document {
  id: string;
  businessId: string;
  userId: string;
  link: string;
  createdAt: Date;
  clicks: number;
  conversions: number;
  commisionRate: number;
}

export interface JWTPayload {
  userId: string;
  email: string;
}
