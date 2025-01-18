"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Copy, ExternalLink } from "lucide-react";
import { AffiliateLink } from "@/types";

const dummyLinks: AffiliateLink[] = [
  {
    id: "1",
    businessId: "1",
    userId: "user1",
    code: "TECHPRO15",
    createdAt: new Date(),
    clicks: 150,
    conversions: 12,
  },
  // Add more dummy links
];

export default function Affiliates() {
  const [newLinkUrl, setNewLinkUrl] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Affiliate Links</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Link
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Affiliate Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              type="url"
              placeholder="Enter destination URL"
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
              className="flex-1"
            />
            <Button>Generate Link</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {dummyLinks.map((link) => (
          <Card key={link.id}>
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">Code: {link.code}</span>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  Created: {link.createdAt.toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="font-semibold">{link.clicks}</div>
                  <div className="text-sm text-gray-500">Clicks</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{link.conversions}</div>
                  <div className="text-sm text-gray-500">Conversions</div>
                </div>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
