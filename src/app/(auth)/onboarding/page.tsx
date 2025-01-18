"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Globe, Building } from "lucide-react";

export default function Onboarding() {
  const [website, setWebsite] = useState("");
  const [domain, setDomain] = useState("");
  const [businessName, setBusinessName] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[600px]">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">
            Complete Your Profile
          </h2>
          <p className="text-center text-gray-500">
            Tell us about your business
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Building className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Business Name"
                className="pl-8"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Globe className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
              <Input
                type="url"
                placeholder="Website URL"
                className="pl-8"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Globe className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Domain"
                className="pl-8"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Complete Setup</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
