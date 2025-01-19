export interface User {
  id: string;
  name: string;
  email: string;
  domain?: string;
  businessName?: string;
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
  createdAt: Date;
  updatedAt: Date;
  link: string;
  clicks: number;
  conversions: number;
  commisionRate: number;
}
