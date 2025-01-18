export interface User {
  id: string;
  name: string;
  email: string;
  website?: string;
  domain?: string;
  plan: "free" | "pro" | "enterprise";
}

export interface Business {
  id: string;
  name: string;
  description: string;
  website: string;
  commission: number;
  category: string;
  logo?: string;
}

export interface AffiliateLink {
  id: string;
  businessId: string;
  userId: string;
  code: string;
  createdAt: Date;
  clicks: number;
  conversions: number;
}
