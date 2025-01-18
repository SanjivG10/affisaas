"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Business } from "@/types";

const dummyBusinesses: Business[] = [
  {
    id: "1",
    name: "TechGear Pro",
    description: "Premium tech accessories and gadgets",
    website: "https://techgearpro.com",
    commission: 15,
    category: "Technology",
    logo: "/logos/techgear.png",
  },
  {
    id: "2",
    name: "EcoLife Essentials",
    description: "Sustainable living products",
    website: "https://ecolife.com",
    commission: 20,
    category: "Lifestyle",
    logo: "/logos/ecolife.png",
  },
  // Add more dummy businesses here
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Marketplace</h2>
        <div className="relative w-72">
          <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search businesses..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dummyBusinesses.map((business) => (
          <Card key={business.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div>
                <h3 className="font-semibold">{business.name}</h3>
                <p className="text-sm text-gray-500">{business.category}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                {business.description}
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Commission Rate</span>
                <span className="font-semibold text-green-600">
                  {business.commission}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
