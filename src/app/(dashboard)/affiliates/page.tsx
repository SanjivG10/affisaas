"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AffiliateLink } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, ExternalLink, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const dummyLinks: AffiliateLink[] = [
  {
    id: "1",
    businessId: "1",
    userId: "user1",
    link: "https://techpro15.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    clicks: 150,
    conversions: 12,
    commisionRate: 0.1,
  },
];

const affiliateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  link: z.string().url("Invalid URL"),
  commissionType: z.enum(["percentage", "amount"]),
  commissionValue: z.number().positive("Must be a positive number"),
  cookieDuration: z
    .number()
    .min(1, "Must be at least 1 day")
    .max(90, "Must be at most 90 days"),
});

export default function Affiliates() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof affiliateSchema>>({
    resolver: zodResolver(affiliateSchema),
  });

  const onSubmit = (data: z.infer<typeof affiliateSchema>) => {
    console.log(data);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Affiliate Links</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Link
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Affiliate Link</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              placeholder="Name"
              {...register("name")}
              className="flex-1"
            />
            {errors.name && <span>{errors.name.message}</span>}

            <Input
              type="url"
              placeholder="Enter destination URL"
              {...register("link")}
              className="flex-1"
            />
            {errors.link && <span>{errors.link.message}</span>}

            <div className="flex gap-4">
              <select {...register("commissionType")} className="flex-1">
                <option value="percentage">Percentage</option>
                <option value="amount">Amount</option>
              </select>
              <Input
                type="number"
                placeholder="Commission Value"
                {...register("commissionValue")}
                className="flex-1"
              />
            </div>
            {errors.commissionValue && (
              <span>{errors.commissionValue.message}</span>
            )}

            <Input
              type="number"
              placeholder="Cookie Duration (days)"
              {...register("cookieDuration")}
              className="flex-1"
              min={1}
              max={90}
              defaultValue={30}
            />
            {errors.cookieDuration && (
              <span>{errors.cookieDuration.message}</span>
            )}

            <Button type="submit">Generate Link</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {dummyLinks.map((link) => (
          <Card key={link.id}>
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">Code: {link.link}</span>
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
