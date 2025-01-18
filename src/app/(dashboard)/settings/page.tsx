"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/types";

const dummyUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  website: "https://example.com",
  domain: "example.com",
  plan: "pro",
};

export default function Settings() {
  const [user, setUser] = useState(dummyUser);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Settings</h2>

      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Website</label>
            <Input
              type="url"
              value={user.website}
              onChange={(e) => setUser({ ...user, website: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Domain</label>
            <Input
              type="text"
              value={user.domain}
              onChange={(e) => setUser({ ...user, domain: e.target.value })}
            />
          </div>
          <Button className="w-full">Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm New Password</label>
            <Input type="password" />
          </div>
          <Button className="w-full">Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
